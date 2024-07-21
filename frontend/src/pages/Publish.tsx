import ReactQuill from "react-quill";
import AppBar from "./../components/AppBar";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <AppBar />
      <div className="flex justify-center m-3 ">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            className=" border border-slate-400 block w-full p-2.5 outline-none"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />

          <ReactQuill
            theme="snow"
            placeholder="Write Something"
            className="mb-12 h-96 outline-none border-block "
            onChange={(value) => {
              setContent(value);
            }}
          />
          <button
            type="button"
            className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 m-2 mb-2 "
            onClick={async () => {
              const res = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                },
                {
                  headers: { Authorization: localStorage.getItem("token") },
                }
              );
              navigate(`/blog/${res.data.id}`);
            }}
          >
            Post Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;

// const ContentArea = () => {
//   return (
//     <>
//       <form>
//         <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
//           <div className="px-4 py-2 bg-white rounded-t-lg ">
//             <label className="sr-only">Your comment</label>
//             <textarea
//               id="comment"
//               className="w-full px-0 text-sm text-gray-900 bg-white border-0 "
//               placeholder="Write a comment..."
//               required
//             ></textarea>
//           </div>
//           <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
//             <button
//               type="submit"
//               className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
//             >
//               Post comment
//             </button>
//             <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
//               <button
//                 type="button"
//                 className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
//               ></button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };
