import React from 'react'
import { PropsWithChildren } from 'react';
import {Card, CardBody, Image, Button, Slider} from "@heroui/react";

function Shopcards(props:any){
  return (
    <Card
      className="border-4 bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={150}
              shadow="md"
              src="props.img"
              width="100%"
            />
          </div>
          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{props.shopname}</h3>
                <p className="text-small text-foreground/80">{props.description}</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Shopcards