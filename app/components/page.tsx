"use client";
import Container from "./(components)/components/Container";
import List from "./(components)/components/List";

export default function components() {
  return (
    <div className="p-5">
      <div className="flex flex-row">
        <div className="hidden md:block md:w-2/5 lg:block lg:w-1/5">
          <List />
        </div>
        <div className="w-full   md:w-4/5  ">
          <Container />
        </div>
      </div>
    </div>
  );
}
