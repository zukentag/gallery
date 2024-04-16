export const fileExplorerData = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "Folder 1",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "File 1",
          isFolder: false,
          size: "10 KB",
        },
        {
          id: "4",
          name: "Folder 2",
          isFolder: true,
          items: [
            {
              id: "5",
              name: "File 2",
              isFolder: false,
              size: "20 KB",
            },
            {
              id: "6",
              name: "File 3",
              isFolder: false,
              size: "15 KB",
            },
          ],
        },
      ],
    },
    {
      id: "7",
      name: "File 4",
      isFolder: false,
      size: "5 KB",
    },
  ],
};
