import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id: number;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex  justify-center ">
        <div className="max-w-lg">
          <div className="border-b pb-4 border-slate-200 flex flex-col mb-4">
            <div className="flex gap-1">
              <div className="flex flex-col justify-center ">
                <Avatar name={authorName} size={"small"} />
              </div>
              <div className="flex flex-col justify-center font-extralight pl-2">
                {authorName}
              </div>
              <div className="flex flex-col justify-center pl-2">
                <Circle />
              </div>
              <div className="text-sm text-slate-400 flex flex-col justify-center">
                {publishDate}
              </div>
            </div>
            <div className="text-xl font-bold pt-2">{title}</div>
            <div
              className="text-[1.2rem] mt-1 font-thin"
              dangerouslySetInnerHTML={{
                __html: content && content.slice(0, 110) + "...",
              }}
            />

            <div className="text-slate-400 text-sm pt-2">{`${Math.ceil(
              content.length / 160
            )} min read`}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

export const Avatar = ({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full ${
        size === "small" ? "w-8 h-8" : "w-10 h-10"
      }`}
    >
      <span
        className={`font-medium text-gray-600 ${
          size === "small" ? "text-md" : "text-lg"
        }`}
      >
        {name.charAt(0)}
      </span>
    </div>
  );
};
export const Circle = () => {
  return <div className="h-2 w-2 bg-slate-400 rounded-full"></div>;
};
