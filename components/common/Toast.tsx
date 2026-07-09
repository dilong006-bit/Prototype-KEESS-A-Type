"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeToast, type ToastType } from "@/lib/toast";

/**
 * Toast — v26 #toast 1:1. layout에 1개만 마운트. 3.8초 노출.
 * success(체크·기본) / error(경고·.err). 클래스명 v26과 동일(toast/tico/err).
 */
export default function Toast() {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState<ToastType>("success");
  const [show, setShow] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(
    () =>
      subscribeToast((m, t) => {
        setMsg(m);
        setType(t);
        setShow(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setShow(false), 3800);
      }),
    [],
  );
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const ok = type !== "error";
  return (
    <div
      id="toast"
      className={`toast${show ? " show" : ""}${ok ? "" : " err"}`}
      role="status"
      aria-live="polite"
    >
      <svg
        className="tico"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ok ? (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 12.5l2.5 2.5 4.5-5" />
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </>
        )}
      </svg>
      <span>{msg}</span>
    </div>
  );
}
