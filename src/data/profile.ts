export type LinkItem = {
  id: string;
  title: string;
  url: string;
  emoji?: string;
};

// TODO: 보여 주기용 더미 값입니다. 실제 정보로 바꿔서 사용하세요.
// 사진은 public/ 폴더에 넣고 "/파일이름.jpg" 형식으로 지정하면 됩니다.
export const profile = {
  name: "Kyla",
  bio: "마케터 | 데이터에 관심이 많아요",
  image: "/profile.svg",
};

// TODO: 실제 링크 주소로 바꿔서 사용하세요.
// id는 클릭 수 집계 키로 쓰이므로 한 번 정하면 바꾸지 않는 것이 좋습니다.
export const links: LinkItem[] = [
  { id: "github", title: "깃허브", url: "https://github.com/kyla-kyungminlee", emoji: "💻" },
  { id: "linkedin", title: "링크드인", url: "https://www.linkedin.com/in/kyungmin-kyla-lee", emoji: "💼" },
  { id: "email", title: "이메일", url: "mailto:kyla.kyungminlee@gmail.com", emoji: "✉️" },
];
