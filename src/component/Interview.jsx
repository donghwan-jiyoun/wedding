import './Interview.scss';

export default function Interview() {
    const INTERVIEWS = [
        {
            question: '앞으로 어떤 모습으로 함께 살아가고 싶으신가요?',
            answers: [
                {
                    class: 'groom',
                    name: '동환',
                    emoji: '🤵🏻',
                    text: '지금까지 서로를 배려하고 이해하며 함께해온 것처럼, \n앞으로도 기쁜 일과 슬픈 일 모두 함께 나누며 \n소소한 일상 속에서도 \n서로의 행복을 찾아가며 살아가기',
                },
                {
                    name: '지윤',
                    emoji: '👰🏻‍♀️',
                    text: '어떤 상황에서도 서로를 배려하고 마음을 솔직하게 표현하며 \n 서로에게 가장 편하고 든든한 친구 같은 부부로 살아가기',
                },
            ],
        },
        {
            question: '축하의 마음을 어떻게 전하면 좋을까요?',
            answers: [
                {
                    name: null,
                    text: '직접 모시지 못해 죄송한 마음입니다. \n저희를 생각해주시는 마음만으로도 충분히 감사합니다. \n 서로 아끼며 행복하게 잘 살아가겠습니다.',
                },
            ],
        },
    ];

    return (
        <section className="interview">
            <h2>INTERVIEW</h2>
            {INTERVIEWS.map((item, idx) => (
                <div key={idx} className="interview__section">
                    <h3 className="interview__question">Q. {item.question}</h3>
                    <div className="interview__answers">
                        {item.answers.map((answer, answerIndex) => (
                            <div key={answerIndex} className="interview__answer">
                                {answer.name ? (
                                    <span className={`interview__name ${answer.class === 'groom' ? 'is-groom' : 'is-bride'}`}>
                                       {answer.emoji}{answer.name}
                                    </span>
                                ) : null}
                                <p className="interview__text">{answer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
                    <div className='img-container'>
        <img src='wedding.jpg' alt="Wedding" />
        </div>
        </section>
    );
}
