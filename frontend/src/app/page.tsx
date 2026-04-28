import Banner from "@/components/banner/Banner";
import BookList from "@/components/book/BookList";
import FeatureList from "@/components/ui/FeatureList";
import HeroBanner from "@/components/banner/HeroBanner";
import NewsSection from "@/components/ui/NewsSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchBooksFromApi = async (path: string) => {
  if (!API_URL) {
    console.error("[Home] Missing NEXT_PUBLIC_API_URL in runtime environment.");
    return [];
  }

  const url = `${API_URL}${path}`;
  const res = await fetch(url, { cache: "no-store" });
  const raw = await res.text();

  if (!res.ok) {
    console.error(`[Home] API request failed (${res.status}) at ${url}: ${raw.slice(0, 200)}`);
    return [];
  }

  try {
    const json = JSON.parse(raw);
    return Array.isArray(json?.data) ? json.data : [];
  } catch {
    console.error(`[Home] Invalid JSON response at ${url}: ${raw.slice(0, 200)}`);
    return [];
  }
};

const getBooks = async () => {
  const category = encodeURIComponent("Quản Trị");
  return fetchBooksFromApi(`/api/books/category/${category}?limit=12`);
};

const getHotBooks = async () => {
  return fetchBooksFromApi("/api/books/category/Hot?limit=12");
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
        buttonLink="/danh-muc-sach?type=category&q=Hot"
        books={hotbooks}
      />

      <BookList
        title="Sách Quản trị"
        description="Tổng hợp những cuốn sách hay nhất về quản trị, giúp bạn nâng cao kỹ năng lãnh đạo và quản lý."
        buttonText="Xem thêm sách Quản trị"
        buttonLink="/danh-muc-sach?type=category&q=Quản Trị"
        books={books}
      />

      <HeroBanner />
      <NewsSection />
      <FeatureList />
    </>
  );
};

export default Home;
