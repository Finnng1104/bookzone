import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48 w-full">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <span className="text-sm text-pink-600 font-medium">{blog.category}</span>
        <h3 className="text-lg font-semibold mt-2 group-hover:text-pink-600 transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{blog.excerpt}</p>
      </div>
    </Link>
  );
}