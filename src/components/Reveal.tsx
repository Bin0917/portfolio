"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/** 화면에 들어오면 한 번만 나타난다. 움직임 줄이기 설정은 globals.css에서 처리한다. */
export function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // 비율 기준은 세로로 긴 섹션에서 늦게 걸리므로, 화면 아래 10% 선을 넘으면 보이게 한다
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-visible={visible} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
