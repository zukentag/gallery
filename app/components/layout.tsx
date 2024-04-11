export default function ComponentsLayout({
  children,
  container,
  list,
}: {
  children: React.ReactNode;
  container: React.ReactNode;
  list: React.ReactNode;
}) {
  return (
    <div className="p-5">
      <div className="flex flex-row">
        <div className="hidden md:block lg:block w-1/5">{list}</div>
        <div className="w-full sm:w-auto md:w-4/5 lg:w-4/5">{container}</div>
      </div>
    </div>
  );
}
