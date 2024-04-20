"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Explorer {
  itemId: string;
  name: string;
  isFolder: boolean;
  items?: Explorer[];
}

interface InsertProps {
  itemId: string;
  name: string;
  isFolder: boolean;
}

const useTraverseTree = () => {
  const insertNode = ({
    tree,
    itemId,
    name,
    isFolder,
  }: {
    tree: Explorer;
    itemId: string;
    name: string;
    isFolder: boolean;
  }) => {
    // Base case
    if (tree.itemId === itemId && tree.isFolder) {
      tree.items?.unshift({
        itemId: uuidv4(),
        name,
        isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode: Explorer[] = [];
    latestNode =
      tree.items?.map((newTree) => {
        return insertNode({ tree: newTree, itemId, name, isFolder });
      }) || [];

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree: Explorer, itemId: string): Explorer | null => {
    if (tree.itemId === itemId) {
      return null;
    }

    if (tree.items) {
      tree.items = tree.items
        .map((item) => deleteNode(item, itemId))
        .filter((item) => item !== null) as Explorer[];
    }

    return tree;
  };

  const editNode = ({
    tree,
    itemId,
    name,
  }: {
    tree: Explorer;
    itemId: string;
    name: string;
  }): Explorer => {
    // Create a shallow copy of the current tree node
    const updatedTree = { ...tree };

    // If the current node is the one to be edited, update its name
    if (updatedTree.itemId === itemId) {
      updatedTree.name = name;
      return updatedTree;
    }

    // If the current node has child items, recursively edit them
    if (updatedTree.items) {
      updatedTree.items = updatedTree.items.map((item) =>
        editNode({ tree: item, itemId, name })
      );
    }

    return updatedTree;
  };

  return { insertNode, deleteNode, editNode };
};

const Folder: React.FC<{
  explorer: Explorer;
  handleInsertNode: (props: InsertProps) => void;
  handleDeleteNode: ({ itemId }: { itemId: string }) => void;
  handleEditNode: (itemId: string, name: string) => void;
}> = ({ explorer, handleInsertNode, handleDeleteNode, handleEditNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
    itemId: "",
  });

  const handleAddNewFolder = (
    e: React.MouseEvent<HTMLSpanElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation();

    setShowInput({
      ...showInput,
      visible: true,
      isFolder: isFolder,
    });
    setExpand(true);
  };

  const handleDeleteFolder = (e: React.MouseEvent<HTMLSpanElement>) => {
    handleDeleteNode({ itemId: explorer.itemId });
  };

  const handleEditFolder = (
    e: React.MouseEvent<HTMLSpanElement>,
    isFolder: boolean
  ) => {
    // e.stopPropagation();
    setShowInput({
      ...showInput,
      visible: true,
      isFolder: isFolder,
      itemId: explorer.itemId,
    });
  };

  const onAddNewFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      handleInsertNode({
        itemId: explorer.itemId,
        name: e.currentTarget.value,
        isFolder: showInput.isFolder,
      });
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onEditFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      handleEditNode(explorer.itemId, e.currentTarget.value);
      setShowInput({ ...showInput, visible: false, itemId: "" });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="cursor-pointer">
        <div
          onClick={() => {
            setExpand(!expand);
          }}
          className="flex justify-between w-[70%] md:w-[30%] hover:bg-zinc-400  mb-1 p-2"
        >
          {showInput.visible && explorer.itemId === showInput.itemId ? (
            <>
              <span>{showInput.isFolder === true ? "📁 " : "📄"}</span>
              <input
                type="text"
                autoFocus
                onKeyDown={(e) => onEditFolder(e)}
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false, itemId: "" });
                }}
                className="w-full"
              />
            </>
          ) : (
            <>
              <span>📁 {explorer.name}</span>
              <div>
                <span
                  onClick={(e) => {
                    handleEditFolder(e, explorer.isFolder);
                  }}
                >
                  ✏️
                </span>
                <span
                  onClick={(e) => {
                    handleDeleteFolder(e);
                  }}
                  className="ml-4"
                >
                  🚫
                </span>
                <span
                  className="ml-4"
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
            </>
          )}
        </div>

        {expand && (
          <div className=" pl-5">
            {showInput.visible && (
              <div className="flex justify-between w-[70%] md:w-[30%]  mb-1 p-2">
                <span>{showInput.isFolder === true ? "📁 " : "📄"}</span>
                <input
                  type="text"
                  autoFocus
                  onKeyDown={(e) => onAddNewFolder(e)}
                  onBlur={() => {
                    setShowInput({ ...showInput, visible: false });
                  }}
                  className="w-full"
                />
              </div>
            )}
            {explorer.items?.map((item) => (
              <Folder
                key={item.itemId}
                explorer={item}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleEditNode={handleEditNode}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else if (explorer.name) {
    return (
      <div className="flex justify-between w-[70%] md:w-[30%] hover:bg-zinc-400 mb-1 p-2">
        {showInput.visible && explorer.itemId === showInput.itemId ? (
          <>
            <span>{showInput.isFolder === true ? "📁 " : "📄"}</span>
            <input
              type="text"
              autoFocus
              onKeyDown={(e) => onEditFolder(e)}
              onBlur={() => {
                setShowInput({ ...showInput, visible: false, itemId: "" });
              }}
              className="w-full"
            />
          </>
        ) : (
          <>
            <div>
              <span>📄 {explorer.name}</span>
            </div>
            <div>
              <span
                onClick={(e) => {
                  handleEditFolder(e, explorer.isFolder);
                }}
              >
                ✏️
              </span>
              <span
                onClick={(e) => {
                  handleDeleteFolder(e);
                }}
                className="ml-4"
              >
                🚫
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
};

const FileExplorer: React.FC = () => {
  const [explorerData, setExplorerData] = useState<Explorer>({
    itemId: uuidv4(),
    name: "Root",
    isFolder: true,
    items: [],
  });
  const { insertNode, deleteNode, editNode } = useTraverseTree();

  const handleInsertNode = ({ itemId, name, isFolder }: InsertProps) => {
    const finalTree = insertNode({
      tree: explorerData,
      itemId,
      name,
      isFolder,
    });
    setExplorerData(finalTree);
  };

  const handleDeleteNode = ({ itemId }: { itemId: string }) => {
    if (itemId === explorerData.itemId) {
      setExplorerData((prevExplorerData) => ({
        ...prevExplorerData,
        items: [],
      }));
    } else {
      const finalTree = deleteNode({ ...explorerData }, itemId);
      if (finalTree) {
        setExplorerData(finalTree);
      }
    }
  };

  const handleEditNode = (itemId: string, name: string) => {
    const updatedExplorerData = editNode({
      tree: explorerData,
      itemId,
      name,
    });

    setExplorerData(updatedExplorerData);
  };

  return (
    <div className="p-1 md:p-5 w-full">
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleEditNode={handleEditNode}
        explorer={explorerData}
      />
    </div>
  );
};

export default FileExplorer;
