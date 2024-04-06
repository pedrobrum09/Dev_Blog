"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const DynamicJorditEditor = dynamic(
  () => import("jodit-react").then((mod) => mod.default),
  { ssr: false }
);

const page = () => {
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [article, setArticle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const session = useSession();
  const router = useRouter();

  const editor = useRef(null);

  const placeholder = "Start typings...";

  const config = useMemo(
    () => ({
      readonly: false, // todas as opções em https://xdsoft.net/jodit/docs/
      placeholder: placeholder || "Comece a digitar...",
      width: "98vw",
    }),
    [placeholder]
  );

  console.log(article);

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      setLoading(true);
      router.replace("/");
    }
  }, [session, router]);

  const categoriesArray = String(categories)
    .split(",")
    .map((tag) => tag.trim().toLowerCase());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      title.trim() === "" ||
      categories.length === 0 ||
      image.trim() === "" ||
      !article.trim()
    ) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          categories: categories,
          imgUrl: image,
          article,
          author: session.data?.user?.name,
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="overflow-hidden w-full min-h-screen flex flex-col">
      {loading && (
        <div className="flex space-x-2 justify-center items-center bg-white h-screen ">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      )}

      {!loading && (
        <form
          className="flex flex-col justify-between  items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold text-color-5 capitalize lg:text-3xl text-center">
            Novo Post
          </h1>
          <hr />
          <div className="bg-white p-4 rounded-lg w-full">
            <div className="relative bg-inherit w-full">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Type inside me"
              />
              <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
                Título
              </label>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg w-full">
            <div className="relative bg-inherit w-full">
              <input
                type="text"
                className="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Type inside me"
                onChange={(e) => setCategories(e.target.value)}
              />
              <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
                Categorias
              </label>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg w-full">
            <div className="relative bg-inherit w-full">
              <input
                type="url"
                className="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                placeholder="Type inside me"
                onChange={(e) => setImage(e.target.value)}
              />
              <label className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">
                Url da imagem
              </label>
            </div>
          </div>

          <DynamicJorditEditor
            ref={editor}
            value={article}
            config={config}
            onBlur={(newContent) => setArticle(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />

          <input
            type="submit"
            value="Publicar"
            className="bg-black text-white hover:text-orange-600 w-75 text-2xl px-4 py-2 rounded-lg my-10 phone:mt-16"
          />
        </form>
      )}
    </div>
  );
};

export default page;
