"use client";

import React from "react";
import List from "../(components)/components/List";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { StaticImageData } from "next/image";
import {
  CopyBlock,
  dracula,
  github,
  nord,
  irBlack,
  atomOneDark,
} from "react-code-blocks";

import dynamic from "next/dynamic";
import componentArray from "@/data/common/componentsData";
import installationData from "@/data/common/installation";

const ComponentPage = ({ params }: { params: { componentId?: string } }) => {
  const ind = componentArray.findIndex((c) => {
    return c.id === params.componentId;
  });

  const component = componentArray[ind] as {
    id: string;
    title: string;
    description: string;
    image: StaticImageData;
    component: string;
    meta: string;
    code: string;
    sourceCode: string;
    language: string;
  };

  const FeatureComponent = dynamic(
    () => import(`@/components/custom/${component.component}`)
  );

  return (
    <div className="p-5 ">
      <div className="flex flex-row">
        <div className="hidden md:block md:w-1/5 lg:block lg:w-1/5 h-[100vh] overflow-x-hidden  overflow-y-scroll no-scrollbar">
          <List />
        </div>
        <div className="w-full md:w-4/5 h-[100vh] overflow-x-hidden  overflow-y-scroll no-scrollbar ">
          <div className="text-left justify-left items-center">
            <div className="text-2xl font-bold">{component.title}</div>
            <div className="text-1xl"> {component.description}</div>

            <Tabs defaultValue="preview" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="preview" defaultChecked={true}>
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              <TabsContent
                value="preview"
                className="w-[92vw] md:w-[70vw] lg:w-[75vw]"
              >
                <Card>
                  <CardContent className="space-y-2 min-h-[20rem] flex items-center justify-center dark:bg-grid-white/[0.04] bg-grid-black/[0.04] relative">
                    <FeatureComponent />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                value="code"
                className="w-[92vw] md:w-[70vw] lg:w-[75vw]"
              >
                <Card>
                  <CardContent className="space-y-2 p-5 min-h-[20rem] ">
                    <CopyBlock
                      text={component.code}
                      language={component.language}
                      theme={atomOneDark}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className=" mt-5 p-2">
            <span className="block text-2xl ">How to use it ? </span>
            <div className="flex flex-col">
              <span className="text-1xl mt-5 mb-5 ml-2">
                1. Install dependencies
              </span>
              <Card>
                <CardContent className="p-1 mx-auto">
                  <CopyBlock
                    text={installationData.commonTailwind}
                    language={component.language}
                    theme={atomOneDark}
                    customStyle={{
                      height: "50px",
                    }}
                  />
                </CardContent>
              </Card>
              <span className="text-1xl mt-5 mb-5 ml-2">
                2. Copy the source code
              </span>
              <span className="text-1xl ml-2 rounded-lg w-fit p-1">
                {component.meta}
              </span>
              <Card>
                <CardContent className="space-y-2 p-2">
                  <CopyBlock
                    text={component.sourceCode}
                    language={component.language}
                    theme={atomOneDark}
                    customStyle={{
                      maxHeight: "20rem",
                      overflowY: "scroll",
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPage;
