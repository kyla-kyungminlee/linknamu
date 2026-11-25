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
      className="fixed right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
    >
      {/* 아이콘은 CSS로 전환해서 서버/클라이언트 렌더링 결과가 항상 같도록 합니다. */}
      <span className="dark:hidden" aria-hidden>🌙</span>
      <span className="hidden dark:inline" aria-hidden>☀️</span>
    </button>
  );
}
