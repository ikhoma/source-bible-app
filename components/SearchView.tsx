import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Search, Sparkles, ArrowRight, BookOpen, Mic, X, Square } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { PSALM_1 } from '../constants';
import { Verse } from '../types';

interface SearchViewProps {
  onBack: () => void;
  onNavigateToVerse: (verseId: number) => void;
}

// Sub-component for efficient rendering of audio visualization
const VoiceVisualizer: React.FC<{ stream: MediaStream; onClick: () => void }> = ({ stream, onClick }) => {
  const [heights, setHeights] = useState<number[]>([15, 15, 15, 15, 15]);
  const rafRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!stream) return;

    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64; // Small FFT size for fewer bins
      analyser.smoothingTimeConstant = 0.5; // Smooth out the jitter

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const animate = () => {
        analyser.getByteFrequencyData(dataArray);

        // Map specific frequency bins to bars to create a "wave" effect
        const getVal = (idx: number) => {
          const val = dataArray[idx];
          // Scale 0-255 to percentage 15-100
          return Math.max(15, (val / 255) * 100);
        };

        setHeights([
          getVal(1), // Low
          getVal(3), // Mid-Low
          getVal(5), // Mid (Peak)
          getVal(2), // Mid-Low duplicate
          getVal(4)  // Low duplicate
        ]);
        
        rafRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(rafRef.current);
        if (audioContext.state !== 'closed') {
          audioContext.close();
        }
      };
    } catch (e) {
      console.error("Audio visualizer error", e);
    }
  }, [stream]);

  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-2 h-9 px-3 bg-red-50 rounded-full cursor-pointer mr-1 hover:bg-red-100 transition-colors border border-red-100 animate-in fade-in zoom-in duration-200"
    >
      {/* Wave Bars */}
      <div className="flex items-center gap-[3px] h-4">
        {heights.map((h, i) => (
          <div 
            key={i} 
            className="w-[3px] bg-red-500 rounded-full transition-all duration-75 ease-out"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      {/* Stop Icon (Square) - subtle hint to stop */}
      <Square size={10} className="fill-red-500 text-red-500 ml-1" />
    </div>
  );
};

export const SearchView: React.FC<SearchViewProps> = ({ onBack, onNavigateToVerse }) => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'keyword' | 'ai'>('keyword');
  const [keywordResults, setKeywordResults] = useState<Verse[]>([]);
  const [aiResults, setAiResults] = useState<{ verseIds: number[], explanation: string } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopListening();
    };
  }, []);

  // Keyword Search Logic
  const handleKeywordSearch = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setKeywordResults([]);
      return;
    }
    
    const lower = text.toLowerCase();
    const results = PSALM_1.filter(v => 
      v.text.toLowerCase().includes(lower) || 
      v.tokens.some(t => t.text.toLowerCase().includes(lower))
    );
    setKeywordResults(results);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
    }
    setIsListening(false);
  };

  const startListening = async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Ваш браузер не підтримує голосове введення.');
      return;
    }

    try {
      // 1. Get Audio Stream for Visualizer
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);

      // 2. Start Speech Recognition
      const recognition = new SpeechRecognition();
      recognition.lang = 'uk-UA';
      recognition.interimResults = true;
      recognition.continuous = true; // KEEP LISTENING until user stops
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        // We do NOT clear the query here to allow appending, 
        // but for a fresh search prompt, usually clearing is expected.
        // Let's clear for a fresh "voice prompt".
        setQuery(''); 
      };

      recognition.onend = () => {
        // Only stop state if it wasn't manual (e.g. error or timeout)
        // But since we toggle state manually, we keep it simple.
        // If the browser stops it automatically (timeout), we update UI.
        setIsListening(false);
        if (stream.active) {
            stream.getTracks().forEach(track => track.stop());
            setAudioStream(null);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        stream.getTracks().forEach(track => track.stop());
        setAudioStream(null);
      };

      recognition.onresult = (event: any) => {
        // Reconstruct the full transcript from all results in this session
        // This is safer with continuous=true to capture the full sentence/paragraph
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          fullTranscript += event.results[i][0].transcript;
        }
        
        // Update input live
        setQuery(fullTranscript);
      };
      
      recognitionRef.current = recognition;
      recognition.start();

    } catch (e) {
      console.error("Failed to start voice input", e);
      setIsListening(false);
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        setAudioStream(null);
      }
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // AI Search Logic
  const handleAiSearch = async () => {
    if (!query.trim()) return;
    setIsAiLoading(true);
    setAiResults(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const context = PSALM_1.map(v => `Verse ${v.id}: ${v.text}`).join('\n');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Context (Psalm 1):\n${context}\n\nUser Question: "${query}"\n\nTask: Find the verses in the provided text that answer the question or relate to the idea. Explain why briefly.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              explanation: { type: Type.STRING, description: "A brief explanation of where the idea is found." },
              verseIds: { 
                type: Type.ARRAY, 
                items: { type: Type.INTEGER },
                description: "List of verse numbers that match." 
              }
            }
          }
        }
      });

      if (response.text) {
        const result = JSON.parse(response.text);
        setAiResults(result);
      }
    } catch (error) {
      console.error("AI Search Error", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (mode === 'ai') {
        handleAiSearch();
      } else {
        (e.target as HTMLInputElement).blur();
      }
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom-2 duration-300">
      
      {/* Header & Input */}
      <header className="sticky top-0 z-10 bg-white border-b border-stone-100 p-4 gap-4 flex flex-col">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full text-stone-500 hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 relative">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => {
                if (mode === 'keyword') handleKeywordSearch(e.target.value);
                else setQuery(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder={mode === 'ai' ? (isListening ? "Слухаю..." : "Запитайте про ідею...") : "Пошук слова..."}
              className={`w-full bg-stone-100 text-stone-900 pl-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium placeholder:text-stone-400 ${mode === 'ai' ? 'pr-20' : 'pr-4'}`}
            />
            
            {mode === 'ai' && (
              <div className="absolute right-1 top-1 flex items-center gap-1">
                 {isListening && audioStream ? (
                   <VoiceVisualizer stream={audioStream} onClick={toggleVoiceInput} />
                 ) : (
                   <button 
                    onClick={toggleVoiceInput}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-200 transition-all"
                  >
                    <Mic size={18} strokeWidth={2} />
                  </button>
                 )}

                <button 
                  onClick={handleAiSearch}
                  disabled={isAiLoading || !query.trim()}
                  className="p-1.5 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:bg-stone-300 transition-all"
                >
                  {isAiLoading ? <Sparkles size={18} className="animate-pulse" /> : <ArrowRight size={18} />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => { setMode('keyword'); handleKeywordSearch(query); stopListening(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'keyword' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            <Search size={16} />
            За словом
          </button>
          <button
            onClick={() => { setMode('ai'); setKeywordResults([]); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'ai' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
          >
            <Sparkles size={16} className={mode === 'ai' ? "text-blue-500" : ""} />
            Розумний пошук
          </button>
        </div>
      </header>

      {/* Results */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        
        {/* KEYWORD MODE */}
        {mode === 'keyword' && (
          <div className="space-y-4">
            {query && keywordResults.length === 0 && (
              <div className="text-center py-10 text-stone-400">
                Нічого не знайдено
              </div>
            )}
            {keywordResults.map(verse => (
              <div 
                key={verse.id}
                onClick={() => onNavigateToVerse(verse.id)}
                className="p-4 rounded-xl border border-stone-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:bg-stone-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Псалом 1:{verse.id}</span>
                </div>
                <p className="text-stone-800 leading-relaxed">
                  {verse.text.split(new RegExp(`(${query})`, 'gi')).map((part, i) => 
                    part.toLowerCase() === query.toLowerCase() 
                      ? <span key={i} className="bg-yellow-100 text-stone-900 font-medium">{part}</span>
                      : part
                  )}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* AI MODE */}
        {mode === 'ai' && (
          <div className="space-y-6">
            {!aiResults && !isAiLoading && (
              <div className="text-center py-12 px-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-stone-900 font-bold mb-2">Запитайте про ідеї</h3>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Спробуйте: «Де говориться про успіх?», «Що сказано про нечестивих?», або натисніть мікрофон.
                </p>
              </div>
            )}

            {isAiLoading && (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-stone-100 rounded w-3/4"></div>
                <div className="h-32 bg-stone-100 rounded-xl"></div>
                <div className="h-32 bg-stone-100 rounded-xl"></div>
              </div>
            )}

            {aiResults && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-50/50 p-4 rounded-xl mb-6 border border-blue-100">
                  <div className="flex gap-2 items-start mb-2">
                    <Sparkles size={16} className="text-blue-500 mt-1 shrink-0" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mt-1">AI Відповідь</span>
                  </div>
                  <p className="text-stone-800 text-sm leading-relaxed">
                    {aiResults.explanation}
                  </p>
                </div>

                <div className="space-y-4">
                   <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider pl-1">Знайдені вірші</h3>
                   {aiResults.verseIds.map(id => {
                     const verse = PSALM_1.find(v => v.id === id);
                     if (!verse) return null;
                     return (
                      <div 
                        key={id}
                        onClick={() => onNavigateToVerse(id)}
                        className="p-4 rounded-xl border border-stone-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:bg-stone-50 transition-colors cursor-pointer flex gap-3"
                      >
                         <div className="mt-1 bg-stone-100 text-stone-500 w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0">
                           {id}
                         </div>
                         <div>
                            <p className="text-stone-800 leading-relaxed text-[15px]">
                              {verse.text}
                            </p>
                            <div className="mt-2 flex items-center gap-1 text-xs text-blue-600 font-medium">
                              Перейти до вірша <ArrowRight size={12} />
                            </div>
                         </div>
                      </div>
                     );
                   })}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};