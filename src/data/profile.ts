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
  bio: "신입 코린이",
  image: "/profile.svg",
};

// TODO: 실제 링크 주소로 바꿔서 사용하세요.
// id는 클릭 수 집계 키로 쓰이므로 한 번 정하면 바꾸지 않는 것이 좋습니다.
export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com", emoji: "💻" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com", emoji: "💼" },
  { id: "blog", title: "Blog", url: "https://velog.io", emoji: "✍️" },
];
