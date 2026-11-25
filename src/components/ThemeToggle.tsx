"use client";

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    // 저장소를 쓸 수 없는 환경(시크릿 모드 등)에서는 이번 방문에만 적용됩니다.
  }
}

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="다크모드 전환"
      className="fixed right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-base shadow-[0_6px_18px_-10px_rgba(76,52,110,0.4)] backdrop-blur-xl transition duration-300 hover:bg-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
    >
      {/* 아이콘은 CSS로 전환해서 서버/클라이언트 렌더링 결과가 항상 같도록 합니다. */}
      <span className="dark:hidden" aria-hidden>🌙</span>
      <span className="hidden dark:inline" aria-hidden>☀️</span>
    </button>
  );
}
