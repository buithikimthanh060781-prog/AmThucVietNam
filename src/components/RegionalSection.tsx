import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Region } from '../types';

interface RegionalInfo {
  id: Region;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  accentColor: string;
  badgeBg: string;
  image: string;
  dishes: { name: string; id: string }[];
  tasteFeatures: string[];
  tasteFeaturesEn: string[];
}

export const REGIONS_DATA: RegionalInfo[] = [
  {
    id: 'north',
    title: 'Ẩm Thực Miền Bắc',
    titleEn: 'Northern Vietnam',
    tagline: 'Thanh tao, tinh tế & chuẩn mực ngàn năm',
    taglineEn: 'Delicate, refined & centuries of harmony',
    description: 'Ẩm thực Bắc Bộ mang đậm nét văn hóa Tràng An xưa, không chuộng cay nồng hay quá ngọt béo, mà chú trọng độ tươi ngon tự nhiên, thanh đạm và dậy hương thơm thảo mộc quế hồi, gừng già.',
    descriptionEn: 'Northern cuisine emphasizes pristine clarity, subtle elegance, and gentle herb balances without excessive sugar or aggressive chilies.',
    accentColor: '#B83227', // Đỏ son
    badgeBg: 'bg-[#B83227]',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80',
    dishes: [
      { name: 'Phở Bò Hà Nội', id: 'pho-ha-noi' },
      { name: 'Bún Chả Hà Nội', id: 'bun-cha-ha-noi' },
      { name: 'Chả Cá Lã Vọng', id: 'cha-ca-la-vong' },
      { name: 'Bánh Cuốn Thanh Trì', id: 'banh-cuon-thanh-tri' },
    ],
    tasteFeatures: ['Vị thanh đạm dịu nhẹ', 'Nước dùng trong veo ngọt tủy', 'Mắm tôm, giấm bỗng dậy mùi'],
    tasteFeaturesEn: ['Gentle delicate taste', 'Crystal-clear bone broth', 'Fermented rice & shrimp nuances']
  },
  {
    id: 'central',
    title: 'Ẩm Thực Miền Trung',
    titleEn: 'Central Vietnam',
    tagline: 'Đậm đà, cay nồng & phong vị Cố Đô',
    taglineEn: 'Bold, spicy & imperial majesty',
    description: 'Miền Trung nắng gió tôi luyện nên phong vị ẩm thực đậm đà, vị cay nồng nàn của ớt hiểm kết hợp vị mặn mòi của biển cả và sự cầu kỳ, tinh xảo của nghệ thuật ngự thiện cung đình triều Nguyễn.',
    descriptionEn: 'Shaped by radiant sunshine and coastal breezes, Central dishes boast fiery chilies, aged shrimp pastes, and the aesthetic mastery of imperial court banquets.',
    accentColor: '#D4A646', // Vàng đồng
    badgeBg: 'bg-[#D4A646]',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    dishes: [
      { name: 'Bún Bò Huế Cố Đô', id: 'bun-bo-hue' },
      { name: 'Mì Quảng Tôm Thịt', id: 'mi-quang-da-nang' },
      { name: 'Cao Lầu Hội An', id: 'cao-lau-hoi-an' },
      { name: 'Bánh Bèo Chén Xứ Huế', id: 'banh-beo-hue' },
    ],
    tasteFeatures: ['Cay nồng ớt sa tế', 'Đậm đà mắm ruốc mắm nêm', 'Trình bày cầu kỳ tinh mỹ'],
    tasteFeaturesEn: ['Fiery chili heat', 'Pungent anchovy & shrimp paste', 'Artistic imperial presentation']
  },
  {
    id: 'south',
    title: 'Ẩm Thực Miền Nam',
    titleEn: 'Southern Vietnam',
    tagline: 'Hào sảng, ngọt lành & trù phú sông nước',
    taglineEn: 'Generous, sweet & fertile waterways',
    description: 'Đất phương Nam trù phú sản vật phù sa, tính cách con người phóng khoáng, hiếu khách. Món ăn thiên về vị ngọt ngào của nước dừa, đường thốt nốt, hòa quyện rau cỏ thiên nhiên hoang dã.',
    descriptionEn: 'The bountiful southern delta inspires lavish feasts enriched by fresh coconut milk, palm sugar, and an abundant meadow of wild water blooms.',
    accentColor: '#315C45', // Xanh lá
    badgeBg: 'bg-[#315C45]',
    image: 'https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=1200&q=80',
    dishes: [
      { name: 'Cơm Tấm Sài Gòn', id: 'com-tam-sai-gon' },
      { name: 'Hủ Tiếu Nam Vang', id: 'hu-tieu-nam-vang' },
      { name: 'Bánh Xèo Miền Tây', id: 'banh-xeo-mien-tay' },
      { name: 'Lẩu Mắm Miền Tây', id: 'lau-mam-mien-tay' },
    ],
    tasteFeatures: ['Ngọt béo nước cốt dừa', 'Bạt ngàn rau đồng cỏ nội', 'Hương vị phóng khoáng hào hiệp'],
    tasteFeaturesEn: ['Rich creamy coconut', 'Lavish wild delta herbs', 'Bold and open-hearted']
  }
];

