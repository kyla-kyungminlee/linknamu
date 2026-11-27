"use client";

import type { LinkItem } from "@/data/profile";

// 새 탭으로 이동하는 동안에도 요청이 끊기지 않도록 sendBeacon을 우선 사용합니다.
function recordClick(id: string) {
  const body = JSON.stringify({ id });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
  }
}

type LinkCardProps = LinkItem & {
  count: number;
  onClicked?: (id: string) => void;
};

export default function LinkCard({ id, title, url, emoji, count, onClicked }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        recordClick(id);
        onClicked?.(id);
      }}
      className="flex w-full items-center gap-3 rounded-[1.375rem] border border-white/70 bg-white/45 px-4 py-3.5 font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_30px_-16px_rgba(76,52,110,0.35)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_34px_-16px_rgba(76,52,110,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_-16px_rgba(0,0,0,0.6)] dark:hover:bg-white/[0.1]"
    >
      {emoji && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-lg dark:bg-white/10" aria-hidden>
          {emoji}
        </span>
      )}
      <span className="flex-1 text-center text-[0.9375rem]">{title}</span>
      {/* 클릭 수 (이모지 쪽과 같은 최소 너비로 제목을 가운데에 유지) */}
      <span className="min-w-9 shrink-0 whitespace-nowrap text-right text-xs font-normal tabular-nums opacity-55">
        <span className="sr-only">클릭 수 </span>
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
