import React from 'react'
import { CardBody, CardContainer, CardItem } from "./ui/3D-card";
import Image from "next/image";
import {Button} from "@heroui/react";

interface HeartIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  fill = "currentColor",
  filled = false,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={filled ? fill : "none"}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

function Shopcards(props:any){
  return (
    <div>
      <CardContainer>
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[20rem] md:w-[25rem] h-auto rounded-xl p-0 pt-0 border">
            <CardItem translateZ="100" className="w-full">
              <Image
                src={props.img}
                height="1000"
                width="1000"
                className="h-52 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-2xl font-bold text-neutral-700 dark:text-white pl-6 pt-2"
            >
              {props.shopname}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 pl-6"
            >
             {props.location}
            </CardItem>
            <div className="flex justify-between items-center mt-2 pl-3 pb-3">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                Check Availability
              </CardItem>
              <Button isIconOnly aria-label="Like" color="danger">
                <HeartIcon />
              </Button>
              
            </div>
          </CardBody>
        </CardContainer>
    </div>
  )
}

export default Shopcards