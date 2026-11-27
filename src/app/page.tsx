import LinkList from "@/components/LinkList";
import Profile from "@/components/Profile";
import { links, profile } from "@/data/profile";

// 와이어프레임 구성: 위쪽에 원형 프로필 사진 · 이름 · 한 줄 소개,
// 아래쪽에 링크 카드를 세로로 나열합니다.
// 표시되는 내용은 src/data/profile.ts에서 바꿀 수 있습니다.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[26rem] flex-1 flex-col items-center px-6 pb-20 pt-24 sm:pt-28">
      <Profile {...profile} />

      <nav aria-label="링크 목록" className="mt-12 w-full">
        <LinkList links={links} />
      </nav>
    </main>
  );
}
