import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { BibleText } from './components/BibleText';
import { FloatingActionBar } from './components/FloatingActionBar';
import { BottomSheet } from './components/BottomSheet';
import { VerseStudyContent } from './components/study/VerseStudyContent';
import { WordStudyContent } from './components/study/WordStudyContent';
import { SearchView } from './components/SearchView';
import { ThemeProvider } from './components/ThemeProvider';
import { SettingsView } from './components/SettingsView';
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
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [activeSheetTab, setActiveSheetTab] = useState<Tab>(Tab.Verse);
  const [sheetTitle, setSheetTitle] = useState('');

  // Highlighting State (Simplified for demo)
  const [highlights, setHighlights] = useState<Set<string | number>>(new Set());
  // Navigation State
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('bible');

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [expandedSheetHeight, setExpandedSheetHeight] = useState('92dvh');

  const mainViewportRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic to keep selection visible when sheet opens/expands
  useEffect(() => {
    if (isSheetOpen && selection.id && mainViewportRef.current) {
      // Small delay to allow the sheet animation to start/layout to settle
      const timer = setTimeout(() => {
        const id = selection.type === 'verse' ? `verse-${selection.id}` : `token-${selection.id}`;
        let el = document.getElementById(id);

        // If word is selected, we want to anchor to the parent verse container
        if (selection.type === 'word' && el) {
          const verseContainer = el.closest('[id^="verse-"]');
          if (verseContainer) {
            el = verseContainer as HTMLElement;
          }
        }

        if (el && mainViewportRef.current) {
          const rect = el.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const headerHeight = 64; // Approx top bar height

          // Sheet top position dynamically based on expansion
          // Collapsed: 50dvh (top is 0.5), Expanded: calculated height or 92dvh fallback
          const defaultExpandedHeight = viewportHeight * 0.92;
          const parsedHeight = String(expandedSheetHeight).includes('vh') || String(expandedSheetHeight).includes('dvh')
            ? (parseFloat(expandedSheetHeight) / 100) * viewportHeight
            : parseFloat(expandedSheetHeight);
          const sheetTop = isSheetExpanded ? (viewportHeight - parsedHeight) : viewportHeight * 0.5;
          const visibleHeight = sheetTop - headerHeight;

          // Target positions
          const targetTop = headerHeight + 16;
          const targetBottom = sheetTop - 16;

          let delta = 0;

          if (isSheetExpanded || rect.height >= visibleHeight) {
            delta = rect.top - targetTop;

            if (isSheetExpanded) {
              const rectAfterScroll = {
                bottom: rect.bottom - delta,
                top: rect.top - delta
              };
              const spaceBelow = viewportHeight - rectAfterScroll.bottom - 12; // Subtract 12px to reveal margin
              // Limit height to max 92dvh and min 30dvh to keep it usable
              const finalHeight = Math.min(viewportHeight * 0.92, Math.max(viewportHeight * 0.3, spaceBelow));
              setExpandedSheetHeight(`${finalHeight}px`);
            }
          } else {
            delta = rect.bottom - targetBottom;
          }

          mainViewportRef.current.scrollBy({
            top: delta,
            behavior: 'smooth'
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isSheetOpen, isSheetExpanded, selection.id, selection.type, expandedSheetHeight]);

  const clearSelection = useCallback(() => {
    setSelection({ type: null, id: null, text: '' });
    setIsSheetOpen(false);
  }, []);

  const handleSelectWord = useCallback((id: string, text: string, coords: SelectionCoordinates, anchorKey?: string) => {
    if (selection.type === 'word' && selection.id === id && isSheetOpen) {
      clearSelection();
    } else {
      setSelection({ type: 'word', id, text, coordinates: coords, dataKey: anchorKey });
    }
  }, [selection, isSheetOpen, clearSelection]);

  const handleLongPressWord = useCallback((id: string, text: string, coords: SelectionCoordinates, anchorKey?: string) => {
    // On long press we behave the same as tap: select word;
    // sheet opening is handled by a separate effect based on selection.
    setSelection({ type: 'word', id, text, coordinates: coords, dataKey: anchorKey });
  }, []);

  const handleSelectVerse = useCallback((id: number, text: string, coords: SelectionCoordinates) => {
    if (selection.type === 'verse' && selection.id === id && isSheetOpen) {
      clearSelection();
    } else {
      setSelection({ type: 'verse', id, text, coordinates: coords });
    }
  }, [selection, isSheetOpen, clearSelection]);

  // Updated to explicitly clear selection when sheet closes
  const handleSheetClose = useCallback(() => {
    setIsSheetOpen(false);
    clearSelection();
  }, [clearSelection]);

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
  }, [selection]);

  const handleOpenSearch = useCallback(() => {
    setIsSheetOpen(false);
    setIsSearchOpen(true);
  }, []);

  useEffect(() => {
    if (!selection.type) return;
    if (isSearchOpen) return;
    if (activeNavTab !== 'bible') return;

    if (selection.type === 'verse') {
      const verseId = getVerseIdFromSelection(selection);
      setSheetTitle(`Псалом 1:${verseId}`);
      setActiveSheetTab(Tab.Verse);
    } else if (selection.type === 'word') {
      setSheetTitle(selection.dataKey ? capitalize(selection.dataKey) : selection.text.trim());
      setActiveSheetTab(Tab.Word);
    }

    setIsSheetOpen(true);
  }, [selection, isSearchOpen, activeNavTab]);

  const handleNavigateToVerse = useCallback((verseId: number) => {
    setIsSearchOpen(false);
    setActiveNavTab('bible');

    // Select the verse
    const verse = PSALM_1.find(v => v.id === verseId);
    if (verse) {
      setSelection({
        type: 'verse',
        id: verse.id,
        text: verse.text,
        coordinates: null
      });
    }
  }, []);

  // Floating Action Bar Handlers
  const handleToggleHighlight = useCallback((sel: SelectionState) => {
    if (!sel.id) return;
    setHighlights(prev => {
      const next = new Set(prev);
      if (next.has(sel.id!)) next.delete(sel.id!);
      else next.add(sel.id!);
      return next;
    });
    // Add haptic feedback placeholder
    console.log('Haptic feedback: selection toggled');
  }, []);

  const handleCreateNote = useCallback((sel: SelectionState) => {
    alert(`Створення нотатки для: ${sel.text.substring(0, 30)}...`);
  }, []);

  const handleShare = useCallback((sel: SelectionState) => {
    if (navigator.share) {
      navigator.share({
        title: 'Source Bible',
        text: sel.text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Поділитись: ${sel.text}`);
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
      return <div className="flex items-center justify-center h-full text-muted">Нотатки (в розробці)</div>;
    }

    if (activeNavTab === 'settings') {
      return <SettingsView />;
    }

    // Standard Bible Text
    return (
      <>
        <TopBar onSearchClick={handleOpenSearch} />
        <main
          ref={mainViewportRef}
          className={`
            flex-1 overflow-y-auto bg-white relative w-full no-scrollbar transition-all duration-500
            ${isSheetOpen
              ? (isSheetExpanded ? 'pb-[92dvh]' : 'pb-[50dvh]')
              : 'pb-24'}
          `}
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
            highlights={highlights}
          />
        </main>
      </>
    );
  };

  return (
    <ThemeProvider>
      <div className="h-screen bg-white max-w-md mx-auto shadow-2xl overflow-hidden relative font-sans text-primary flex flex-col transition-colors duration-300">

        <div className="flex-1 overflow-hidden flex flex-col relative pb-20">
          {renderMainContent()}

          {/* Search Overlay */}
          {isSearchOpen && (
            <SearchView
              onBack={() => setIsSearchOpen(false)}
              onNavigateToVerse={handleNavigateToVerse}
            />
          )}
        </div>

        {activeNavTab === 'bible' && selection.type && !isSearchOpen && (
          <FloatingActionBar
            isVisible={isSheetOpen}
            isExpanded={isSheetExpanded}
            selection={selection}
            onToggleHighlight={handleToggleHighlight}
            onOpenStudy={() => { }} // Already in bottom sheet
            onCreateNote={handleCreateNote}
            onShare={handleShare}
            isHighlighted={selection.id ? highlights.has(selection.id) : false}
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
          isExpanded={isSheetExpanded}
          onToggleExpand={setIsSheetExpanded}
          expandedHeight={expandedSheetHeight}
        >
          {activeSheetTab === Tab.Verse ?
            <VerseStudyContent
              verseId={currentVerseId}
              onOpenWord={handleOpenWordFromStudy}
            /> :
            <WordStudyContent
              word={selection.dataKey || sheetTitle}
              onNavigateToWord={handleOpenWordFromStudy}
            />
          }
        </BottomSheet>
      </div>
    </ThemeProvider>
  );
}