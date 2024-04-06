"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import moment from "moment";

interface Post {
  _id?: string;
  title?: string;
  categories?: string;
  imgUrl?: string;
  article?: string;
  author?: string;
  createdAt?: Date;
}

const page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status !== "authenticated") {
      redirect("/");
    }
  }, [session.status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const postArray = data.post || [];
        setPosts(postArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    router.replace("/");
  };

  const editSvgStyle = {
    fill: "#0caf24",
    transform: "",
    msFilter: "",
  };

  const deleteSvgStyle = {
    fill: "#df0e0e",
    transform: "",
    msFilter: "",
  };

  return (
    <section className="w-full h-full flex flex-col">
      <h1 className="text-center text-2xl font-semibold text-color-5 capitalize lg:text-3xl pb-3">
        Dashboard
      </h1>

      {loading && (
        <div className="flex space-x-2 justify-center items-center bg-white h-screen ">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      )}
      <div className="grid desktop:grid-cols-3 laptop:grid-cols-3 tablet:grid-cols-2  phone:grid-cols-1 gap-3 px-3">
        {!loading &&
          posts
            ?.slice()
            .reverse()
            .map((post) => (
              <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md ">
                <img
                  className="object-cover w-full h-64"
                  src={post.imgUrl ? post.imgUrl : "../../public/react.jpg"}
                  alt="Article"
                />

                <div className="p-6">
                  <div>
                    <span className="text-xs font-medium text-blue-600 uppercase ">
                      {post.categories?.split(",").join(" - ")}
                    </span>
                    <h1 className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform  hover:text-gray-600 hover:underline">
                      {post.title}
                    </h1>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.article
                          ? post.article.slice(0, 350) + "..."
                          : "",
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="mx-2 font-semibold text-gray-700 ">
                          {post.author}
                        </p>
                      </div>
                      <span className="mx-1 text-xs text-gray-600">
                        Criado em{" "}
                        {moment(post.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                      <Link
                        href={`/${post._id}/edit`}
                        className="hover:scale-125"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          style={editSvgStyle}
                        >
                          <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path>
                          <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path>
                        </svg>
                      </Link>

                      <button
                        onClick={() => post._id && handleDelete(post._id)}
                        className="hover:scale-125"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          style={deleteSvgStyle}
                        >
                          <path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm.706 13.293-1.414 1.414L12 13.415l-3.292 3.292-1.414-1.414 3.292-3.292-3.292-3.292 1.414-1.414L12 10.587l3.292-3.292 1.414 1.414-3.292 3.292 3.292 3.292z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default page;
