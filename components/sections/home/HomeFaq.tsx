"use client";

import { useMemo, useState } from "react";
import Tab from "@/components/common/Tab";
import Accordion, { type AccordionItem } from "@/components/common/Accordion";
import Button from "@/components/common/Button";
import { FAQ_INTRO, FAQ_TABS, FAQ_ITEMS } from "@/data/home";

/**
 * 홈 FAQ 섹션 — 카테고리 탭으로 질문 필터 + 아코디언.
 * 원본 #faq 구조·카피 이식. 답변 하단 acta는 #inq 앵커.
 */
export default function HomeFaq() {
  const [tab, setTab] = useState("1");

  const items: AccordionItem[] = useMemo(
    () =>
      FAQ_ITEMS.filter((f) => f.type === tab).map((f) => ({
        id: f.qn,
        qn: f.qn,
        q: f.q,
        a: (
          <>
            <p>{f.a}</p>
            {f.acta && (
              <a className="acta" href="#inq">
                {f.acta} <span aria-hidden="true">&#8594;</span>
              </a>
            )}
          </>
        ),
      })),
    [tab],
  );

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <p className="eyebrow r">{FAQ_INTRO.eyebrow}</p>
        <h2 className="sec-title r" style={{ marginTop: 12 }}>
          {FAQ_INTRO.title}
        </h2>
        <p
          className="leadsub r"
          style={{
            marginTop: 18,
            color: "var(--muted)",
            fontSize: "16.5px",
            maxWidth: "56ch",
            lineHeight: 1.7,
          }}
        >
          {FAQ_INTRO.sub}
        </p>

        <div className="r">
          <Tab
            items={FAQ_TABS}
            value={tab}
            onChange={setTab}
            ariaLabel="FAQ 카테고리"
          />
        </div>

        <div className="r">
          <Accordion items={items} />
        </div>

        <div className="faq-foot r">
          <span className="faq-foot-t">{FAQ_INTRO.footText}</span>
          <Button href="#inq" variant="ink" className="faq-cta">
            {FAQ_INTRO.footCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
