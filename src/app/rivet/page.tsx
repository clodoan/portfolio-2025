import Documents from "./components/document-list";

const Page = () => {
  return (
    <div className="flex flex-col items-center p-16 bg-stone-100 text-body-1 min-h-screen w-screen overflow-hidden">
      <Documents />
    </div>
  );
};

export default Page;
