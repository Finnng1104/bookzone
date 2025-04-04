import Banner from "@/components/banner/Banner";
import BookList from "@/components/book/BookList";
import FeatureList from "@/components/ui/FeatureList";
import HeroBanner from "@/components/banner/HeroBanner";
import NewsSection from "@/components/ui/NewsSection";

const getBooks = async () => {
  const res = await fetch("http://localhost:8080/api/books?limit=12", {
    cache: "no-store",
  });
  const json = await res.json();

  return json.data;
};

const Home = async () => {
  const books = await getBooks();

  return (
    <>
      <Banner />
      <div className="hidden md:block">
        <FeatureList />
      </div>

      <BookList
        title="Top eBook tải nhiều"
        description="Tổng hợp những eBook tải về nhiều nhất trong tháng."
        buttonText="Xem thêm EBOOK HOT"
        buttonLink="/thu-vien-sach"
        books={books}
      />

      <BookList
        title="Các ebook mới nhất"
        description="Dưới đây là một số eBook mới tổng hợp, mời bạn đọc thưởng sách:"
        buttonText="Xem thêm EBOOK MỚI"
        buttonLink="/thu-vien-sach"
        books={books}
      />

      <HeroBanner />
      <NewsSection />
      <FeatureList />
    </>
  );
};

export default Home;