import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import { useBlog } from "../hooks";
import FullBlog from "./../components/FullBlog";
import { Spinner } from "./../components/Spinner";
import Error from "../components/Error";

const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({
    id: Number(id || ""),
  });
  if (loading) {
    return (
      <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    );
  }
  // console.log(blog);
  return (
    <>
      <AppBar />
      {blog ? <FullBlog blog={blog} /> : <Error />}
    </>
  );
};

export default Blog;
