import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { BibleText } from './components/BibleText';
import { ContextActionMenu } from './components/ContextActionMenu';
import { BottomSheet } from './components/BottomSheet';
import { VerseStudyContent } from './components/study/VerseStudyContent';
import { WordStudyContent } from './components/study/WordStudyContent';
import { ExtendedOriginalView } from './components/ExtendedOriginalView';
import { SearchView } from './components/SearchView';
import { ConcordanceView } from './components/ConcordanceView';
import { PSALM_1 } from './constants';
import { SelectionState, Tab, SelectionCoordinates, NavTab } from './types';

// Helper to get verse ID from selection state
const getVerseIdFromSelection = (sel: SelectionState): number => {
  if (!sel.id) return 1;
  if (sel.type === 'verse' && typeof sel.id === 'number') return sel.id;
  if (typeof sel.id === 'string' && sel.id.startsWith('v')) {
    const vPart = sel.id.split('-')[0];
    return parseInt(vPart.replace('v', ''), 10);
  }
  return 1;
};

// Helper to capitalize first letter for sheet titles
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function App() {
  const [selection, setSelection] = useState<SelectionState>({ type: null, id: null, text: '' });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSheetTab, setActiveSheetTab] = useState<Tab>(Tab.Verse);
  const [sheetTitle, setSheetTitle] = useState('');
  
  // Navigation State
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('bible');

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Extended View State (Sub-view of Bible Tab)
  const [viewMode, setViewMode] = useState<'bible' | 'extended_original' | 'concordance'>('bible');
  const [extendedVerseId, setExtendedVerseId] = useState<number>(1);
  const [concordanceWord, setConcordanceWord] = useState<string>('');

  const mainViewportRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic to keep selection visible when sheet opens
  useEffect(() => {
    if (isSheetOpen && selection.id && mainViewportRef.current) {
      // Small delay to allow the sheet animation to start/layout to settle
      const timer = setTimeout(() => {
        const id = selection.type === 'verse' ? `verse-${selection.id}` : `token-${selection.id}`;
        const el = document.getElementById(id);
        
        if (el && mainViewportRef.current) {
           const rect = el.getBoundingClientRect();
           const viewportHeight = window.innerHeight;
           
           // We aim to position the selected content in the visible area above the half-screen sheet.
           // Sheet takes bottom 50%.
           const sheetTop = viewportHeight * 0.5;
           const headerHeight = 64; // Approx top bar height
           
           // Calculate available vertical space for the content
           const visibleHeight = sheetTop - headerHeight;
           
           // Target Y position for the bottom of the element (just above sheet)
           // Slightly reduced offset to bring content closer to sheet (shifted down by ~4px)
           const targetBottom = sheetTop - 16; 
           
           // Target Y position for the top of the element (just below header)
           const targetTop = headerHeight + 16;
           
           let delta = 0;
           
           // If the element is taller than the available space, align its top to the header.
           // Otherwise, align its bottom to the sheet to ensure the end is readable (as per goal).
           if (rect.height < visibleHeight) {
             delta = rect.bottom - targetBottom;
           } else {
             delta = rect.top - targetTop;
           }
           
           mainViewportRef.current.scrollBy({
             top: delta,
             behavior: 'smooth'
           });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isSheetOpen, selection.id, selection.type]);

  const handleSelectWord = useCallback((id: string, text: string, coords: SelectionCoordinates, anchorKey?: string) => {
    setSelection({ type: 'word', id, text, coordinates: coords, dataKey: anchorKey });
  }, []);

  const handleLongPressWord = useCallback((id: string, text: string, coords: SelectionCoordinates, anchorKey?: string) => {
    // Select the word
    setSelection({ type: 'word', id, text, coordinates: coords, dataKey: anchorKey });
    // Open sheet immediately in Word mode
    setSheetTitle(anchorKey ? capitalize(anchorKey) : text.trim());
    setActiveSheetTab(Tab.Word);
    setIsSheetOpen(true);
  }, []);

  const handleSelectVerse = useCallback((id: number, text: string, coords: SelectionCoordinates) => {
    setSelection(prev => {
      return { type: 'verse', id, text, coordinates: coords };
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelection({ type: null, id: null, text: '' });
    setIsSheetOpen(false);
  }, []);

  // Updated to explicitly clear selection when sheet closes
  const handleSheetClose = useCallback(() => {
    setIsSheetOpen(false);
    clearSelection();
  }, [clearSelection]);

  const openStudy = useCallback(() => {
    if (selection.type === 'verse') {
      setSheetTitle(`Псалом 1:${selection.id}`);
      setActiveSheetTab(Tab.Verse);
      setIsSheetOpen(true);
    } else if (selection.type === 'word') {
      setSheetTitle(selection.dataKey ? capitalize(selection.dataKey) : selection.text.trim());
      setActiveSheetTab(Tab.Word);
      setIsSheetOpen(true);
    }
  }, [selection]);

  const handleOpenWordFromStudy = useCallback((key: string) => {
      // Find a token in the text that matches this key
      const currentVId = getVerseIdFromSelection(selection);
      const verse = PSALM_1.find(v => v.id === currentVId);
      if (verse) {
          const token = verse.tokens.find(t => t.anchorKey === key);
          if (token) {
              setSelection({
                  type: 'word',
                  id: token.id,
                  text: token.text,
                  dataKey: key,
                  coordinates: null
              });
          } else {
               setSelection(prev => ({ ...prev, type: 'word', dataKey: key }));
          }
      }

      setSheetTitle(capitalize(key));
      setActiveSheetTab(Tab.Word);
      setIsSheetOpen(true);
  }, [selection]);

  const handleOpenExtendedView = useCallback((verseId: number) => {
    setIsSheetOpen(false); // Close sheet
    setExtendedVerseId(verseId);
    setViewMode('extended_original');
  }, []);

  const handleCloseExtendedView = useCallback(() => {
    setViewMode('bible');
  }, []);

  const handleOpenConcordance = useCallback((wordKey: string) => {
    setIsSheetOpen(false);
    setConcordanceWord(wordKey);
    setViewMode('concordance');
  }, []);

  const handleCloseConcordance = useCallback(() => {
    setViewMode('bible');
  }, []);

  const handleOpenSearch = useCallback(() => {
    setIsSheetOpen(false);
    setIsSearchOpen(true);
  }, []);

  // Search Navigation Handler
  const handleNavigateToVerse = useCallback((verseId: number) => {
    setIsSearchOpen(false);
    setActiveNavTab('bible');
    setViewMode('bible');
    
    // Select the verse
    const verse = PSALM_1.find(v => v.id === verseId);
    if (verse) {
      setSelection({
        type: 'verse',
        id: verse.id,
        text: verse.text,
        coordinates: null
      });
      // Optionally scroll (not implemented yet, but selection highlights it)
    }
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveSheetTab(tab);
    if (tab === Tab.Verse) {
        let verseId = 1;
        if (typeof selection.id === 'string' && selection.id.startsWith('v')) {
             const vPart = selection.id.split('-')[0];
             verseId = parseInt(vPart.replace('v', ''));
        } else if (typeof selection.id === 'number') {
            verseId = selection.id;
        }
        setSheetTitle(`Псалом 1:${verseId}`);
        
        // Update selection to Verse mode to highlight the verse
        const verse = PSALM_1.find(v => v.id === verseId);
        if (verse) {
            setSelection({
                type: 'verse',
                id: verse.id,
                text: verse.text,
                coordinates: null
            });
        }
    } else {
        if (selection.type === 'word') {
            setSheetTitle(selection.dataKey ? capitalize(selection.dataKey) : selection.text.trim());
        } else if (selection.type === 'verse' && typeof selection.id === 'number') {
             const vId = selection.id;
             const verse = PSALM_1.find(v => v.id === vId);
             if (verse && verse.tokens.length > 0) {
                 const firstInteractiveToken = verse.tokens.find(t => !!t.anchorKey);
                 if (firstInteractiveToken) {
                     setSelection({ 
                        type: 'word', 
                        id: firstInteractiveToken.id, 
                        text: firstInteractiveToken.text, 
                        dataKey: firstInteractiveToken.anchorKey,
                        coordinates: null 
                     });
                     setSheetTitle(capitalize(firstInteractiveToken.anchorKey || ''));
                 }
             }
        }
    }
  };

  let canPrev = false;
  let canNext = false;
  const currentVerseId = getVerseIdFromSelection(selection);

  if (activeSheetTab === Tab.Verse) {
    canPrev = PSALM_1.some(v => v.id === currentVerseId - 1);
    canNext = PSALM_1.some(v => v.id === currentVerseId + 1);
  } else if (activeSheetTab === Tab.Word && selection.type === 'word' && typeof selection.id === 'string') {
    const parts = selection.id.split('-');
    if (parts.length === 2) {
      const vId = parseInt(parts[0].replace('v', ''), 10);
      const tIdx = parseInt(parts[1].replace('t', ''), 10);
      const verse = PSALM_1.find(v => v.id === vId);
      if (verse) {
        canPrev = tIdx > 0 && verse.tokens.slice(0, tIdx).some(t => !!t.anchorKey);
        canNext = tIdx < verse.tokens.length - 1 && verse.tokens.slice(tIdx + 1).some(t => !!t.anchorKey);
      }
    }
  }

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    if (activeSheetTab === Tab.Verse) {
      const currentVId = getVerseIdFromSelection(selection);
      const nextId = direction === 'next' ? currentVId + 1 : currentVId - 1;
      const targetVerse = PSALM_1.find(v => v.id === nextId);

      if (targetVerse) {
        setSelection({
          type: 'verse',
          id: targetVerse.id,
          text: targetVerse.text,
          coordinates: null
        });
        setSheetTitle(`Псалом 1:${targetVerse.id}`);
      }

    } else if (activeSheetTab === Tab.Word && selection.type === 'word' && typeof selection.id === 'string') {
      const parts = selection.id.split('-');
      const vId = parseInt(parts[0].replace('v', ''), 10);
      const tIdx = parseInt(parts[1].replace('t', ''), 10);
      
      const verse = PSALM_1.find(v => v.id === vId);
      if (!verse) return;
      
      let nextTokenIndex = -1;
      if (direction === 'next') {
        for (let i = tIdx + 1; i < verse.tokens.length; i++) {
          if (verse.tokens[i].anchorKey) { nextTokenIndex = i; break; }
        }
      } else {
        for (let i = tIdx - 1; i >= 0; i--) {
          if (verse.tokens[i].anchorKey) { nextTokenIndex = i; break; }
        }
      }
      
      if (nextTokenIndex !== -1) {
          const nextToken = verse.tokens[nextTokenIndex];
          setSelection({
              type: 'word',
              id: nextToken.id,
              text: nextToken.text,
              dataKey: nextToken.anchorKey,
              coordinates: null
          });
          setSheetTitle(nextToken.anchorKey ? capitalize(nextToken.anchorKey) : nextToken.text.trim());
      }
    }
  }, [selection, activeSheetTab]);

  const renderMainContent = () => {
    if (activeNavTab === 'notes') {
      return <div className="flex items-center justify-center h-full text-stone-400">Нотатки (в розробці)</div>;
    }

    if (activeNavTab === 'menu') {
      return <div className="flex items-center justify-center h-full text-stone-400">Меню (в розробці)</div>;
    }

    if (viewMode === 'concordance') {
      return (
        <ConcordanceView 
          wordKey={concordanceWord}
          onBack={handleCloseConcordance}
          // For now, navigating to a verse from concordance just closes it.
          // In a real app, this would scroll to the specific verse reference.
          onNavigateToVerse={(ref) => handleCloseConcordance()}
        />
      );
    }

    // Default: Bible Tab
    if (viewMode === 'extended_original') {
      return (
        <ExtendedOriginalView 
          verseId={extendedVerseId} 
          onBack={handleCloseExtendedView}
          onOpenWord={(key) => {
             setViewMode('bible');
             handleOpenWordFromStudy(key);
          }}
        />
      );
    }

    // Standard Bible Text
    return (
      <>
        <TopBar onSearchClick={handleOpenSearch} />
        <main 
            ref={mainViewportRef}
            className="flex-1 overflow-y-auto bg-white relative w-full no-scrollbar pb-[50vh]" 
            onClick={() => {
                if (selection.type) clearSelection();
            }}
          >
            <BibleText 
              verses={PSALM_1} 
              selection={selection}
              onSelectWord={handleSelectWord}
              onLongPressWord={handleLongPressWord}
              onSelectVerse={handleSelectVerse}
            />
          </main>
      </>
    );
  };

  return (
    <div className="h-screen bg-[#FFFFFF] max-w-md mx-auto shadow-2xl overflow-hidden relative font-sans text-stone-900 flex flex-col">
      
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {renderMainContent()}
        
        {/* Search Overlay */}
        {isSearchOpen && (
          <SearchView 
            onBack={() => setIsSearchOpen(false)} 
            onNavigateToVerse={handleNavigateToVerse} 
          />
        )}
      </div>

      {activeNavTab === 'bible' && viewMode === 'bible' && selection.type && !isSheetOpen && !isSearchOpen && (
        <ContextActionMenu 
          selection={selection} 
          onClear={clearSelection}
          onStudy={openStudy}
        />
      )}

      <BottomNav activeTab={activeNavTab} onTabChange={setActiveNavTab} />

      <BottomSheet
        isOpen={isSheetOpen}
        onClose={handleSheetClose}
        title={sheetTitle}
        activeTab={activeSheetTab}
        onTabChange={handleTabChange}
        onNavigate={handleNavigate}
        canNavigatePrev={canPrev}
        canNavigateNext={canNext}
      >
        {activeSheetTab === Tab.Verse ? 
          <VerseStudyContent 
            verseId={currentVerseId} 
            onOpenWord={handleOpenWordFromStudy}
            onOpenExtended={handleOpenExtendedView} 
          /> : 
          <WordStudyContent 
            word={selection.dataKey || sheetTitle} 
            onNavigateToWord={handleOpenWordFromStudy}
            onOpenConcordance={handleOpenConcordance}
          />
        }
      </BottomSheet>
    </div>
  );
}