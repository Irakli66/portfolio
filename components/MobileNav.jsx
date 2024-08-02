'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CiMenuFries } from 'react-icons/ci';
import { FaRegCopyright } from 'react-icons/fa';

const links = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'services',
    path: '/services',
  },
  {
    name: 'resume',
    path: '/resume',
  },
  {
    name: 'work',
    path: '/work',
  },
  {
    name: 'contact',
    path: '/contact',
  },
];

const MobileNav = () => {
  const date = new Date();
  let year = date.getFullYear();

  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTitle>
        <SheetTrigger className="flex justify-center items-center">
          <CiMenuFries className="text-[32px] text-accent" />
        </SheetTrigger>
      </SheetTitle>
      <SheetDescription>
        <SheetContent className="flex flex-col">
          <div className="mt-24 mb-24 text-center text-2xl">
            <Link href="/">
              <h1 className="text-4xl font-semibold">
                Irakli
                <span className="text-accent">.</span>
              </h1>
            </Link>
          </div>
          <nav className="flex flex-col justify-center items-center gap-8">
            {links.map((links, index) => {
              return (
                <SheetFooter key={index}>
                  <SheetClose asChild>
                    <Link
                      href={links.path}
                      // key={index}
                      className={`${
                        links.path === pathname &&
                        'text-accent border-b-2 border-accent'
                      } text-xl capitalize hover:text-accent transition-all`}
                    >
                      {links.name}
                    </Link>
                  </SheetClose>
                </SheetFooter>
              );
            })}
          </nav>
          <p className="flex items-center justify-center gap-3 text-accent mt-14">
            <FaRegCopyright />
            {year}
          </p>
        </SheetContent>
      </SheetDescription>
    </Sheet>
  );
};

export default MobileNav;
