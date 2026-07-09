"use client";

import Section from "@/components/common/Section";
import { useCountUp } from "@/lib/useCountUp";
import { OFFER, type OfferIcon } from "@/data/axai";

/** 전환 설계 — bento를 홈 카드 언어로 재구성(리드 카드 + 4 카드 + 스탯 3). */
function OfferSvg({ icon }: { icon: OfferIcon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
  } as const;
  if (icon === "diagnose")
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    );
  if (icon === "design")
    return (
      <svg {...common}>
        <path d="M3 3v18h18" />
        <rect x="7" y="10" width="3" height="7" />
        <rect x="13" y="6" width="3" height="11" />
      </svg>
    );
  if (icon === "run")
    return (
      <svg {...common}>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
  );
}

function OfferStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const [ref, n] = useCountUp(value);
  return (
    <div className="st">
      <div className="v">
        <span ref={ref}>{n}</span>
        {suffix}
      </div>
      <div className="l">{label}</div>
    </div>
  );
}

export default function AxOffer() {
  return (
    <Section pillar>
      <p className="eyebrow r">{OFFER.eyebrow}</p>
      <div className="ax-offer" style={{ marginTop: 26 }}>
        <article className="lead r">
          <div className="bk">{OFFER.lead.kicker}</div>
          <div>
            <h3>{OFFER.lead.title}</h3>
            <p>{OFFER.lead.desc}</p>
            <div className="bmini">
              {OFFER.lead.mini.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </article>
        {OFFER.cards.map((c) => (
          <article className="ax-ocard r" key={c.kicker}>
            <div className="oi">
              <OfferSvg icon={c.icon} />
            </div>
            <div className="ok">{c.kicker}</div>
            <h4>{c.title}</h4>
            <p>{c.desc}</p>
          </article>
        ))}
      </div>
      <div className="ax-offer-stats r">
        {OFFER.stats.map((s) => (
          <OfferStat
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
          />
        ))}
      </div>
    </Section>
  );
}
