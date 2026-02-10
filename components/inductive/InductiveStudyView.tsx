import React from 'react';
import { ArrowRight, BookOpen, PenLine, Users, Lightbulb, Search } from 'lucide-react';
import { INDUCTIVE_STUDY_DB } from '../../constants';
import { TopBar } from '../TopBar';

interface InductiveStudyViewProps {
  onOpenWord: (key: string) => void;
  onSearch?: () => void;
}

export const InductiveStudyView: React.FC<InductiveStudyViewProps> = ({ onOpenWord, onSearch }) => {
  const data = INDUCTIVE_STUDY_DB[1]; // Hardcoded Psalm 1 for now

  if (!data) return <div className="p-8 text-center text-stone-500">Інформація відсутня</div>;

  return (
    <div className="flex flex-col h-full bg-stone-50 animate-in fade-in duration-300">
      
      {/* Shared TopBar */}
      <TopBar onSearchClick={onSearch} />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        
        {/* Page Title (moved from header) */}
        <div className="px-4 pt-6 pb-2">
           <h1 className="text-xl font-bold text-stone-900 leading-tight">Псалом 1 — Індуктивне вивчення</h1>
           <p className="text-xs text-stone-500 font-medium tracking-wide mt-1 uppercase opacity-80">
             Observation · Interpretation · Application
           </p>
        </div>

        <div className="px-4 py-4 space-y-4">
          
          {/* Card 1: Observation */}
          <section className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-50 p-1.5 rounded-lg text-blue-600">
                <Search size={18} strokeWidth={2.5} />
              </div>
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">Observation — Що я бачу?</h2>
            </div>
            
            <ul className="space-y-3">
              {data.observationPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-stone-800">
                  <span className="text-blue-300 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[10px] text-stone-400 font-medium uppercase tracking-wider">
              Фокус: факти, повтори, структура
            </p>
          </section>

          {/* Card 2: Word Insights */}
          {data.wordInsights.length > 0 && (
            <section className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-amber-50 p-1.5 rounded-lg text-amber-600">
                  <BookOpen size={18} strokeWidth={2.5} />
                </div>
                <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">Спостереження зі слів</h2>
              </div>
              
              <div className="space-y-3 mb-4">
                 {data.wordInsights.map((item, i) => (
                   <div key={i} className="flex gap-3 text-[15px] text-stone-800">
                      <span className="text-amber-200 font-bold shrink-0">•</span>
                      <div>
                         <span className="font-bold">{item.word}</span>
                         <span className="text-stone-400 font-serif mx-1" dir="rtl">{item.original}</span>
                         <span className="text-stone-600">— {item.text}</span>
                      </div>
                   </div>
                 ))}
              </div>

              <button 
                onClick={() => onOpenWord(data.wordInsights[0].refKey || 'блаженний')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 active:bg-stone-200 transition-colors group"
              >
                <span className="text-sm font-semibold text-stone-700">Переглянути слова</span>
                <ArrowRight size={16} className="text-stone-400 group-hover:text-stone-600" />
              </button>
            </section>
          )}

          {/* Card 3: Interpretation */}
          <section className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-purple-50 p-1.5 rounded-lg text-purple-600">
                <Lightbulb size={18} strokeWidth={2.5} />
              </div>
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">Interpretation — Що це означає?</h2>
            </div>
            
            <div className="space-y-3 text-[15px] leading-relaxed text-stone-800">
              {data.interpretationPoints.map((point, i) => (
                <p key={i} className="text-stone-800">{point}</p>
              ))}
            </div>
            <p className="mt-4 text-[10px] text-stone-400 font-medium uppercase tracking-wider">
              Фокус: авторський намір і богословська логіка
            </p>
          </section>

          {/* Card 4: Application */}
          <section className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100">
             <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-50 p-1.5 rounded-lg text-emerald-600">
                <PenLine size={18} strokeWidth={2.5} />
              </div>
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">Application — Як це стосується мене?</h2>
            </div>

            <ul className="space-y-3 mb-5">
              {data.applicationQuestions.map((q, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-stone-800 font-medium italic">
                  <span className="text-emerald-300 font-bold not-italic">?</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 text-sm font-semibold text-stone-600 border border-stone-200 rounded-xl hover:bg-stone-50 active:bg-stone-100 transition-colors">
              Додати нотатку
            </button>
          </section>

          {/* Card 5: Group */}
          <section className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100">
             <div className="flex items-center gap-2 mb-4">
              <div className="bg-rose-50 p-1.5 rounded-lg text-rose-600">
                <Users size={18} strokeWidth={2.5} />
              </div>
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">Для домашньої групи</h2>
            </div>

             <ul className="space-y-3">
              {data.groupQuestions.map((q, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-stone-800">
                  <span className="text-rose-300 font-bold">•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};