const Sidebar: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">실시간 인기글</h2>
      <ul className="space-y-2">
        <li><a href="#" className="text-gray-600 hover:text-gray-800">1. 안양 박지훈 재계약 !!</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">2. KCC 다음시즌 외국인선수 누가 올까요</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">3. 리카르도 건틀립...</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">4. 전창진</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">5. 디비 좋다</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
