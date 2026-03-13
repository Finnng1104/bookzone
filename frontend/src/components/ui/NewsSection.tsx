"use client";

import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  content: string;
  recommend: boolean;
}

const NewsSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/blogs.json");
        const data: Article[] = await res.json();

        const latestArticles = data.slice(0, 4);
        setArticles(latestArticles);

        const featured = data.filter(article => article.recommend).slice(0, 6);
        setFeaturedArticles(featured);
      } catch (error) {
        console.error("Error loading articles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-full xl:container mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Tin tức – bài viết mới cập nhật</h2>
        <p className="text-gray-600 text-sm">
          Dưới đây là một số bài viết, tin tức tổng hợp của chúng tôi, mời bạn tìm đọc:
        </p>
      </div>

      {/* PC layout */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              image={article.image}
              title={article.title}
              description={article.excerpt}
              slug={article.slug}
            />
          ))}
        </div>

        <div className="border-l border-gray-200 pl-6">
          <h3 className="text-lg font-bold mb-4">Bài viết nổi bật</h3>
          <div className="space-y-4">
            {featuredArticles.map((article) => (
              <NewsCard
                key={article.id}
                image={article.image}
                title={article.title}
                isSmall={true}
                slug={article.slug}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Swiper layout */}
      <div className="lg:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.1}
          grabCursor={true}
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id}>
              <NewsCard
                image={article.image}
                title={article.title}
                description={article.excerpt}
                slug={article.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewsSection;