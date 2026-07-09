"use client";

import { useEffect, useMemo, useState } from "react";
import { COURSES, type Course } from "@/data/courses";
import {
  CATS,
  SORT_OPTIONS,
  BAND_ORDER,
  LEVEL_ORDER,
  AXIS_HAVE,
} from "@/data/content";
import CourseCard from "./CourseCard";
import CourseDetailModal from "./CourseDetailModal";

/**
 * 대표 라인업 탐색기(핵심) — 카테고리 탭·검색(160ms 디바운스)·셀렉트4·정렬 → 그리드.
 * 카드 클릭/Enter/Space → 상세 모달. a11y: role=tablist/tab·aria-selected·셀렉트 aria-label.
 */
const uniq = (fn: (c: Course) => string[] | string): string[] => {
  const s = new Set<string>();
  COURSES.forEach((c) => {
    const v = fn(c);
    if (Array.isArray(v)) v.forEach((x) => s.add(x));
    else if (v) s.add(v);
  });
  return [...s];
};

export default function CourseExplorer() {
  const [cat, setCat] = useState("all");
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [target, setTarget] = useState("");
  const [level, setLevel] = useState("");
  const [band, setBand] = useState("");
  const [tool, setTool] = useState("");
  const [sort, setSort] = useState("default");
  const [detailId, setDetailId] = useState<string | null>(null);

  // 검색 160ms 디바운스
  useEffect(() => {
    const t = window.setTimeout(() => setQ(qInput.trim()), 160);
    return () => window.clearTimeout(t);
  }, [qInput]);

  const targets = useMemo(() => uniq((c) => c.target), []);
  const tools = useMemo(() => uniq((c) => c.tools).sort(), []);
  const catCount = (k: string) =>
    k === "all" ? COURSES.length : COURSES.filter((c) => c.category_key === k).length;

  const list = useMemo(() => {
    const ql = q.toLowerCase();
    const filtered = COURSES.filter((c) => {
      if (cat !== "all" && c.category_key !== cat) return false;
      if (target && c.target !== target) return false;
      if (level && c.level !== level) return false;
      if (band && c.duration_band !== band) return false;
      if (tool && !c.tools.includes(tool)) return false;
      if (ql) {
        const hay = (c.title + " " + c.keywords.join(" ") + " " + c.category).toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });
    const r = [...filtered];
    if (sort === "hours-asc") r.sort((a, b) => a.hours - b.hours);
    else if (sort === "hours-desc") r.sort((a, b) => b.hours - a.hours);
    else if (sort === "level")
      r.sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level));
    return r;
  }, [cat, q, target, level, band, tool, sort]);

  const reset = () => {
    setCat("all");
    setQInput("");
    setQ("");
    setTarget("");
    setLevel("");
    setBand("");
    setTool("");
    setSort("default");
  };

  const detailCourse = detailId
    ? COURSES.find((c) => c.id === detailId) ?? null
    : null;

  return (
    <>
      <div className="cx-tabs" role="tablist" aria-label="카테고리">
        {CATS.map((c) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={cat === c.key}
            className={`cx-tab${cat === c.key ? " on" : ""}`}
            onClick={() => setCat(c.key)}
          >
            {c.label}
            <span className="n">{catCount(c.key)}</span>
          </button>
        ))}
      </div>

      <div className="cx-toolbar">
        <label className="cx-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" />
          </svg>
          <input
            type="search"
            placeholder={AXIS_HAVE.searchPlaceholder}
            aria-label="과정 검색"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
          />
        </label>
        <div className="cx-sels">
          <select aria-label="대상" value={target} onChange={(e) => setTarget(e.target.value)}>
            <option value="">대상 전체</option>
            {targets.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select aria-label="레벨" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">레벨 전체</option>
            {LEVEL_ORDER.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <select aria-label="기간" value={band} onChange={(e) => setBand(e.target.value)}>
            <option value="">기간 전체</option>
            {BAND_ORDER.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <select aria-label="툴" value={tool} onChange={(e) => setTool(e.target.value)}>
            <option value="">툴 전체</option>
            {tools.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select aria-label="정렬" value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <span className="cx-count">
          <b>{list.length}</b> / {COURSES.length}개
        </span>
        <button type="button" className="cx-reset" onClick={reset}>
          {AXIS_HAVE.reset}
        </button>
      </div>

      <div className="cx-grid">
        {list.length ? (
          list.map((c) => (
            <CourseCard key={c.id} course={c} onOpen={setDetailId} />
          ))
        ) : (
          <div className="cx-empty">
            <b>{AXIS_HAVE.empty.title}</b>
            {AXIS_HAVE.empty.desc}
          </div>
        )}
      </div>

      <CourseDetailModal course={detailCourse} onClose={() => setDetailId(null)} />
    </>
  );
}
