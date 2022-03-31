import { MenuIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MobileMenu = () => {
  const route = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const pathnames = route.pathname.split("/")
    if (pathnames[1]) setTitle(pathnames[1])
    else setTitle("home")
  }, [route.pathname])


  const openMenu = () => setOpen(true)
  const closeMenu = () => setOpen(false)

  const menuItems = [
    { href: "/", text: "home" },
    { href: "/blog", text: "blog" },
    { href: "/music", text: "music" },
    { href: "/portfolio", text: "portfolio" },
  ]

  return (
    <>
      <div className="md:hidden fixed inset-x-0 top-0 z-[1000] h-16 w-full 
      flex justify-between items-center p-4 bg-sky-600 image-shadow">
        <div className="text-white font-bold">{title}</div>
        <div onClick={openMenu}>
          <MenuIcon className="w-8 h-8 text-white" />
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black opacity-animation z-[1005] 
        ${open ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      />
      <div
        className={`fixed inset-y-0 right-0 left-[20vw] menu-animation z-[1010] flex flex-col
        ${open ? 'translate-x-0 image-shadow' : 'translate-x-full'} bg-sky-600`}
      >
        {menuItems.map((item) => (
          <Link href={item.href} key={item.text}>
            <a className="p-4 text-white font-medium text-lg border-b" onClick={closeMenu}>{item.text}</a>
          </Link>
        ))}
      </div>
    </>
  )
}

const DesktopMenu = () => (
  <div className="hidden md:flex items-center justify-end w-11/12 xl:w-2/3 h-24 text-xl font-bold text-sky-600">
    <Link href="/">
      <a className="mr-8">home</a>
    </Link>
    <Link href="/blog">
      <a className="mr-8">blog</a>
    </Link>
    <Link href="/music">
      <a className="mr-8">music</a>
    </Link>
    <Link href="/portfolio">
      <a className="mr-4">portfolio</a>
    </Link>
  </div>
)

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <DesktopMenu />
      <MobileMenu />
      <div className="flex justify-center flex-1 w-full h-full mt-16 lg:mt-0">{children}</div>
      <footer className="pt-4 pb-8 xl:pb-4 px-12 text-center">
        <div className="text-sm font-medium text-gray-600">
        Made with Next.js, Keystone.js, and Tailwind CSS
        </div>
      </footer>
    </div>
  );
};

export default Layout;
