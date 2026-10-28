import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    province: 'Hà Nội',
    topic: 'suggest_dish',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        province: 'Hà Nội',
        topic: 'suggest_dish',
        message: ''
      });
    }, 4000);
  };

  const faqs = [
    {
      q: 'Làm thế nào để phân biệt hương vị ẩm thực 3 miền?',
      qEn: 'How to distinguish between the 3 regional flavor profiles?',
      a: 'Miền Bắc chuộng vị thanh đạm, trong trẻo, ít dùng đường và ớt. Miền Trung có vị đậm đà, cay nồng và mặn mòi hương biển. Miền Nam có vị ngọt béo của nước cốt dừa và đường thốt nốt, kết hợp nhiều loại rau hoang dã.',
      aEn: 'The North favors delicate, clear broths with subtle herbs. The Central coast embraces bold, spicy chilies and pungent fermented pastes. The South leans towards sweet coconut milk and lavish fresh herbs.'
    },
    {
      q: 'Website có công thức nấu ăn chuẩn xác không?',
      qEn: 'Are the recipes on this website authentic?',
      a: 'Tất cả các món ăn trên "Tinh Hoa Ẩm Thực Việt" đều được tham vấn từ các nghệ nhân dân gian, đầu bếp kỳ cựu và tài liệu lịch sử ẩm thực chính thống.',
      aEn: 'All dishes featured on this website are thoroughly verified with traditional artisans, veteran chefs, and authoritative culinary literature.'
    },
    {
      q: 'Tôi có thể đóng góp món đặc sản của quê hương mình không?',
      qEn: 'Can I contribute a specialty from my hometown?',
      a: 'Chúng tôi luôn chào đón mọi đóng góp về các món đặc sản quê hương. Bạn có thể gửi thông tin qua biểu mẫu liên hệ bên cạnh!',
      aEn: 'We enthusiastically welcome suggestions from every corner of Vietnam. Simply share your local culinary story via the contact form!'
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#FFF8ED] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B83227]/15 text-[#B83227] text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Kết Nối & Lan Tỏa' : 'Connect & Share'}</span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-5xl text-[#39291F]">
            {language === 'vi' ? 'Liên Hệ & Đóng Góp Ý Kiến' : 'Contact Us & Contributions'}
          </h1>

          <p className="text-base sm:text-lg text-[#39291F]/80 leading-relaxed font-light">
            {language === 'vi'
              ? 'Đồng hành cùng chúng tôi trên hành trình gìn giữ, tôn vinh và quảng bá di sản ẩm thực truyền thống Việt Nam.'
              : 'Join us on our journey to preserve, celebrate, and share Vietnam’s treasured culinary heritage.'}
          </p>
        </div>

        {/* Contact Form and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#D4A646]/30 shadow-lg space-y-6">
              <h3 className="font-serif font-bold text-2xl text-[#39291F] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B83227]" />
                <span>Trụ Sở & Thông Tin</span>
              </h3>

              <div className="space-y-4 text-sm text-[#39291F]/85">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFF8ED] border border-[#D4A646]/20">
                  <MapPin className="w-5 h-5 text-[#B83227] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#39291F] font-bold">Văn phòng Hà Nội:</strong>
                    <span>36 Phố Cổ, Quận Hoàn Kiếm, TP. Hà Nội</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFF8ED] border border-[#D4A646]/20">
                  <MapPin className="w-5 h-5 text-[#315C45] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#39291F] font-bold">Văn phòng TP. Hồ Chí Minh:</strong>
                    <span>120 Đồng Khởi, Phường Bến Nghé, Quận 1, TP.HCM</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF8ED] border border-[#D4A646]/20">
                  <Phone className="w-5 h-5 text-[#D4A646] shrink-0" />
                  <div>
                    <strong className="block text-[#39291F] font-bold">Đường dây nóng:</strong>
                    <span>1900 8866 (Tư vấn cẩm nang du lịch ẩm thực)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF8ED] border border-[#D4A646]/20">
                  <Mail className="w-5 h-5 text-[#B83227] shrink-0" />
                  <div>
                    <strong className="block text-[#39291F] font-bold">Thư điện tử:</strong>
                    <span>contact@tinhhoamthucviet.vn</span>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="p-4 rounded-2xl bg-[#39291F] text-[#FFF8ED] text-xs space-y-1">
                <span className="text-[#D4A646] font-bold uppercase tracking-wider block">Thời Gian Hoạt Động</span>
                <p>Thứ Hai – Thứ Bảy: 08:00 – 18:00</p>
                <p>Hỗ trợ khẩn cấp trực tuyến 24/7</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Feedback & Suggestion Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#D4A646]/40 shadow-xl">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#315C45]/15 mx-auto flex items-center justify-center text-[#315C45]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#39291F]">
                  Gửi Góp Ý Thành Công!
                </h3>
                <p className="text-sm text-[#39291F]/80 max-w-md mx-auto">
                  Cảm ơn bạn đã đóng góp cho "Tinh Hoa Ẩm Thực Việt". Ban biên tập sẽ xem xét và phản hồi trong vòng 24 giờ.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#39291F] mb-1">
                    Gửi Đóng Góp Món Ăn Hoặc Phản Hồi
                  </h3>
                  <p className="text-xs text-[#39291F]/70">
                    Hãy chia sẻ đặc sản quê hương bạn hoặc những địa chỉ quán ăn nức tiếng.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#39291F] uppercase">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#B83227]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#39291F] uppercase">Email liên hệ *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#B83227]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#39291F] uppercase">Tỉnh / Thành phố</label>
                    <input
                      type="text"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      placeholder="Hà Nội, Huế, Sài Gòn..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#B83227]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#39291F] uppercase">Chủ đề đóng góp</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/40 text-sm font-semibold text-[#39291F] focus:outline-none focus:ring-2 focus:ring-[#B83227] cursor-pointer"
                    >
                      <option value="suggest_dish">Đóng góp món đặc sản quê hương</option>
                      <option value="famous_address">Gợi ý địa chỉ quán ăn ngon</option>
                      <option value="culture_story">Chia sẻ câu chuyện văn hóa ẩm thực</option>
                      <option value="partnership">Hợp tác quảng bá ẩm thực</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#39291F] uppercase">Nội dung chi tiết *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mô tả về món ăn, nguyên liệu, hương vị hoặc câu chuyện truyền thống..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#B83227]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#B83227] hover:bg-[#8F221A] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D4A646]" />
                  <span>Gửi Đóng Góp Tới Ban Biên Tập</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* FAQs */}
        <div className="pt-8 border-t border-[#D4A646]/30 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-serif font-bold text-2xl text-[#39291F] flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#D4A646]" />
              <span>Câu Hỏi Thường Gặp Về Ẩm Thực Việt</span>
            </h3>
            <p className="text-xs text-[#39291F]/70">
              Giải đáp các thắc mắc phổ biến của du khách trong và ngoài nước.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-[#D4A646]/30 shadow-xs space-y-3"
              >
                <h4 className="font-serif font-bold text-base text-[#B83227]">
                  {language === 'vi' ? f.q : f.qEn}
                </h4>
                <p className="text-xs sm:text-sm text-[#39291F]/80 leading-relaxed font-light">
                  {language === 'vi' ? f.a : f.aEn}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
