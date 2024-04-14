import React from "react";
import List from "../(components)/components/List";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ComponentPage = ({ params }: { params: { componentId?: string } }) => {
  return (
    <div className="p-5">
      <div className="flex flex-row">
        <div className="hidden md:block md:w-1/5 lg:block lg:w-1/5">
          <List />
        </div>
        <div className="w-full md:w-4/5  ">
          <div className="text-left justify-left items-center">
            <div className="text-2xl font-bold"> Heading</div>
            <div className="text-1xl"> Description</div>
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
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      Current password
                      <input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      New password
                      <input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>Save password</CardFooter>
                </Card>
              </TabsContent>
              <TabsContent
                value="code"
                className="w-[92vw] md:w-[70vw] lg:w-[75vw]"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      Current password
                      <input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      New password
                      <input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>Save password</CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPage;
