import { ScrollArea } from "@/components/ui/scroll-area";
import componentsData from "@/data/common/componentsData";
import Link from "next/link";

// const listArray = [
//   "File Explorer",
//   "Pagination",
//   "Image Cropper",
//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",

//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",

//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",
//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",
//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",

//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",

//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",
//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",
//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",

//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",

//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",
//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",
//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",

//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",

//   "File Explorer",
//   "Drag & Drop",
//   "Image Cropper",
// ];

export default function List() {
  return (
    <div>
      <ScrollArea className="h-[100vh] w-[90%] rounded-md border">
        <div className="p-5">
          {componentsData.map((item, ind) => {
            return (
              <>
                <Link key={ind} href={`/components/${item.id}`}>
                  <div className="text-[1rem] mb-2 text-slate-500 hover:text-green-500 cursor-pointer">
                    {item.title}
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
