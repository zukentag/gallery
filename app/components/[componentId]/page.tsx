import React from "react";
import List from "../(components)/components/List";

const ComponentPage = ({ params }: { params: { componentId?: string } }) => {
  return (
    <div className="p-5">
      <div className="flex flex-row">
        <div className="hidden md:block md:w-2/5 lg:block lg:w-1/5">
          <List />
        </div>
        <div className="w-full   md:w-4/5  ">
          <div>id : {params.componentId}</div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPage;
