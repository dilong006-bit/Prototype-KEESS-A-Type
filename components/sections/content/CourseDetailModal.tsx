"use client";

import Modal from "@/components/common/Modal";
import type { Course } from "@/data/courses";
import { CAT_GRAD, DETAIL_LABELS } from "@/data/content";

/** 과정 상세 모달 — 공통 Modal 셸 재사용(포커스 트랩·ESC·body lock·복원). */
export default function CourseDetailModal({
  course,
  onClose,
}: {
  course: Course | null;
  onClose: () => void;
}) {
  const grad = course ? CAT_GRAD[course.category_key] ?? CAT_GRAD.lit : "";
  return (
    <Modal open={course != null} onClose={onClose} title={undefined} maxWidth={640}>
      {course && (
        <div className="cd">
          <div className="cd-thumb" style={{ background: grad }}>
            <span className="cat">{course.category}</span>
          </div>
          <h3 className="cd-title" id="d-title">
            {course.title}
          </h3>
          <div className="cd-badges">
            <span className="bdg">{course.target}</span>
            <span className="bdg">{course.level}</span>
            <span className="bdg">{course.duration}</span>
            {course.instructor && (
              <span className="bdg">
                {DETAIL_LABELS.instructor} {course.instructor}
              </span>
            )}
            {course.book_provided && (
              <span className="bdg bk">{DETAIL_LABELS.book}</span>
            )}
          </div>

          <div className="cd-block">
            <b>{DETAIL_LABELS.overview}</b>
            <p>{course.overview}</p>
          </div>

          {course.objectives.length > 0 && (
            <div className="cd-block">
              <b>{DETAIL_LABELS.objectives}</b>
              <ul className="cd-list">
                {course.objectives.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          )}

          {course.curriculum.length > 0 && (
            <div className="cd-block">
              <b>
                {DETAIL_LABELS.curriculum} · {course.curriculum_count}차시
              </b>
              <ol className="cd-list num">
                {course.curriculum.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ol>
            </div>
          )}

          {course.tools.length > 0 && (
            <div className="cd-block">
              <b>{DETAIL_LABELS.tools}</b>
              <div className="cd-tools">
                {course.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
