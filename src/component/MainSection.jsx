import {
  ArrowBride,
  ArrowGroom,
  Flower1,
  Flower2,
  Flower3,
  Flower4,
  Flower5,
  Flower6,
  Flower7,
  Leaf1,
  Leaf2,
  Leaf3,
  Leaf4,
} from "./icon";
import "./MainSection.scss";

/* -------------------------------------------------------------------------- */
/* 배치 데이터 — 디자인 값은 전부 여기에 모아둠                                  */
/* -------------------------------------------------------------------------- */

// placement 는 사진 영역 기준 비율(%), delay 는 등장 지연(ms),
// spinDelay 는 반복 애니메이션의 시작 위상(음수), flipX 는 좌우 반전
const ICON_STICKERS = [
  { key: "flower-6",    Icon: Flower6,    placement: { left: "0%",       top: "62%",      width: "5%" },    delay: 1500, spin: "rotate", spinDelay: "0s" },
  { key: "flower-7",    Icon: Flower7,    placement: { left: "100%",     top: "54%",      width: "5%" },    delay: 1350, spin: "rotate", spinDelay: "-24.7214s" },
  { key: "leaf-2",      Icon: Leaf2,      placement: { left: "7%",       top: "48%",      width: "5%" },    delay: 1200, spin: "pulse",  spinDelay: "-0.424922s" },
  { key: "flower-4",    Icon: Flower4,    placement: { left: "96%",      top: "43%",      width: "8.69%" }, delay: 1050, spin: "pulse",  spinDelay: "-1.53738s", flipX: true },
  { key: "flower-1",    Icon: Flower1,    placement: { left: "2%",       top: "38%",      width: "6.61%" }, delay: 900,  spin: "rotate", spinDelay: "-18.8854s" },
  { key: "arrow-groom", Icon: ArrowGroom, placement: { left: "26.3353%", top: "37.4637%", width: "7.94%", rotation: 32 },  delay: 2233 },
  { key: "arrow-bride", Icon: ArrowBride, placement: { left: "73.0304%", top: "37.7398%", width: "5.96%", rotation: 240 }, delay: 2673, flipX: true },
  { key: "leaf-4",      Icon: Leaf4,      placement: { left: "99%",      top: "18%",      width: "5%" },    delay: 750,  spin: "pulse",  spinDelay: "-0.162306s", flipX: true },
  { key: "leaf-3",      Icon: Leaf3,      placement: { left: "16%",      top: "16.023%",  width: "5%" },    delay: 600,  spin: "pulse",  spinDelay: "-1.27477s" },
  { key: "flower-3",    Icon: Flower3,    placement: { left: "80%",      top: "14%",      width: "6.61%" }, delay: 450,  spin: "rotate", spinDelay: "-13.0495s", flipX: true },
  { key: "flower-2",    Icon: Flower2,    placement: { left: "6%",       top: "6%",       width: "8.69%" }, delay: 300,  spin: "pulse",  spinDelay: "-1.69969s" },
  { key: "leaf-1",      Icon: Leaf1,      placement: { left: "84%",      top: "2%",       width: "5%" },    delay: 150,  spin: "pulse",  spinDelay: "-1.01215s" },
  { key: "flower-5",    Icon: Flower5,    placement: { left: "25%",      top: "0%",       width: "6.61%" }, delay: 0,    spin: "rotate", spinDelay: "-7.2136s" },
];

/** 글자 하나씩 순차 등장하는 이름 스티커의 시작 지연 / 간격 (ms) */
const STAGGER = {
  groom: { start: 180, step: 40 },
  bride: { start: 260, step: 40 },
};

/* -------------------------------------------------------------------------- */
/* 유틸                                                                        */
/* -------------------------------------------------------------------------- */

const cx = (...values) => values.filter(Boolean).join(" ");

// 배치 정보를 style 객체로 변환한다.
// 기본값(--sticker-rotation: 0deg, --sticker-x-anchor: -50%)과 같은 값은 넣지 않는다.
function placementStyle(placement, delay) {
  const style = { left: placement.left, top: placement.top };

  style.width = placement.width ?? "max-content";
  if (placement.aspectRatio) style.aspectRatio = placement.aspectRatio;
  if (placement.rotation) style["--sticker-rotation"] = `${placement.rotation}deg`;
  if (placement.anchor) style["--sticker-x-anchor"] = placement.anchor;
  if (delay !== undefined) style.animationDelay = `${delay}ms`;

  return style;
}

/* -------------------------------------------------------------------------- */
/* 내부 컴포넌트                                                                */
/* -------------------------------------------------------------------------- */

// 절대 위치 스티커 한 칸. fadeInDelay 를 넘기면 노드 자체가 페이드인한다.
function Sticker({ placement, fadeInDelay, children }) {
  return (
    <div
      className={cx("sticker", fadeInDelay !== undefined && "sticker--fade-in")}
      style={placementStyle(placement, fadeInDelay)}
    >
      {children}
    </div>
  );
}

