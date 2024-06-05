"use client";

import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

import Autoplay from "embla-carousel-autoplay";
import componentArray from "@/data/common/componentsData";
import Image from "next/image";

export default function Page() {
  const plugin = useRef(
    Autoplay({
      delay: 1000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );

  return (
    <div className="min-h-screen dark:bg-grid-white/[0.03] bg-grid-black/[0.03]">
      <div className="flex flex-col md:flex-row mx-auto gap-5 p-5">
        <div className="w-full md:w-[60%] md:ml-5 mt-5">
          <div className="text-7xl font-semibold ">
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
          <br />
          <div className="text-2xl">
            Copy paste components and use them in your websites without having
            to worry about functioning
          </div>
          <div className="flex flex-row gap-4 mt-4">
            <div className="flex justify-center items-center gap-2">
              <RiNextjsFill size={30} color="green" />

              <span>Next.js</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <FaReact color="green" size={30} />

              <span>React</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <RiTailwindCssFill size={30} color="green" />

              <span>Tailwind</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <SiTypescript size={25} color="green" />

              <span>Typescript</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Carousel
            plugins={[plugin.current]}
            opts={{ loop: true }}
            className=" w-full max-w-md"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className=" ">
              {componentArray.map((c, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-col justify-center items-center w-full min-h-[60vh] max-h[60vh] overflow-hidden"
                >
                  <CardContainer className="w-full sm:w-[90%]">
                    <CardBody className="bg-gray-50 relative group/card w-full md:w-[30rem] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-green-500"
                      >
                        {c.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-black text-sm max-w-sm mt-2 "
                      >
                        {c.description}
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mt-4">
                        <Image
                          src={c.image}
                          height="1000"
                          width="1000"
                          className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
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
