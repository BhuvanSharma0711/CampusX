"use client"
import React from 'react'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3D-card";
import Link from 'next/link';
import {Input} from "@heroui/react";
import { usePathname } from "next/navigation";

const SearchIcon = (props:any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

function Foodgallery() {
  const pathname = usePathname();
  return (
    <div>
        <div className='relative w-screen h-[50vh] sm:h-[400px] overflow-hidden'>
            <Image
                src="/foodgallery.avif"
                alt="food gallery background"
                fill
                className='object-cover'
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/40">
              <h1 className="text-3xl sm:text-4xl font-bold">Food Gallery</h1>
              <p className="text-lg sm:text-xl mt-2">Discover the best food and drinks near campus</p>
              <div className='w-1/2 bg-white mt-5'>
                <Input
                  isClearable
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "shadow-xl",
                      "bg-default-200/50",
                      "dark:bg-default/60",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "hover:bg-default-200/70",
                      "dark:hover:bg-default/70",
                      "group-data-[focus=true]:bg-default-200/50",
                      "dark:group-data-[focus=true]:bg-default/60",
                      "!cursor-text",
                    ],
                  }}
                  placeholder="Search for restaurant or dish"
                  radius="lg"
                  startContent={
                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </div>  
            </div>
        </div>
        <div className='md:flex justify-center gap-6 px-6 mt-0'>
          <Link href={`${pathname}/order-online`}>
            <CardContainer>
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 pt-0 border">
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="/orderonline.avif"
                    height="1000"
                    width="1000"
                    className="h-32 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white pt-4"
                >
                  Order online
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  order at nit back gate or main gate.
                </CardItem>
              </CardBody>
            </CardContainer>
          </Link>
          <Link href={`${pathname}/dining`}>
            <CardContainer>
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 pt-0 border">
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="/dining.avif"
                    height="1000"
                    width="1000"
                    className="h-32 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white pt-4"
                >
                  Dining
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  View all the cafe and retro inside or near campus
                </CardItem>
              </CardBody>
            </CardContainer>
          </Link>
        </div>
    </div>
  )
}

export default Foodgallery