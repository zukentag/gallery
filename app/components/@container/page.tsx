import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThreeDCardDemo } from "@/components/ui/3d-card_rotate";

export default function Container() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">Cont</div>
      <div className="grid grid-cols-2">
        <div>
          <ThreeDCardDemo />
        </div>
        <ThreeDCardDemo />
        <ThreeDCardDemo />
        <ThreeDCardDemo />
        {/* <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
}
