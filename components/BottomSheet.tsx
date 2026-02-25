import React, { useEffect, useState, useRef, useCallback, createContext, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tab } from '../types';

export const ScrollToTopContext = createContext<() => void>(() => { });
export const useScrollToTop = () => useContext(ScrollToTopContext);

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: React.ReactNode;
  onNavigate?: (direction: 'prev' | 'next') => void;
  canNavigatePrev?: boolean;
  canNavigateNext?: boolean;
  isExpanded: boolean;
  onToggleExpand: (expanded: boolean) => void;
  expandedHeight?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  activeTab,
  onTabChange,
  children,
  onNavigate,
  canNavigatePrev = false,
  canNavigateNext = false,
  isExpanded,
  onToggleExpand,
  expandedHeight = '92vh'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const startY = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [activeTab, scrollToTop]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      onToggleExpand(false);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
    // Capture pointer to ensure we track the drag even if it leaves the handle element
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startY.current === null) return;

    const endY = e.clientY;
    const deltaY = endY - startY.current;

    // Release capture
    (e.target as Element).releasePointerCapture(e.pointerId);
    startY.current = null;

    // Logic: 
    // Small movement (< 10px) = Click/Tap -> Toggle Expansion
    // Big movement Up (> 50px) -> Expand
    // Big movement Down (> 50px) -> Collapse or Close

    if (Math.abs(deltaY) < 10) {
      onToggleExpand(!isExpanded);
    } else if (deltaY < -50) {
      onToggleExpand(true);
    } else if (deltaY > 50) {
      if (isExpanded) {
        onToggleExpand(false);
      } else {
        onClose();
      }
    }
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Sheet */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-50 bg-stone-100 rounded-t-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.15)] 
          flex flex-col max-w-md mx-auto transform transition-all border-t border-x border-stone-200
          ${isOpen
            ? 'translate-y-0 duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.1)]'
            : 'translate-y-full duration-300 ease-in'} 
        `}
        style={{ height: isExpanded ? expandedHeight : '50vh' }}
      >
        {/* Handle Area - Drag Zone */}
        <div
          className="w-full flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 pb-2 shrink-0">
          <div className="flex items-center justify-between mb-4 mt-2">
            <h2 className="text-2xl font-bold text-primary tracking-tight">{title}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate && onNavigate('prev')}
                disabled={!canNavigatePrev}
                className={`p-2 rounded-full transition-colors border ${canNavigatePrev ? 'text-muted hover:text-primary bg-stone-200 hover:bg-stone-300 border-stone-300/50' : 'text-muted bg-stone-100 border-transparent cursor-not-allowed'}`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => onNavigate && onNavigate('next')}
                disabled={!canNavigateNext}
                className={`p-2 rounded-full transition-colors border ${canNavigateNext ? 'text-muted hover:text-primary bg-stone-200 hover:bg-stone-300 border-stone-300/50' : 'text-muted bg-stone-100 border-transparent cursor-not-allowed'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-stone-200 p-1 rounded-xl flex font-medium relative shadow-inner">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-stone-100 rounded-lg shadow-sm border border-stone-300/30 transition-all duration-300 ease-out ${activeTab === Tab.Verse ? 'left-1' : 'left-[50%]'}`}
            />
            <button
              className={`flex-1 py-2 text-sm z-10 transition-colors duration-200 ${activeTab === Tab.Verse ? 'text-primary' : 'text-muted'}`}
              onClick={() => onTabChange(Tab.Verse)}
            >
              Вірш
            </button>
            <button
              className={`flex-1 py-2 text-sm z-10 transition-colors duration-200 ${activeTab === Tab.Word ? 'text-primary' : 'text-muted'}`}
              onClick={() => onTabChange(Tab.Word)}
            >
              Слово
            </button>
          </div>
        </div>

        {/* Content (Scrollable) */}
        <ScrollToTopContext.Provider value={scrollToTop}>
          <div ref={scrollRef} className="overflow-y-auto overscroll-contain flex-1 no-scrollbar bg-transparent">
            {children}
          </div>
        </ScrollToTopContext.Provider>
      </div>
    </>
  );
};