"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Posts = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const postArray = data.post || [];
        setPost(postArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    setLoading(false);
  }, []);

  return (
    <section className="">
      <div className="container px-6 py-10 mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-color-5 capitalize lg:text-3xl">
            Posts recentes{" "}
          </h1>
        </div>

        <hr className="my-8 border-gray-200" />

        {loading && (
          <div className="flex space-x-2 justify-center items-center bg-white h-screen ">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {!loading &&
            post
              .slice()
              .reverse()
              .map((post: any) => (
                <div key={post.id}>
                  <img
                    className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                    src={post.imgUrl}
                    alt="Post Image"
                  />

                  <div className="mt-8">
                    <span className="text-blue-500 uppercase">
                      {post.categories.split(",").join(" - ")}
                    </span>

                    <h1 className="mt-4 text-xl font-semibold text-gray-800 ">
                      {post.title}
                    </h1>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.article
                          ? post.article.slice(0, 350) + "..."
                          : "",
                      }}
                    />

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <Link
                          href="#"
                          className="text-lg font-medium text-gray-700  hover:underline hover:text-gray-500"
                        >
                          {post.author}
                        </Link>

                        <p className="text-sm text-gray-500 ">
                          {moment(post.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </p>
                      </div>

                      <Link
                        href={`/${post._id}`}
                        className="inline-block text-blue-500 underline hover:text-blue-400"
                      >
                        Leia Mais
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;
