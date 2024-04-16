"use client";

import React, { useState } from "react";
import { fileExplorerData } from "@/data/fileExplorerData";
import { v4 as uuidv4 } from "uuid";

interface Explorer {
  id: string;
  name: string;
  isFolder: boolean;
  items?: Explorer[];
}

interface InsertProps {
  folderId: string;
  name: string;
  isFolder: boolean;
}

const useTraverseTree = () => {
  const insertNode = ({
    tree,
    folderId,
    name,
    isFolder,
  }: {
    tree: Explorer;
    folderId: string;
    name: string;
    isFolder: boolean;
  }) => {
    // Base case
    if (tree.id === folderId && tree.isFolder) {
      tree.items?.unshift({
        id: uuidv4(),
        name,
        isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode: Explorer[] = [];
    latestNode =
      tree.items?.map((newTree) => {
        return insertNode({ tree: newTree, folderId, name, isFolder });
      }) || [];

    return { ...tree, items: latestNode };
  };

  return { insertNode };
};

const Folder: React.FC<{
  explorer: Explorer;
  handleInsertNode: (props: InsertProps) => void;
}> = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleAddNewFolder = (
    e: React.MouseEvent<HTMLSpanElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder,
    });
    setExpand(true);
  };

  const onAddNewFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      // Add logic
      handleInsertNode({
        folderId: explorer.id,
        name: e.currentTarget.value,
        isFolder: showInput.isFolder,
      });
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="cursor-pointer">
        <div
          onClick={() => {
            setExpand(!expand);
          }}
          className="flex justify-between w-[20%] hover:bg-zinc-400  mb-1 p-2"
        >
          <span>📁 {explorer.name}</span>
          <div>
            <span
              onClick={(e) => {
                handleAddNewFolder(e, false);
              }}
            >
              🗒
            </span>
            <span
              className="ml-4"
              onClick={(e) => {
                handleAddNewFolder(e, true);
              }}
            >
              🗀
            </span>
          </div>
        </div>
        {expand && (
          <div className="pl-5">
            {showInput.visible && (
              <div className="mb-1 p-2">
                <span>{showInput.isFolder === true ? "📁 " : "📄"}</span>
                <input
                  type="text"
                  autoFocus
                  onKeyDown={(e) => onAddNewFolder(e)}
                  onBlur={() => {
                    setShowInput({ ...showInput, visible: false });
                  }}
                />
              </div>
            )}
            {explorer.items?.map((item) => (
              <Folder
                key={item.id}
                explorer={item}
                handleInsertNode={handleInsertNode}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex-col w-[20%] hover:bg-zinc-400 mb-1 p-2">
        <span>📄 {explorer.name}</span>
      </div>
    );
  }
};

const FileExplorer: React.FC = () => {
  const [explorerData, setExplorerData] = useState<Explorer>(fileExplorerData);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = ({ folderId, name, isFolder }: InsertProps) => {
    const finalTree = insertNode({
      tree: explorerData,
      folderId,
      name,
      isFolder,
    });
    setExplorerData(finalTree);
  };

  return (
    <div className="p-5">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
};

export default FileExplorer;
