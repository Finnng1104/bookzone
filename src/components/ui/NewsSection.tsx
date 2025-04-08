"use client";

import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  content: string;
  recommend: boolean; // ✅ Recommend nên để boolean, không phải string
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
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Tin tức – bài viết mới cập nhật</h2>
        <p className="text-gray-600 text-sm">
          Dưới đây là một số bài viết, tin tức tổng hợp của chúng tôi, mời bạn tìm đọc:
        </p>
      </div>

      {/* Grid chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột bài viết lớn */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              image={article.image}
              title={article.title}
              description={article.excerpt}
              slug={article.slug} // ✅ Thêm link slug cho card chính
            />
          ))}
        </div>

        {/* Cột danh sách bài viết nổi bật */}
        <div className="hidden lg:block border-l border-gray-200 pl-6">
          <h3 className="text-lg font-bold mb-4">Bài viết nổi bật</h3>
          <div className="space-y-4">
            {featuredArticles.map((article) => (
              <NewsCard
                key={article.id}
                image={article.image}
                title={article.title}
                isSmall={true}
                slug={article.slug} // ✅ Thêm link slug cho card nhỏ
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;