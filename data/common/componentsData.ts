import Temp from "@/public/temp.jpg";
import fileexplorer from "@/public/fileExplorer.avif";

const componentsData = [
  {
    id: "file-explorer",
    title: "File Explorer",
    description:
      "It provides a user-friendly interface for navigating, managing, and interacting with files and folders.",
    image: fileexplorer,
    component: "FileExplorer",
    code: `import FileExplorer from "@/components/custom/FileExplorer";
import React from "react";

const FileExplorerComponent = () => {
  return (
      <FileExplorer />
  );
};
export default FileExplorerComponent;
`,
    language: "Typescript",
  },
  {
    id: "2",
    title: "File Explorer",
    description: "Demo Description",
    image: Temp,
  },
  {
    id: "3",
    title: "File Explorer",
    description: "Demo Description",
    image: Temp,
  },
  {
    id: "4",
    title: "File Explorer",
    description: "Demo Description",
    image: Temp,
  },
];

export default componentsData;