interface RegionalSectionProps {
  onSelectDish?: (dishId: string) => void;
}

export const RegionalSection: React.FC<RegionalSectionProps> = ({ onSelectDish }) => {
  const { language, t } = useLanguage();

  return (
    <section id="regions" className="py-20 bg-[#FFF8ED] relative overflow-hidden">
      {/* Background Decorative patterns */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#D4A646]/10 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#B83227]/10 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A646]/20 text-[#B83227] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Bản Đồ Vị Giác' : 'Taste Geography'}</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#39291F] tracking-tight">
            {t('regionsTitle')}
          </h2>
          <div className="w-24 h-1 bg-[#D4A646] mx-auto my-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#39291F]/80 font-normal leading-relaxed">
            {t('regionsSubtitle')}
          </p>
        </div>

        {/* 3 Regional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REGIONS_DATA.map((region) => (
            <div
              key={region.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#D4A646]/30 flex flex-col hover:-translate-y-1.5"
            >
              {/* Card Image Banner */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={region.image}
                  alt={region.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                
                {/* Region Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3.5 py-1.5 rounded-full text-white text-xs font-bold shadow-md tracking-wide"
                    style={{ backgroundColor: region.accentColor }}
                  >
                    {language === 'vi' ? region.title : region.titleEn}
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif font-bold text-2xl drop-shadow-md">
                    {language === 'vi' ? region.title : region.titleEn}
                  </h3>
                  <p className="text-xs text-[#D4A646] font-medium tracking-wide drop-shadow">
                    {language === 'vi' ? region.tagline : region.taglineEn}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                
                {/* Description */}
                <p className="text-sm text-[#39291F]/85 leading-relaxed line-clamp-3">
                  {language === 'vi' ? region.description : region.descriptionEn}
                </p>

                {/* Taste Features */}
                <div className="space-y-1.5 pt-2 border-t border-[#D4A646]/20">
                  <span className="text-xs font-bold text-[#39291F] tracking-wider uppercase block mb-1">
                    {language === 'vi' ? 'Đặc trưng hương vị' : 'Flavor Signature'}:
                  </span>
                  {(language === 'vi' ? region.tasteFeatures : region.tasteFeaturesEn).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#315C45] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A646] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Signature Dishes List */}
                <div className="space-y-2 pt-2 border-t border-[#D4A646]/20">
                  <span className="text-xs font-bold text-[#39291F] tracking-wider uppercase block">
                    {language === 'vi' ? 'Món ăn tiêu biểu' : 'Signature Dishes'}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {region.dishes.map((dish) => (
                      <button
                        key={dish.id}
                        onClick={() => onSelectDish && onSelectDish(dish.id)}
                        className="px-2.5 py-1 rounded-md bg-[#FFF8ED] hover:bg-[#B83227] hover:text-white text-[#39291F] text-xs font-medium border border-[#D4A646]/40 transition-colors cursor-pointer text-left"
                      >
                        {dish.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-[#D4A646]/20">
                  <Link
                    to={`/specialties?region=${region.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold shadow-md hover:shadow-lg transition-all group/btn"
                    style={{ backgroundColor: region.accentColor }}
                  >
                    <span>{t('btnExploreRegion')}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
