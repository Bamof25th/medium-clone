import AppBar from "../components/AppBar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import BlogCard from "./../components/BlogCard";

const Blogs = () => {
  const { blogsData, loading } = useBlogs();
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div className="">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  // console.log(blogsData);
  return (
    <>
      <AppBar />
      <div>
        {blogsData.map((blog, i) => (
          <BlogCard
            key={i}
            authorName={blog.author.name || "Anonymous"}
            publishDate={Date().slice(4, 21)}
            title={blog.title}
            content={blog.content}
            id={blog.id}
          />
        ))}
      </div>
    </>
  );
};

export default Blogs;
