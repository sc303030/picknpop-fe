const TeamSidebar: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">팀</h2>
      <ul className="space-y-2">
        <li><a href="#" className="text-gray-600 hover:text-gray-800">1. 원주 DB</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">2. 서울 삼성</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">3. 창원 LG</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">4. 수원 KT</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">5. 고양 캐롯</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">6. 서울 SK</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">7. 전주 KCC</a></li>
        <li><a href="#" className="text-gray-600 hover:text-gray-800">8. 울산 모비스</a></li>
      </ul>
    </div>
  );
};

export default TeamSidebar;
