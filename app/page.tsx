import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import TeamSidebar from './components/TeamSidebar';

export default function Home() {
  return (
    <div className="flex w-full">
      <div className="w-1/5">
        <TeamSidebar />
      </div>
      <div className="w-3/5 px-4">
        <PostCard
          team="KCC"
          date="June 14, 2024"
          user="바람타고날아"
          content="KCC 다음시즌 외국인선수 누가 올까요"
          likes="0"
        />
        <PostCard
          team="리카르도 건틀립"
          date="April 17, 2024"
          user="여자떼려박는스타일"
          content="오늘은 리카르도 건틀립 리프입니다... 안양에서 활약해주세요"
          likes="0"
        />
        <PostCard
          team="안양"
          date="April 17, 2024"
          user="김택용"
          content="안양 박지훈 재계약 !!"
          likes="2"
        />
        <PostCard
          team="원더스"
          date="April 17, 2024"
          user="김택용"
          content="원더들이 응원하러 갑니다"
          likes="0"
        />
        <PostCard
          team="전창진"
          date="April 17, 2024"
          user="직관비"
          content="리온 아주 좋은 포인트..."
          likes="0"
        />
        <PostCard
          team="디비"
          date="April 17, 2024"
          user="김택용"
          content="디비 좋다"
          likes="0"
        />
      </div>
      <div className="w-1/5">
        <Sidebar />
      </div>
    </div>
  );
}
