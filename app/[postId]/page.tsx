"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";

interface Post {
  title: string;
  date: Date;
  imgUrl: string;
  article: string;
}
const page = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/blog/${params.postId}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const postArray = data.post || [];
        setPost(postArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mb-5 min-h-[100vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">{post?.title}</h1>
            <p className="text-gray-500 text-sm">
              Published on {moment(post?.date).format("MMMM Do YYYY")}
            </p>
          </div>

          <img
            src={post?.imgUrl}
            alt={post?.title}
            className="w-full h-auto mb-8"
          />

          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto text-justify">
            <div
              dangerouslySetInnerHTML={{
                __html: post?.article ? post.article : "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
