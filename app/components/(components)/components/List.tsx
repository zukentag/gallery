import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const listArray = [
  "File Explorer",
  "Drag & Drop",
  "Image Cropper",
  "File Explorer",
  "Drag & Drop",
  "Image Cropper",

  "File Explorer",
  "Drag & Drop",
  "Image Cropper",

  "File Explorer",
  "Drag & Drop",
  "Image Cropper",
  "File Explorer",
  "Drag & Drop",
  "Image Cropper",
  "File Explorer",
  "Drag & Drop",
  "Image Cropper",

  "File Explorer",
  "Drag & Drop",
  "Image Cropper",

  "File Explorer",
  "Drag & Drop",
  "Image Cropper",
  "File Explorer",
  "Drag & Drop",
  "Image Cropper",
  "File Explorer",
  "Drag & Drop",
  "Image Cropper",

  "File Explorer",
  "Drag & Drop",
  "Image Cropper",

  "File Explorer",
  "Drag & Drop",
  "Image Cropper",
  "File Explorer",
  "Drag & Drop",
  "Image Cropper",
  "File Explorer",
  "Drag & Drop",
  "Image Cropper",

  "File Explorer",
  "Drag & Drop",
  "Image Cropper",

  "File Explorer",
  "Drag & Drop",
  "Image Cropper",
];

export default function List() {
  return (
    <div>
      <ScrollArea className="h-[100vh] w-[90%] rounded-md border">
        <div className="p-5">
          {listArray.map((l, ind) => {
            return (
              <>
                <div
                  key={ind}
                  className="text-[1rem] mb-2  text-slate-500 hover:text-green-500"
                >
                  {l}
                </div>
              </>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
