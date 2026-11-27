"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

// 링크 카드 목록 + 클릭 수 표시.
// 처음에는 모두 0회로 보여 주고, 페이지가 열리면 GET /api/clicks로
// 전체 클릭 수를 한 번에 받아와 실제 값으로 갱신합니다.
export default function LinkList({ links }: { links: LinkItem[] }) {
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Counts | null) => {
        if (!cancelled && data) {
          // 받아오는 사이에 누른 클릭(+1)이 사라지지 않도록 큰 값을 유지합니다.
          setCounts((prev) => {
            const next = { ...data };
            for (const [id, n] of Object.entries(prev)) next[id] = Math.max(n, next[id] ?? 0);
            return next;
          });
        }
      })
      .catch(() => {}); // 실패하면 0회 표시를 그대로 둡니다.
    return () => {
      cancelled = true;
    };
  }, []);

  // 카드를 누르면 서버 기록과 별개로 화면의 숫자도 바로 1 올립니다.
  const handleClick = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard {...link} count={counts[link.id] ?? 0} onClicked={handleClick} />
        </li>
      ))}
    </ul>
  );
}
