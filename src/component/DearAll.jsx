import "./DearAll.scss";

export default function DearAll() {
  return (
    <section className="intro-letter">
      <h2>A NOTE OF THANKS</h2>
      <div className="letter-box">
        <div
          style={{
            opacity: 1,
            transform: "none",
            transition:
              "opacity 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          <p>
            조금 늦었지만, 진심으로 감사한 마음을 담아
            <br />
            저희의 소식을 전합니다.
          </p>
          <p>
            소소하고 잔잔한 행복과 일상을 꿈꾸며,
            <br />
            결혼도 그런 마음으로 맞이하고 싶었던 저희 두 사람은
            <br />
            결혼식을 생략하고 2025년 12월 12일 부부가 되었습니다.            
          </p>
          <p>
            감사한 분들을 직접 초대해 
            <br />
            함께 기쁨을 나누지 못하는 아쉬운 마음을
            <br />
            이렇게 글로 대신 전합니다.
          </p>
          <p>
            저희의 새로운 시작을 너그러운 마음으로 이해해 주시고,
            <br />
            따뜻한 축복 한마디 보내주신다면
            <br />
            평생 소중히 간직하겠습니다.
          </p>
          <p>
            그리고 지금까지 곁에서 저희를 아껴주셨던 모든 분들께도
            <br />
            늘 행복과 축복이 가득하기를 바랍니다.
          </p>
        </div>
      </div>
      <div className="our-story">
      <ul className="our-story__list">
        <li className="our-story__item">
          <div className="our-story__photo-wrap">
            <img src="/donghwan.jpg" alt="김동환" draggable={false} />
          </div>
          <div className="our-story__name our-story__name--groom">신랑 <span>김동환</span></div>
        </li>
        <li className="our-story__item">
          <div className="our-story__photo-wrap">
            <img src="/jiyoun.jpg" alt="강지윤" draggable={false} />
          </div>
          <div className="our-story__name our-story__name--bride">신부 <span>강지윤</span></div>
        </li>
      </ul>

      <div className="our-story__meta" aria-live="polite">
        <span className="our-story__heart" aria-label="하트">❤</span>
      </div>
    </div>
    </section>
  );
}