// 텍스트 스티커. align 은 center|right, anim 은 slide-up|blur-in
function TextSticker({
  placement,
  font,
  fontSize,
  lineHeight,
  letterSpacing,
  align,
  anim,
  delay,
  children,
}) {
  return (
    <Sticker placement={placement}>
      <span
        className={cx("sticker__text", `sticker__text--${align}`, `sticker__text--${anim}`, font)}
        style={{ fontSize, lineHeight, letterSpacing, animationDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </Sticker>
  );
}

// 글자를 하나씩 쪼개 순차 등장시키는 신랑/신부 이름
function NameSticker({ placement, align, name, stagger }) {
  return (
    <Sticker placement={placement}>
      <span
        className={cx("sticker__text", `sticker__text--${align}`, "name-sticker")}
        style={{ fontSize: "2.7em", lineHeight: 0.8 }}
      >
        {Array.from(name).map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="sticker__char name-sticker__char"
            style={{ animationDelay: `${stagger.start + index * stagger.step}ms` }}
          >
            {char}
          </span>
        ))}
      </span>
    </Sticker>
  );
}

// <lottie-player> 는 웹 컴포넌트라 JSX 내장 태그가 아니므로 문자열 태그로 렌더링한다.
// 사용하려면 @lottiefiles/lottie-player 스크립트를 한 번 로드해야 한다.
const LottiePlayer = "lottie-player";

/* -------------------------------------------------------------------------- */
/* 메인 컴포넌트                                                                */
/* -------------------------------------------------------------------------- */

export default function MainSection({
  photoSrc = "visual_warm.jpg",
  photoAlt = "메인 사진",
  overlayColor, // 사진 위에 덮을 색. 없으면 오버레이를 렌더링하지 않음
  subtitle = "the start of our forever",
  eventDate = "December 12, 2025",
  groomName = "DONGHWAN",
  brideName = "JIYOUN",
  koreanNames = "김동환 × 강지윤",
  greeting = (
    <>
      {"In a world of fleeting things, we have found something that holds —"}
      <br />
      {"a love that listens, a promise that endures, and a future to build together, one day at a time."}
    </>
  ),
  lottieSrc, // 가운데 손글씨 로티 경로. 없으면 렌더링하지 않음
  className,
}) {
  return (
    <section className={cx("main-section", className)}>
      <div className="main-section__photo">
        <img className="main-section__photo-img" src={`${process.env.PUBLIC_URL}/${photoSrc}`} alt={photoAlt} draggable={false} />
        {overlayColor && (
          <div
            className="main-section__photo-overlay"
            style={{ backgroundColor: overlayColor }}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="main-section__stickers">
        <TextSticker
          placement={{ left: "50%", top: "93%" }}
          font="font-nunito"
          fontSize="0.8em"
          lineHeight={1.4}
          align="center"
          anim="slide-up"
          delay={1400}
        >
          {greeting}
        </TextSticker>

        <TextSticker
          placement={{ left: "50%", top: "89%" }}
          font="font-scoredream"
          fontSize="1.32em"
          lineHeight={1.2}
          align="center"
          anim="slide-up"
          delay={850}
        >
          {koreanNames}
        </TextSticker>

        <Sticker placement={{ left: "50%", top: "76.4514%", width: "85.86%", aspectRatio: "2.86957 / 1" }}>
          <div className="main-copy-image" aria-hidden="true">
            <img src={`${process.env.PUBLIC_URL}/married.webp`} alt="" draggable={false} />
          </div>
        </Sticker>

        <NameSticker
          placement={{ left: "84.3651%", top: "32.9815%", anchor: "-100%" }}
          align="right"
          name={brideName}
          stagger={STAGGER.bride}
        />

        <NameSticker
          placement={{ left: "23.6502%", top: "32.3027%" }}
          align="center"
          name={groomName}
          stagger={STAGGER.groom}
        />

        <TextSticker
          placement={{ left: "50%", top: "6.97626%" }}
          font="font-pretendard"
          fontSize="1.98em"
          lineHeight={1.2}
          align="center"
          anim="blur-in"
          delay={180}
        >
          {eventDate}
        </TextSticker>

        <TextSticker
          placement={{ left: "50%", top: "4%" }}
          font="font-montserrat"
          fontSize="0.8em"
          lineHeight={1}
          letterSpacing="0.3em"
          align="center"
          anim="blur-in"
          delay={40}
        >
          {subtitle}
        </TextSticker>

        {ICON_STICKERS.map(({ key, Icon, placement, delay, spin, spinDelay, flipX }) => (
          <Sticker key={key} placement={placement} fadeInDelay={delay}>
            <Icon
              className={cx("sticker__icon", spin && `sticker__icon--${spin}`)}
              style={{
                ...(spinDelay ? { animationDelay: spinDelay } : null),
                ...(flipX ? { "--sticker-flip-x": -1 } : null),
              }}
            />
          </Sticker>
        ))}
      </div>
    </section>
  );
}
