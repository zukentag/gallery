"use client";

import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import componentArray from "@/data/common/componentsData";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function page() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, loop: true })
  );
  return (
    <div className="min-h-screen dark:bg-grid-white/[0.03] bg-grid-black/[0.03]">
      <div className="flex flex-col md:flex-row mx-auto gap-5 p-5">
        <div className="text-7xl w-full md:w-[60%] md:ml-5 font-semibold mt-5">
          Your Ultimate Destination for
          <span className="  text-green-500 hover:text-yellow-300 ">
            {" "}
            Functional{" "}
          </span>
          and Trending
          <br />
          <span className=" text-green-500 hover:text-yellow-300">
            {" "}
            UI Components{" "}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Carousel
            plugins={[plugin.current]}
            className=" w-full max-w-md"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className=" ">
              {componentArray.map((c, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-col justify-center items-center w-full min-h-[60vh] overflow-hidden"
                >
                  <CardContainer className="w-full sm:w-[90%]">
                    <CardBody className="bg-gray-50 relative group/card w-full md:w-[30rem] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                      >
                        {c.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        {c.description}
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mt-4">
                        <Image
                          src={c.image}
                          height="1000"
                          width="1000"
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
// <Card className="flex flex-col justify-center items-center w-full min-h-[60vh] bg-white shadow-lg rounded-lg overflow-hidden">
//   {/* <CardHeader className="text-xl font-bold py-4">
//                   {c.title}
//                 </CardHeader> */}
//   <div className="h-[10rem] w-[20rem]">
//     <Image
//       src={c.image}
//       width={200}
//       height={200}
//       layout="responsive"
//       // objectFit="true"
//       alt="image-card"
//       className="mb-4"
//     />
//   </div>
//   <CardContent className="flex flex-col justify-center items-center">
//     <p className="text-gray-700 text-center px-6">{c.description}</p>
//   </CardContent>
// </Card>;
