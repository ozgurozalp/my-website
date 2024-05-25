"use client";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import AppLogo from "@/components/shared/AppLogo";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useThrottle } from "@uidotdev/usehooks";
import { useEventListener, useWindowSize } from "usehooks-ts";
import { usePathname } from "next/navigation";

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();
  const throttledWidth = useThrottle(width, 500);
  const path = usePathname();

  useEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  useEffect(() => {
    if (!throttledWidth) return;
    setOpen(false);
  }, [throttledWidth]);

  /*
  const blogs = allBlogs.all();

  const categoriesOnlyHasOneBlog = CATEGORIES.filter((category) => {
    return (
      blogs.filter((blog) =>
        blog.frontMatter.categories.includes(category.slug),
      ).length === 1
    );
  });
   */

  return (
    <>
      <header
        className={cn(
          "sticky pointer-events-auto top-0 z-50 lg:py-0 lg:relative h-[--header-height] bg-background/95",
        )}
      >
        <div className="container flex [&>*]:shrink-0 justify-between items-center relative z-50 w-full max-h-[--header-height]">
          <Link
            onClick={() => setOpen(false)}
            className="flex items-center text-2xl font-semibold overflow-hidden max-h-[--header-height]"
            href={path.startsWith("/blog/") ? "/blog" : "/"}
          >
            <AppLogo className="size-36" />
          </Link>
          <nav className="rounded-4xl hidden lg:flex [&>*]:shrink-0 items-center p-1 text-lg h-14 leading-[22px] border-2 bg-white border-[--brand]">
            {CATEGORIES.map((category, index) => (
              <Link
                className={cn(
                  "px-7 h-full flex items-center -mx-2 hover:bg-[--brand] hover:text-white transition-all rounded-full",
                  index === 0 && "!ml-0",
                  index === CATEGORIES.length - 1 && "!mr-0",
                )}
                key={category.slug}
                href={`/blog/category/${category.slug}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="-m-2 size-12 shrink-0 hover:cursor-pointer flex lg:hidden overflow-hidden"
          >
            <svg
              className={cn(
                "hamburger-menu-button w-full shrink-0",
                open && "active",
              )}
              viewBox="0 0 100 100"
              width="80"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeDasharray="40 160"
                className="line top"
                d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeDasharray="40 142"
                className="line middle"
                d="m 30,50 h 40"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="round"
                className="line bottom"
                strokeDasharray="40 85"
                d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
              />
            </svg>
          </button>
        </div>
      </header>
      <MobileMenu open={open} setOpen={setOpen} />
    </>
  );
}

function MobileMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex flex-col justify-between bg-background/95 fixed border-t-2 max-w-full w-full pointer-events-auto bottom-0 z-50 top-[--header-height] mobile-menu-open"
        >
          <nav>
            {CATEGORIES.map((category, index) => (
              <div key={category.slug} className="border-b-2 border-dashed">
                <Link
                  onClick={() => setOpen(false)}
                  className={cn(
                    "align-center container block font-medium py-4 md:px-[34px] text-[22px]",
                  )}
                  href={`/blog/category/${category.slug}`}
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </nav>
          <div className="flex justify-center items-center font-normal p-4 pb-5 align-center text-base">
            <span>
              Created by{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-2 font-medium"
                href="https://github.com/ozgurozalp"
              >
                Özgür ÖZALP
              </a>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
