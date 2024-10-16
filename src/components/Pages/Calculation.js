import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

export function Calculation() {
  const userAnswerStorage = useSelector((state) => state.userAnswerInfo.value);
  const chartRef = useRef();
  const [numberOfCorrect, setNumberOfCorrect] = useState(0);
  const [indexOfTotalQuestion, setindexOfTotalQuestion] = useState(0);
  const [whickPartClicked, setWhichPartClicked] = useState(2);
  useEffect(() => {
    function calculateScore() {
      userAnswerStorage.map((answer, index) => {
        answer.map((option) =>
          option.isSelection === option.isTrue && option.isTrue
            ? setNumberOfCorrect((prev) => prev + 1)
            : null
        );
        setindexOfTotalQuestion(index);
      });
      console.log(userAnswerStorage);
    }
    calculateScore();
  }, []);

  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event));
    setWhichPartClicked(getElementAtEvent(chartRef.current, event)[0].index);
  };

  function onClickedWordBtn(answer) {
    console.log(answer)
  }

  const data = {
    labels: ["Doğru", "Yanlış"],
    datasets: [
      {
        label: "# of Votes",
        data: [numberOfCorrect, indexOfTotalQuestion + 1 - numberOfCorrect],
        backgroundColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
        borderColor: ["rgba(0, 100, 0, 1)", "rgba(139, 0, 0, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div>
        <Pie
          data={data}
          ref={chartRef}
          onClick={onClick}
          width={750}
          height={375}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div className="flex text-white justify-center mt-3">
        {userAnswerStorage.map((answer) => (
          <Words answer={answer} />
        ))}
      </div>
    </div>
  );

  function Words({ answer }) {
    return (
      <div>
        {whickPartClicked === 0 ? (
          <button
          onClick = {() => onClickedWordBtn(answer)}
            className={`${answer.map((e) =>
              (e.isTrue === e.isSelection) & (e.isTrue === true)
                ? "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                : null
            )}`}
          >
            {answer.map((e) =>
              (e.isTrue === e.isSelection) & (e.isTrue === true) ? e.word : null
            )}
          </button>
        ) : whickPartClicked === 1 ? (
          <button
            className={`${answer.map((e) =>
              (e.isTrue === !e.isSelection) & (e.isTrue === true)
                ? "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                : null 
            )}`}
          >
            {answer.map((e) =>
              (e.isTrue === !e.isSelection) & (e.isTrue === true) ? e.word : null
            )}
          </button>
        ): null}
      </div>
    );
  }
}

export default Calculation;


