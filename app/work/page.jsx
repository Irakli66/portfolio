'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { BsArrowUpRight, BsGithub } from 'react-icons/bs';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import Link from 'next/link';
import Image from 'next/image';
import WorkSliderBtns from '@/components/WorkSliderBtns';

const projects = [
  {
    num: '01',
    category: 'frontend',
    title: 'cybertv',
    description:
      'cybertv.gg is an esports platform for esports federation of Georgia that hosts game events.',
    stack: [
      { name: 'React.js' },
      { name: 'Styled-components' },
      { name: 'Figma' },
    ],
    image: '/assets/work/cybertv.png',
    live: 'https://cybertv.gg/',
    github: '',
  },
  {
    num: '02',
    category: 'frontend',
    title: 'Clipart assigment project',
    description: 'Clipart assigment project.',
    stack: [{ name: 'Vue.js' }, { name: 'Tailwind.css' }, { name: 'Node.js' }],
    image: '/assets/work/clipart.png',
    live: 'https://spontaneous-treacle-4f4ec0.netlify.app/',
    github: 'https://github.com/Irakli66/clipart-assignment',
  },
  {
    num: '03',
    category: 'frontend',
    title: 'website for Gargar.dev',
    description:
      'I am co-founder of gargar.dev which provides software solutions to people who need one.',
    stack: [{ name: 'Next.js' }, { name: 'Tailwind.css' }],
    image: '/assets/work/gargar.png',
    live: 'https://gargar-app.vercel.app/',
    github: 'https://github.com/Irakli66/gargar-app',
  },
  {
    num: '04',
    category: 'fullstack',
    title: 'Sweeft assigment project',
    description: 'Sweeft assigment project.',
    stack: [{ name: 'Next.js' }, { name: 'Styled-components' }],
    image: '/assets/work/sweeft.png',
    live: 'https://roaring-elf-95de16.netlify.app/',
    github: 'https://github.com/Irakli66/Sweeft-Project',
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideCange = (swiper) => {
    //get current slide index
    const currentIndex = swiper.activeIndex;
    //update project state base on current slide index
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 2.4,
          duration: 0.4,
          ease: 'easeIn',
        },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px]  flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              <p className="text-white/60">{project.description}</p>
              {/* stack */}
              <ul className="flex gap-4 ">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {index !== project.stack.length - 1 && ','}
                    </li>
                  );
                })}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                <Link href={project.live} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[60px] h-[60px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* github project button */}
                <Link href={project.github} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[60px] h-[60px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px]  mb-12"
              onSlideChange={handleSlideCange}
            >
              {projects?.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="xl:h-[460px] h-[360px] rounded-md relative  group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-fill rounded-md"
                          alt="project image"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slide buttons  */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent rounded-md xl:rounded-md hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
