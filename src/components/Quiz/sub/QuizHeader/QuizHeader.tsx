import './QuizHeader.css';

export default function QuizHeader({index}) {
    return (<>
        <div id='question-header'>
            <span id='answer-question-writing'>Odpowiedz na kilka pytań</span>
            <span id='plant-recommendation-header'>A my przygotujemy rekomendacje roślin dla Ciebie</span>
            <span id='count-header'>{index}/6</span>
        </div>
    </>)
}