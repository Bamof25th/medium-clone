import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex justify-center ">
      <div className="grid grid-cols-12 px-10 w-full pt-10 gap-10 max-w-screen-2xl ">
        <div className="col-span-8 ">
          <div className="text-5xl font-extrabold">{blog.title}</div>
          <div className="text-slate-500 pt-2">Posted on 2nd December 2023</div>
          <div
            className="mt-5"
            dangerouslySetInnerHTML={{ __html: blog.content && blog.content }}
          />
        </div>
        <div className="col-span-4 pt-10 ">
          <div className="text-lg text-slate-500 font-bold ">Author</div>
          <div className="flex flex-col ">
            <div className="flex flex-wrap">
              <div className="pr-2 flex flex-row gap-2 mb-2">
                <Avatar name={blog.author.name || "Anonymous"} size="small" />
                <div className="text-2xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
              </div>
              <div className="">
                “Don’t focus on having a great blog. Focus on producing a blog
                that’s great for your readers.” – Brian Clark
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
