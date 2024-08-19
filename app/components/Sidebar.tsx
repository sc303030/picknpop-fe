const Sidebar: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col">
        <div className="mb-3.5 leading-4 flex justify-between items-center">
            <div className="text-sm font-medium">🔥 실시간 인기글</div>
        </div>
        <div className="flex flex-col overflow-hidden p-1 rounded-2xl h-auto bg-white">
            <a className="rounded-xl bg-transparent py-1.5 px-2 items-center justify-between cursor-pointer transition-all duration-100 ease-out hover:bg-gray-50">
                <div className="w-full flex flex-row items-center">
                    <div className="mr-2">1</div>
                    <div className="text-sm">인기글 1위</div>
                </div>
            </a>
            <a className="rounded-xl bg-transparent py-1.5 px-2 items-center justify-between cursor-pointer transition-all duration-100 ease-out hover:bg-gray-50">
                <div className="w-full flex flex-row items-center">
                    <div className="mr-2">2</div>
                    <div className="text-sm">인기글 2위</div>
                </div>
            </a>
        </div>
    </div>
  );
};

export default Sidebar;
