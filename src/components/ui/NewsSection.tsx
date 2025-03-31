import NewsCard from "./NewsCard";


const newsArticles = [
  {
    image: "/news/article1.jpg",
    title: "Review Học Cách Học của Barbara Oakley",
    description: "Học Cách Học là một cuốn sách rất giá trị và đáng đọc của Barbara...",
  },
  {
    image: "/news/article2.jpg",
    title: "Review Phương Pháp Học Tập Feynman của Âm Hồng Tín & Lý Vĩ",
    description: "Phương Pháp Học Tập Feynman là một cuốn sách khá thú vị...",
  },
  {
    image: "/news/article3.jpg",
    title: "Hàn Lập đại chiến Ông Thiên Nhân, bối cảnh, tu vi, kết quả",
    description: "HÀN LẬP VS ÔN THIÊN NHÂN LIỆU ĐÂY CÓ PHẢI LÀ CUỘC ĐỐI ĐẦU ĐỈNH...",
  },
  {
    image: "/news/article4.jpg",
    title: "Chân linh Du Thiên Côn Bằng là gì? Nguồn gốc và công dụng?",
    description: "CHÂN LINH DU THIÊN CÔN BẰNG trong thế giới Phàm Nhân Tu Tiên...",
  },
];

const smallNews = [
  "Chung Tay Góp Ebook Vì Cộng Đồng Phát Triển",
  "Nên Đọc Sách Giấy Hay Dùng Điện Thoại Để Đọc Sách",
  "Mình Đã Học Cách Kiểm Soát Cơn Giận Như Thế Nào",
  "Trận Tử Chiến Pháo Đài Đồng Đằng – Trận Đánh 1 Chọi 30",
  "Trở Thành Kẻ Thua Cuộc Có Phải Là Một Điều Xấu",
  "3 Cuốn tiểu thuyết nhất định chị em không được bỏ qua trong đời",
];

const NewsSection = () => {
  return (
    <section className="w-full xl:container mx-auto px-4 py-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Tin tức – bài viết mới cập nhật</h2>
        <p className="text-gray-600 text-sm">Dưới đây là một số bài viết, tin tức tổng hợp của chúng tôi, mời bạn tìm đọc:</p>
      </div>

      {/* Grid chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột bài viết lớn */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {newsArticles.map((article, index) => (
            <NewsCard key={index} image={article.image} title={article.title} description={article.description} />
          ))}
        </div>

        {/* Cột danh sách bài viết nhỏ */}
        <div className="hidden lg:block border-l border-gray-200 pl-6">
          <h3 className="text-lg font-bold mb-4">Bài viết nổi bật</h3>
          <div className="space-y-4">
            {smallNews.map((title, index) => (
              <NewsCard key={index} image={`/news/small${index + 1}.jpg`} title={title} isSmall={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;