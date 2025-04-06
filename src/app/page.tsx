import Banner from "@/components/banner/Banner";
import BookList from "@/components/book/BookList";
import FeatureList from "@/components/ui/FeatureList";
import HeroBanner from "@/components/banner/HeroBanner";
import NewsSection from "@/components/ui/NewsSection";

const getBooks = async () => {
  const category = encodeURIComponent("Quản trị");
  const res = await fetch(`http://localhost:8080/api/books/category/${category}?limit=12`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
};

const getHotBooks = async () => {
  const res = await fetch("http://localhost:8080/api/books/category/Hot?limit=12", {
    cache: "no-store",
  });
  const json = await res.json();

  return json.data;
};


const Home = async () => {
  const books = await getBooks();
  const hotbooks = await getHotBooks();

  return (
    <>
      <Banner />
      <div className="hidden md:block">
        <FeatureList />
      </div>

      <BookList
        title="Top eBook Hot"
        description="Tổng hợp những eBook tải về nhiều nhất trong tháng."
        buttonText="Xem thêm EBOOK HOT"
        buttonLink="/thu-vien-sach?type=category&q=Hot"
        books={hotbooks}
      />

      <BookList
        title="Sách Quản trị"
        description="Tổng hợp những cuốn sách hay nhất về quản trị, giúp bạn nâng cao kỹ năng lãnh đạo và quản lý."
        buttonText="Xem thêm sách Quản trị"
        buttonLink="/thu-vien-sach?type=category&q=Quản Trị"
        books={books}
      />

      <HeroBanner />
      <NewsSection />
      <FeatureList />
    </>
  );
};

export default Home;