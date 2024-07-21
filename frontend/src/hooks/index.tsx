import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [blogsData, setBlogsData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogsData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setBlogsData(err.data);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogsData,
  };
};

export const useBlog = ({ id }: { id: number }) => {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      }).catch((err) => {
        setBlog(err.data);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};
