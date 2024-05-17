import Temp from "@/public/temp.jpg";
import fileexplorer from "@/public/fileExplorer.png";
import pagination from "@/public/pagination.png";
import passwordGenerator from "@/public/passwordGenerator.png";
import progressBar from "@/public/progressBar.png";
import otp from "@/public/otp.png";
import multiSelect from "@/public/multiSelect.png";
import components from "@/app/components/page";

const componentsData = [
  {
    id: "file-explorer",
    title: "File Explorer",
    description:
      "A user-friendly interface for navigating, managing, and interacting with files and folders.",
    image: fileexplorer,
    component: "FileExplorer",
    meta: "components/ui/FileExplorer.tsx",
    code: `import FileExplorer from "@/components/custom/FileExplorer";
import React from "react";

const FileExplorerComponent = () => {
  return (
      <FileExplorer />
  );
};
export default FileExplorerComponent;
`,
    sourceCode: `"use client";

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
    <div className="p-1 md:p-5">
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
`,
    language: "javascript",
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "Seemless navigation throug Pagination",
    component: "Pagination",
    image: pagination,
    meta: "components/ui/Pagination.tsx",
    code: `import FileExplorer from "@/components/custom/FileExplorer";
import React from "react";

const PaginationComponent = () => {
  return (
      <Pagination />
  );
};
export default PaginationComponent;
`,
    sourceCode: `
import Pagination from "@/components/ui/Pagination"; // Import the Pagination component
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { pages } from "next/dist/build/templates/app-page";

interface PaginationItem {
  title: string;
  description?: string;
  thumbnail?: string;
}

const demoData = [
  { title: "A", description: "A" },
  { title: "B", description: "B" },
  { title: "C", description: "C" },
  { title: "D", description: "D" },
  { title: "E", description: "E" },
  { title: "F", description: "F" },
  { title: "G", description: "G" },
];

const Page = ({
  paginationData,
}: {
  paginationData: PaginationItem[] | null;
}) => {
  const [data, setData] = useState<PaginationItem[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 3;  

  useEffect(() => {
    if (paginationData && paginationData.length !== 0) {
      setData(paginationData);
      setTotalPage(Math.ceil(paginationData.length / limit)); // Calculate total pages based on paginationData length
    } else {
      setData(demoData);
      setTotalPage(Math.ceil(demoData.length / limit));
    }
  }, [paginationData]);

  return (
    <div>
      {data && (
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-10 p-5 items-center justify-center"}>
          {data.slice((page - 1) * limit, page * limit).map((d: PaginationItem, ind: number) => {
            return (
              <div key={ind} className="flex-row gap-2 items-center justify-center text-center cursor-pointer border-solid border-2 h-[5rem]">
                {d.thumbnail && (
                  <Image src={d.thumbnail} height={500} width={500} className="flex h-[12rem] w-full object-cover" alt={d.title} />
                )}
                <div className="text-2xl mt-1">{d.title}</div>
              </div>
            );
          })}
        </div>
      )}
      {data && data.length > 0 && (
        <div className="flex justify-center items-center gap-3 cursor-pointer h-[5rem] w-full">
          <span className={"hover:text-green-500 p-2 " + (page === 1 ? " hidden " : "")} onClick={() => setPage(page - 1)}>◀ Previous</span>
          {[...Array(totalPage)].map((_, ind) => {
            return (
              <span
                key={ind}
                className={"hover:text-green-500 hover:border-solid hover:border-2 p-2 " + (page === ind + 1 ? "text-green-500 border-solid border-2" : "")}
                onClick={() => setPage(ind + 1)}
              >
                {ind + 1}
              </span>
            );
          })}
          <span className={"hover:text-green-500 p-2 " + (page === totalPage ? " hidden " : "")} onClick={() => setPage(page + 1)}>Next ▶</span>
        </div>
      )}
    </div>
  );
};

export default Page;
`,
    language: "javascript",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Crete string and dynamic paswwords of varying strengths",
    image: passwordGenerator,
    component: "PasswordGererator",
    meta: "components/ui/PasswordGererator.tsx",
    code: `import PasswordGererator from "@/components/custom/PasswordGererator";
import React from "react";

const PasswordGereratorComponent = () => {
  return (
      <PasswordGererator />
  );
};
export default PasswordGereratorComponent;
`,
    sourceCode: `"use client";
import React, { useState } from "react";

interface CheckBoxData {
  title: string;
  state: boolean;
  fields: string;
}

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePassword = (checkBoxData: CheckBoxData[], len: number) => {
    let charSet = "",
      generatedPassword = "";

    const selectedOptions = checkBoxData.filter(
      (checkbox) => checkbox.state === true
    );

    if (selectedOptions.length === 0) {
      setError("Select atleast one option");
      setPassword("");
      return;
    }
    selectedOptions.forEach((opttion) => {
      charSet += opttion.fields;
    });

    for (let i = 0; i < len; i++) {
      const randomInd = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomInd];
    }

    setPassword(generatedPassword);
    setError("");
  };

  return { password, error, generatePassword };
};

const PasswordGererator = () => {
  const { password, error, generatePassword } = usePasswordGenerator();
  const [len, setLen] = useState<number>(8);
  const [copied, setCopied] = useState<boolean>(false);
  const [checkBoxData, setCheckBoxData] = useState([
    {
      title: "Uppercase Characters",
      state: false,
      fields: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    {
      title: "Lowercase Characters",
      state: false,
      fields: "abcdefghijklmnopqrstuvwxyz",
    },
    {
      title: "Numeric Characters",
      state: false,
      fields: "0123456789",
    },
    {
      title: "Special Characters",
      state: false,
      fields: \`!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~\`,
    },
  ]);

  const handleCheckBoxStateChange = (ind: number) => {
    setCheckBoxData((prevState) =>
      prevState.map((item, index) =>
        index === ind ? { ...item, state: !item.state } : item
      )
    );
  };

  const handleClick = () => {
    generatePassword(checkBoxData, len);
  };

  return (
    <div className="p-5 border-2">
      {password && (
        <div className="flex justify-between items-center mb-2">
          <div className="text-2xl">{password}</div>
          <button
            className="p-2 border-2 bg-black text-white rounded"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(password);

              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <div className="flex flex-col gap-1 items-center mb-2">
        <div className="flex text-left w-full gap-5">
          <label className="text-2xl ">Character Length : </label>
          <label className="text-2xl font-medium ">{len}</label>
        </div>
        <input
          className="w-full accent-green-500"
          type="range"
          name="charLen"
          id="charLen"
          min={6}
          max={50}
          value={len}
          onChange={(e) => {
            const value = Number(e.target.value);
            setLen(value);
          }}
        />
      </div>
      <div className="grid grid-cols-2 mb-2">
        {checkBoxData.map((item, ind) => {
          return (
            <div key={ind} className="flex gap-4 items-center mb-1">
              <span className="text-2xl">
                <label> {item.title}</label>
              </span>
              <input
                className="h-5 w-5 accent-green-500"
                type="checkbox"
                onChange={() => handleCheckBoxStateChange(ind)}
                checked={item.state}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <button
          className="p-2 border-2 bg-black text-white rounded w-full"
          type="button"
          onClick={handleClick}
        >
          Generate Password
        </button>
        {error && <span className="text-red-500 mt-2">{error}</span>}
      </div>
    </div>
  );
};

export default PasswordGererator;
`,
    language: "javascript",
  },
  {
    id: "progress-bar",
    title: "Progress Bar",
    description: "Track your progress, like never before",
    image: progressBar,
    component: "Progress",
    language: "javascript",
    meta: "components/ui/Progress.tsx",
    code: `import Progess from "@/components/custom/Progess";
import React from "react";

const ProgessBar = () => {
  const [value, setValue] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setInterval(() => {
      setValue((value) => value + 1);
    }, 100);
  }, []);

  return (
    <>
      <Progress
        value={value}
        onComplete={() => {
          setValue(0);
        }}
      />
    </>
  );
};
export default ProgessBar;
`,
    sourceCode: `
    "use client";
  import React, { useEffect, useState } from "react";

  const Progress = ({
    value = 0,
    onComplete,
  }: {
    value: number;
    onComplete: () => void;
  }) => {
    const [percent, setPercent] = useState<number>(value);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
      setPercent(Math.min(100, Math.max(0, value)));

      if (value >= 100) {
        setSuccess(true);
      }
    }, [value]);

    useEffect(() => {
      const interval = setInterval(() => {
        setPercent(prevPercent => {
          const newValue = prevPercent + 1;
          return Math.min(100, newValue);
        });
      }, 100);

      return () => clearInterval(interval);
    }, []);

    return (
      <>
        <div className="p-5 flex justify-center items-center overflow-hidden">
          <span className="h-[2rem] w-[80%] relative bg-gray-100 flex justify-center items-center rounded-full dark:text-black overflow-hidden">
            <span
              className={\`absolute z-50 \${parseFloat(percent.toFixed()) <= 49 ? "text-black" : "text-white"}\`}
            >
              {percent.toFixed()}%
            </span>

            <div
              className="h-[2rem] left-0 absolute bg-green-500 w-auto"
              style={{ width: \`\${percent.toFixed()}%\` }}
            ></div>
          </span>
        </div>
        {success && (
          <div
            className="flex justify-center items-center"
            onClick={() => {
              onComplete();
              setSuccess(false);
            }}
          >
            <span className="p-2 scale-150 cursor-pointer">↻</span>
          </div>
        )}
      </>
    );
  };

  export default Progress;
`,
  },
  {
    id: "otp",
    title: "OTP",
    description: "OTP input field",
    image: otp,
    component: "OTP",
    language: "javascript",

    meta: "components/ui/OTP.tsx",
    code: `import OTP from "@/components/custom/OTP";
import React from "react";

const OTPComponent = () => {
  return <OTP />;
};

export default OTPComponent;
`,
    sourceCode: `"use client";

import React, {
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const length = 4;

const onSubmitFunction = (otp: string) => {
  console.log("Success", otp);
  return "Success";
};

const OTP = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [succeess, setSucceess] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, ind: number) => {
    const val: string = e.target.value;

    if (isNaN(parseInt(val))) {
      return;
    }

    const newOtp = [...otp];
    newOtp[ind] = val.charAt(val.length - 1);
    setOtp(newOtp);

    const comBinedOtp = newOtp.join("");

    if (comBinedOtp.length === length) {
      onSubmitFunction(comBinedOtp);
      setSucceess(true);
      setTimeout(() => {
        setSucceess(false);
        setOtp(new Array(4).fill(""));
      }, 2000);
    }

    if (val && ind < length - 1 && inputRefs.current[ind + 1]) {
      inputRefs.current[ind + 1].focus();
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, ind: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[ind] = "";
      setOtp(newOtp);
      if (ind > 0 && otp[ind - 1] && inputRefs.current[ind - 1]) {
        inputRefs.current[ind - 1].focus();
      }
    }
  };
  const handleClick = (ind: number) => {
    inputRefs.current[ind].setSelectionRange(1, 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 flex flex-col justify-center items-center gap-8 "
    >
      <div className="flex gap-4 ">
        {otp.map((_, ind) => {
          return (
            <input
              type="text"
              key={ind}
              ref={(input) => {
                if (input) {
                  inputRefs.current[ind] = input;
                }
              }}
              value={otp[ind]}
              onChange={(e) => handleChange(e, ind)}
              onClick={() => handleClick(ind)}
              onKeyDown={(e) => handleKeyDown(e, ind)}
              className="border-2 w-[4rem] h-[4rem] focus:text-green-500 flex justify-center items-center text-center"
            />
          );
        })}
      </div>
      <button type="submit" className="w-[12rem] h-[2rem] bg-black text-white">
        {succeess ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default OTP;
`,
  },
  {
    id: "multi-select",
    title: "Multi Select Search",
    description:
      "Dynamically add and remove search results to your search field itself",
    image: multiSelect,
    component: "MultiSelect",
    language: "javascript",

    meta: "components/ui/MultiSelect.tsx",
    code: `import MultiSelect from "@/components/custom/MultiSelect";
import React from "react";

const MultiSelectComponent = () => {
  return <MultiSelect />;
};

export default MultiSelectComponent;
`,
    sourceCode: `"use client";
import React, { useEffect, useState } from "react";

const dummyData = [
  { id: 1, name: "Walter White" },
  { id: 2, name: "Jesse Pinkman" },
  { id: 3, name: "Saul Goodman" },
  { id: 4, name: "Skyler White" },
  { id: 5, name: "Hank Schrader" },
  { id: 6, name: "Mike Ehrmantraut" },
  { id: 7, name: "Gus Fring" },
  { id: 8, name: "Tuco Salamanca" },
  { id: 9, name: "Jane Margolis" },
  { id: 10, name: "Gale Boetticher" },
];

interface Search {
  id: number;
  name: string;
}
interface ChipProps {
  user: Search;
  onClickFunction: () => void;
}

const Chip: React.FC<ChipProps> = ({ user, onClickFunction }) => {
  return (
    <div
      className="flex justify-center items-center cursor-pointer p-2 border-solid border-2 rounded-full bg-black text-white dark:bg-white dark:text-black "
      onClick={onClickFunction}
    >
      {user.name} &times;
    </div>
  );
};

const MultiSelect = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Array<Search>>([]);
  const [selectedUser, setSelectedUser] = useState<Array<Search>>([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  useEffect(() => {
    const fetchData = () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      } else {
        const filterBySearch = dummyData.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSuggestions(filterBySearch);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleSelectedUser = (user: Search) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUser, user.id]));
    setSearchTerm("");

    setSuggestions([]);
  };

  return (
    <div className="p-5 flex flex-col justify-center items-center relative gap-2  ">
      <div className="p-2 w-[50%] flex flex-wrap border-solid border-2 outline-none gap-5">
        {selectedUser.length !== 0 ? (
          <div className="flex flex-wrap gap-5">
            {selectedUser.map((user) => (
              <Chip
                key={user.id}
                user={user}
                onClickFunction={() => {
                  const updatedUser = selectedUser.filter(
                    (u) => u.id !== user.id
                  );
                  const updatedUserIdSet = new Set(selectedUserSet);
                  updatedUserIdSet.delete(user.id);
                  setSelectedUserSet(updatedUserIdSet);

                  setSelectedUser(updatedUser);
                }}
              />
            ))}
          </div>
        ) : null}

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="flex justify-center items-center outline-none w-full"
        />
      </div>
      <ul className="flex flex-col w-[50%] max-h-[10rem] overflow-y-scroll ml-1 gap-2 text-left">
        {suggestions?.map((user) => {
          return selectedUserSet.has(user.id) ? (
            <></>
          ) : (
            <li
              key={user.id}
              onClick={() => handleSelectedUser(user)}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100 hover:dark:text-black"
            >
              {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultiSelect;
`,
  },
];

export default componentsData;
