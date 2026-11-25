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

export default function LinkCard({ id, title, url, emoji }: LinkItem) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(id)}
      className="flex w-full items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-zinc-700 dark:bg-zinc-900"
    >
      {emoji && <span className="text-xl" aria-hidden>{emoji}</span>}
      <span className="flex-1 text-center">{title}</span>
      {/* 이모지 쪽과 균형을 맞추기 위한 빈 공간 */}
      {emoji && <span className="w-5" aria-hidden />}
    </a>
  );
}
