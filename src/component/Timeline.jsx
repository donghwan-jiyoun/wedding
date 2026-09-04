
import "./Timeline.scss";
import useScrollReveal from "../hooks/useScrollReveal";

const START_DATE = new Date("2022-01-02T00:00:00");
const MARRIED_DATE = new Date("2025-12-12T00:00:00");

function getToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}


function getDaysTogether() {
  const now = new Date();
  const diffMs = now.getTime() - START_DATE.getTime();

  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function getDaysMarried() {
  const now = new Date();
  const diffMs = now.getTime() - MARRIED_DATE.getTime();

  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

const TIMELINE_ITEMS = [
  {
    date: "2025.12.12",
    title: "혼인신고",
    description: "결혼기념일이 된 12월 12일",
    image: "/timeline1.gif",
  },
  {
    date: "2026.04.06 ~ ",
    title: "신혼여행",
    description: "7박 9일 런던. 우승 시즌 🏆 아스날 경기 관람",
    image: "/timeline2.gif",
  },
  {
    date: "2026.05.22",
    title: "웨딩촬영",
    description: "이것저것 쉽지 않았던..!",
    image: "/timeline3.gif",
  },
  {
    date: `${getToday()}`,
    title: `함께한지 ${getDaysTogether()}일`,
description: `부부가 된 지 ${getDaysMarried()}일`,
    image: "/timeline4.gif",
  },
];


export default function Timeline() {
  const titleRef = useScrollReveal();

  const item1Ref = useScrollReveal();
  const item2Ref = useScrollReveal();
  const item3Ref = useScrollReveal();
  const item4Ref = useScrollReveal();

  const itemRefs = [
    item1Ref,
    item2Ref,
    item3Ref,
    item4Ref,
  ];

  return (
    <section className="timeline">
      <h2 ref={titleRef}>TIMELINE</h2>

      <div className="timeline__body">
        <div className="timeline__rail" aria-hidden="true" />

        <ul className="timeline__list">
          {TIMELINE_ITEMS.map((item, index) => (
            <li
              key={item.date}
              ref={itemRefs[index]}
              className={`timeline__item timeline__item--${
                index % 2 === 0 ? "left" : "right"
              }`}
            >
              <div className="timeline__wrapper">
                <div className="timeline__image-container">
                  <img
                    src={`${process.env.PUBLIC_URL}${item.image}`}
                    alt={item.title}
                    draggable={false}
                    className="timeline__image"
                  />
                </div>

                <div className="timeline__text-container">
                  <span className="timeline__date">
                    {item.date}
                  </span>

                  <h3 className="timeline__title">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="timeline__description">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}