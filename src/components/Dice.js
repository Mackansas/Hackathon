import Die from "./Die";
import React from "react";

function Dice({ amount=1 }) {
    const [sum, setSum] = React.useState(amount);
    const [result, setResult] = React.useState([...Array(amount)].map(() => 1) );

    const addValue = (i, v) => {
        const resultCopy = result;
        resultCopy[i] = v;
        setResult(resultCopy);
        setSum(resultCopy.reduce(((a, b) => a + b), 0))
    }

    return (
        <div className="dice-container">
            <p>{sum}</p>
            <div className="dice">
                {[...Array(amount).keys()].map((i) => <Die key={`die${i}`} id={`die${i}`} res={(v) => addValue(i, v)}/>)}
            </div>
        </div>
    )
}

export default Dice;