import Banner from "@/components/banner/Banner";
import BookList from "@/components/book/BookList";
import FeatureList from "@/components/ui/FeatureList";
import HeroBanner from "@/components/banner/HeroBanner";
import NewsSection from "@/components/ui/NewsSection";
const Home = () => {
  return (
    <>
      <Banner />
      <FeatureList />
      <BookList
        title="Top eBook tải nhiều"
        description="Tổng hợp những eBook tải về nhiều nhất trong tháng."
        buttonText="Xem thêm EBOOK MỚI"
        buttonLink="/thu-vien-sach"
      />
      <BookList
        title="Các ebook mới nhất"
        description="Dưới đây là một số eBook mới tổng hợp, mời bạn đọc thưởng sách:"
        buttonText="Xem thêm EBOOK MỚI"
        buttonLink="/thu-vien-sach"
      />
      <HeroBanner />
      <NewsSection />
      <FeatureList />
    </>
  );
};

export default Home;
