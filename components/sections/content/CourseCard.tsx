import type { Course } from "@/data/courses";
import { CAT_GRAD } from "@/data/content";

/** 탐색기 과정 카드 — 클릭/Enter/Space로 상세 모달. */
export default function CourseCard({
  course,
  onOpen,
}: {
  course: Course;
  onOpen: (id: string) => void;
}) {
  const grad = CAT_GRAD[course.category_key] ?? CAT_GRAD.lit;
  return (
    <article
      className="cx-card"
      tabIndex={0}
      role="button"
      aria-label={`${course.title} 상세 보기`}
      onClick={() => onOpen(course.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(course.id);
        }
      }}
    >
      <div className="cx-thumb" style={{ background: grad }}>
        <span className="cat">{course.category}</span>
      </div>
      <div className="cx-body">
        <h4>{course.title}</h4>
        <div className="cx-meta">
          <span className="bdg">{course.target}</span>
          <span className="bdg">{course.level}</span>
          <span className="bdg">{course.duration}</span>
          {course.book_provided && <span className="bdg bk">도서 제공</span>}
        </div>
        <div className="cx-kw">
          {course.keywords.slice(0, 3).map((k) => (
            <span key={k}>{k}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
