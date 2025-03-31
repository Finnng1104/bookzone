import FeatureCard from "@/components/ui/FeatureCard";

const features = [
  {
    icon: "/icons/icon1.jpg",
    title: "Thể loại đa dạng",
    description: "Sưu tầm từ nhiều nguồn",
  },
  {
    icon: "/icons/update-icon.jpg",
    title: "Cập nhật liên tục",
    description: "Hỗ trợ update trọn đời",
  },
  {
    icon: "/icons/them-moi.jpg",
    title: "Thêm mới ebook",
    description: "Liên tục hàng tuần",
  },
  {
    icon: "/icons/thanh-toan.jpg",
    title: "Tải về nhanh chóng",
    description: "Linh hoạt, bảo mật",
  },
];

const FeatureList = () => {
  return (
    <div className="w-full xl:container mx-auto px-4 py-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tại sao chọn chúng tôi?</h2>
        <p className="text-gray-600 text-sm">Những ưu điểm vượt trội giúp bạn có trải nghiệm tốt nhất.</p>
      </div>

      {/* Danh sách tính năng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureList;