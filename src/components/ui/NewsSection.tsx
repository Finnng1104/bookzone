import NewsCard from "./NewsCard";


const newsArticles = [
  {
    image: "/images/post1.jpg",
    title: "Review Học Cách Học của Barbara Oakley",
    description: "Học Cách Học là một cuốn sách rất giá trị và đáng đọc của Barbara...",
  },
  {
    image: "/images/post2.png",
    title: "Review Phương Pháp Học Tập Feynman của Âm Hồng Tín & Lý Vĩ",
    description: "Phương Pháp Học Tập Feynman là một cuốn sách khá thú vị...",
  },
  {
    image: "/images/post3.jpg",
    title: "Hàn Lập đại chiến Ông Thiên Nhân, bối cảnh, tu vi, kết quả",
    description: "HÀN LẬP VS ÔN THIÊN NHÂN LIỆU ĐÂY CÓ PHẢI LÀ CUỘC ĐỐI ĐẦU ĐỈNH...",
  },
  {
    image: "/images/post4.jpg",
    title: "30 Tuổi – Mọi Thứ Chỉ Mới Bắt Đầu",
    description: "Một cuốn sách truyền cảm hứng mạnh mẽ dành cho những ai đang cảm thấy chênh vênh ở ngưỡng tuổi 30. Tác giả Lý Thượng Long mang đến góc nhìn mới mẻ về hành trình trưởng thành, giúp bạn nhận ra rằng: tuổi 30 không phải là dấu chấm hết, mà là sự khởi đầu cho những cơ hội và thay đổi lớn lao.",
  }  
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