"use client";
import React, { useCallback, useState } from "react";

const SelectableGrid = ({ rows, cols }: { rows: number; cols: number }) => {
  const [selectedGrid, setSelectedGrid] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = (boxNum: number) => {
    setIsMouseDown(true);
    setSelectedGrid([boxNum]);
  };
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  const handleMouseEnter = useCallback(
    (boxNum: number) => {
      if (isMouseDown) {
        const startBox = selectedGrid[0];
        const endBox = boxNum;

        const minRow = Math.min(
          Math.floor((startBox - 1) / cols),
          Math.floor((endBox - 1) / cols)
        );
        const maxRow = Math.max(
          Math.floor((startBox - 1) / cols),
          Math.floor((endBox - 1) / cols)
        );
        const minCol = Math.min(
          Math.floor((startBox - 1) % cols),
          Math.floor((endBox - 1) % cols)
        );
        const maxCol = Math.max(
          Math.floor((startBox - 1) % cols),
          Math.floor((endBox - 1) % cols)
        );

        const selected = [];
        for (let i = minRow; i <= maxRow; i++) {
          for (let j = minCol; j <= maxCol; j++) {
            selected.push(i * cols + j + 1);
          }
        }
        setSelectedGrid(selected);
      }
    },
    [isMouseDown]
  );

  return (
    <div
      className="grid gap-2 select-none"
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      onMouseUp={handleMouseUp}
    >
      {Array.from(Array(rows * cols).keys()).map((_, index) => (
        <div
          key={index}
          className={`flex w-8 h-8 border-2 p-5 border-black dark:border-white justify-center items-center ${
            selectedGrid.includes(index + 1)
              ? "bg-green-500 text-white dark:text-black"
              : "flex"
          }`}
          onMouseDown={() => handleMouseDown(index + 1)}
          onMouseEnter={() => handleMouseEnter(index + 1)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

const SelectableGridComponent = () => {
  return (
    <div className="p-5 flex justify-center items-center">
      <SelectableGrid rows={5} cols={5} />
    </div>
  );
};

export default SelectableGridComponent;
