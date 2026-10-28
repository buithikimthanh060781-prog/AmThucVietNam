import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, User, ArrowRight, X, Sparkles, Share2 } from 'lucide-react';
import { STORIES_DATA } from '../data/storiesData';
import { CulturalStory } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const CulturalStories: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<CulturalStory | null>(null);

  return (
    <section id="stories" className="py-20 bg-[#FFF8ED] relative overflow-hidden">
      
      {/* Decorative Blur and pattern */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D4A646]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B83227]/15 text-[#B83227] text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Hồn Cốt Dân Tộc' : 'Cultural Soul'}</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#39291F] tracking-tight">
            {t('storiesTitle')}
          </h2>
          <div className="w-24 h-1 bg-[#D4A646] mx-auto my-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#39291F]/80 font-normal leading-relaxed">
            {t('storiesSubtitle')}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STORIES_DATA.map((story) => (
            <article
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#D4A646]/30 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Image Banner */}
              <div className="relative aspect-16/10 overflow-hidden bg-black/20">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Category Pill */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#B83227] text-white shadow-md">
                  {story.category}
                </span>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4A646]" />
                    {story.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4A646]" />
                    {story.publishedDate}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-[#39291F] group-hover:text-[#B83227] transition-colors leading-snug line-clamp-2">
                    {language === 'vi' ? story.title : story.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#39291F]/75 line-clamp-3 leading-relaxed font-light">
                    {language === 'vi' ? story.summary : story.summaryEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D4A646]/20 flex items-center justify-between">
                  <span className="text-xs text-[#315C45] font-semibold flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[140px]">{story.author.split('-')[0]}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#B83227] group-hover:translate-x-1 transition-transform">
                    <span>{t('readArticle')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* READ ARTICLE FULL MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div 
            className="relative bg-[#FFF8ED] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4A646]/50 max-h-[92vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert(language === 'vi' ? 'Đã sao chép liên kết bài viết!' : 'Copied story link!');
                  }
                }}
                className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#39291F] hover:bg-white shadow-md hover:scale-105 transition-all cursor-pointer"
                title="Chia sẻ bài viết"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedStory(null)}
                className="p-2.5 rounded-full bg-[#B83227] text-white hover:bg-[#8F221A] shadow-md hover:scale-105 transition-all cursor-pointer"
                title="Đóng lại"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Story Content */}
            <div className="overflow-y-auto flex-1">
              
              {/* Banner */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8ED] via-black/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B83227] shadow-sm">
                    {selectedStory.category}
                  </span>
                  <h2 className="font-serif font-black text-2xl sm:text-3xl text-white drop-shadow-md">
                    {language === 'vi' ? selectedStory.title : selectedStory.titleEn}
                  </h2>
                </div>
              </div>

              {/* Story Metadata */}
              <div className="px-6 sm:px-8 py-3 bg-white/70 border-b border-[#D4A646]/20 flex flex-wrap items-center justify-between text-xs text-[#39291F]/80 gap-2">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-semibold text-[#315C45]">
                    <User className="w-3.5 h-3.5 text-[#D4A646]" />
                    {selectedStory.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4A646]" />
                    {selectedStory.publishedDate}
                  </span>
                </div>
                <span className="font-semibold text-[#B83227]">{selectedStory.readTime}</span>
              </div>

              {/* Story Body */}
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Intro summary blockquote */}
                <div className="p-5 rounded-2xl bg-[#FFF8ED] border-l-4 border-[#D4A646] shadow-xs text-base sm:text-lg italic text-[#39291F] font-serif leading-relaxed">
                  "{language === 'vi' ? selectedStory.summary : selectedStory.summaryEn}"
                </div>

                {/* Content sections */}
                <div className="space-y-6">
                  {selectedStory.content.map((sec, idx) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="font-serif font-bold text-xl text-[#B83227]">
                        {language === 'vi' ? sec.heading : sec.headingEn}
                      </h3>
                      {(language === 'vi' ? sec.body : sec.bodyEn).map((para, pIdx) => (
                        <p key={pIdx} className="text-base text-[#39291F]/90 leading-relaxed font-light">
                          {para}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-6 border-t border-[#D4A646]/30 flex flex-wrap gap-2">
                  {selectedStory.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#39291F] border border-[#D4A646]/30 shadow-2xs"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
