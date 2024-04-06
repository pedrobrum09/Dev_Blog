"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Navbar = () => {
  const [auth, setAuth] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    if (session) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [session]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-color-3 p-4 w-full">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full">
          <div className="text-color-2 font-bold text-3xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer">
            DevBlog{" "}
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className={` ${
            isOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row  lg:space-x-4 lg:mt-0 mt-4 flex  gap-5 w-full justify-end items-center text-xl`}
        >
          <Link href={"/"} className="text-white  py-2 hover:text-orange-600 ">
            Home
          </Link>

          {auth && (
            <>
              <Link
                href="/newPost"
                className="text-white  py-2 hover:text-orange-600"
              >
                Novo Post
              </Link>
              <Link
                href="/dashboard"
                className="text-white  py-2 hover:text-orange-600"
              >
                Dashboard
              </Link>
              <button
                className="text-white  py-2 hover:text-orange-600"
                onClick={() => signOut()}
              >
                Sair
              </button>
            </>
          )}

          {!auth && (
            <>
              <Link
                href="/login"
                className="text-white  py-2 hover:text-orange-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-white  py-2 hover:text-orange-600"
              >
                sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
