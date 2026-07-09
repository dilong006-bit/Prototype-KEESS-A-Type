import Section from "@/components/common/Section";
import SectionHeader from "@/components/common/SectionHeader";
import { COURSES_INTRO, COURSES } from "@/data/axai";

/** #courses — 6과정 라인업. 홈 카드 언어(썸네일 밴드 + 티어 배지). */
export default function CourseLineup() {
  return (
    <Section id="courses" surface pillar>
      <div style={{ textAlign: "center" }}>
        <SectionHeader
          reveal
          eyebrow={COURSES_INTRO.eyebrow}
          title={COURSES_INTRO.title}
        />
      </div>
      <div className="ax-course-grid stagger">
        {COURSES.map((c) => (
          <div className="ax-course" key={c.title}>
            <div className="ax-thumb">
              <span className="badge">{c.tier}</span>
            </div>
            <h4>{c.title}</h4>
          </div>
        ))}
      </div>
    </Section>
  );
}
