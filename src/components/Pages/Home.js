import axios from "axios";
import { useEffect, useState } from "react";
import { ToeflWordList } from "../../datas/ToeflWordList";
import { CommonWordList } from "../../datas/CommonWordList";
import { useDispatch } from "react-redux";
import { sendAnswer } from "../../stores/userAnswer";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <div>
      <div className="flex-col">
        <div className="flex justify-center ">
          <span className="text-[5rem] mt-5">
             İNGİLİZCE ÖĞRENİYORUM
          </span>
        </div>
        <div className="flex justify-center">
          <span className="text-xl my-12">
          İngilizce Öğreniyorum Programına Hoşgeldiniz.
          </span>
        </div>
      </div>
      <div className=" w-full">
        <StartPage />
      </div>  
    </div>
  );

 
  function StartPage() {
    const [userAnswer, setUserAnswer] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [choosingWords, setChoosingWords] = useState([]);
    const dispatch = useDispatch();
    function chosingRandomWord() {
      if (difficulty === "hard") {
        const wordList = [];

        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * ToeflWordList.length);
          wordList.push({
            ...ToeflWordList[randomIndex],
            isTrue: i == 4 ? true : false,
            indexWord: randomIndex,
          });
          wordList.sort(() => Math.random() - 0.5);
        }
        setChoosingWords(wordList);
      } else {
        const wordList = [];

        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * ToeflWordList.length);
          wordList.push({
            ...CommonWordList[randomIndex],
            isTrue: i == 4 ? true : false,
            indexWord: randomIndex,
          });
          wordList.sort(() => Math.random() - 0.5);
        }
        setChoosingWords(wordList);
      }
    }
    async function translate(text) {
      const API_KEY = "AIzaSyDY3V2uunYWKWQ4uB88K6yrSHq5Y-AlvL8";
      let res = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        { q: text, target: "tr" }
      );
      let translation = res.data.data.translations[0].translatedText;
      if (translation.includes("&#39;")) {
        translation = translation.replaceAll("&#39;", "'");
      }
      if (translation.includes("&quot;")) {
        translation = translation.replaceAll("&quot;", '"');
      }
      return translation;
    }
    const onClickedDificulty = (status) => setDifficulty(status);

    return (
      <div className="flex justify-around mt-5 max-w-full">
        {difficulty === "" ? (
          <DifficultyButtons />
        ) : (
          <QuestionPart
            choosingWords={choosingWords}
            chosingRandomWord={chosingRandomWord}
            translate={translate}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            dispatch={dispatch}
          />
        )}
      </div>
    );
    function DifficultyButtons() {
      return (
        <>
          <button
            className="w-1/3 p-8 py-12 text-3xl font-semibold text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => onClickedDificulty("easy")}
          >
            KOLAY
          </button>

          <button
            className="w-1/3 p-8 py-12 text-3xl font-semibold text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "
            onClick={() => onClickedDificulty("hard")}
          >
            ZOR
          </button>
        </>
      );
    }
  }

  function QuestionPart({
    choosingWords,
    chosingRandomWord,
    translate,
    userAnswer,
    setUserAnswer,
    dispatch,
  }) {
    const [isClickedFinishButton, setIsClickedFinishButton] = useState(false);
    const [optionItemChange, setOptionItemChange] = useState("answer");
    function onClickedFinishButton() {
      setIsClickedFinishButton(true);
      setOptionItemChange("check");
      dispatch(sendAnswer(userAnswer));
    }

    function chooseAnswer(answer) {
      const arr = [...userAnswer];
      choosingWords.map((words) =>
        answer.word === words.word
          ? (words.isSelection = true)
          : (words.isSelection = false)
      );
      arr.push(choosingWords);
      setUserAnswer(arr);
    }

    useEffect(() => {
      chosingRandomWord();
    }, [userAnswer]);

    return (
      <div className="w-full mx-64">
        {!isClickedFinishButton ? (
          <AnswerPart optionItemChange={optionItemChange} />
        ) : (
          <CheckWordPart />
        )}
      </div>
    );

    function CheckWordPart() {
      const [whichClickedWord, setWhichClickedWord] = useState([]);
      const onClickedWord = (index) => {
        setWhichClickedWord(index);
        console.log(index);
      };

      return (
        <div className="">
          <div className="flex-wrap flex justify-center " >
            {userAnswer.map((answer, index) => (
              <Words answer={answer} index={index} />
            ))}
          </div>
          <ul class=" text-sm justi font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {whichClickedWord.map((option) => (
              <OptionItem
                option={option}
                translate={translate}
                optionItemChange={optionItemChange}
              />
            ))}
          </ul>
          <div className="w-full flex justify-center mt-3">
            {whichClickedWord.length === 5 ? <CalculationBtn /> : null}
          </div>
          </div>
      );
      function Words({ answer }) {
        return (
          <>
            {
              <button
                onClick={() => onClickedWord(answer)}
                className={`${answer.map((e) =>
                  (e.isTrue === e.isSelection) === true
                    ? "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                    : "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                )}`}
              >
                {answer.map((e) => (e.isTrue ? e.word : null))}
              </button>
            }
          </>
        );
      }
      function CalculationBtn() {
        return (
          <Link to="/calculation">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Hesaplama
            </button>
          </Link>
        );
      }
    }

    function AnswerPart({ optionItemChange }) {
      return (
        <div className="">
          <div className="bg-slate-300 flex-col text-center">
            <div className="text-[5rem]">
              {choosingWords.map((word) => (word?.isTrue ? word?.word : null))}
            </div>
          </div>
          <ul class=" text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {choosingWords.map((option) => (
              <OptionItem
                option={option}
                translate={translate}
                optionItemChange={optionItemChange}
              />
            ))}
          </ul>
          <div>
            <button
              onClick={() => onClickedFinishButton()}
              type="button"
              class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {" "}
              Bitir
            </button>
          </div>
        </div>
      );
    }

    function OptionItem({ option, translate, optionItemChange }) {
      const isArray = Array.isArray(option.wordInfo);
      const [translated, setTranslated] = useState("");

      useEffect(() => {
        setTranslated([]);
        if (!isArray) {
          translate(option?.wordInfo).then((res) => setTranslated(res));
        } else {
          option?.wordInfo.map((e) =>
            translate(e).then((res) => setTranslated((prev) => [...prev, res]))
          );
        }
      }, [option]);
      return (
        <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
          <div
            class={`flex items-center pl-3 ${
              optionItemChange === "check"
                ? (option.isTrue === option.isSelection) &
                  (option.isSelection === true)
                  ? "bg-green-500"
                  : (option.isTrue !== option.isSelection) &
                    (option.isSelection === true)
                  ? "bg-red-400"
                  : (option.isTrue !== option.isSelection) &
                    (option.isTrue === true)
                  ? "bg-green-400"
                  : null
                : null
            }   `}
          >
            <input
              onChange={
                optionItemChange === "answer"
                  ? () => chooseAnswer(option)
                  : null
              }
              id="list-radio-license"
              type={`${optionItemChange === "check" ? "hidden" : "radio"}`}
              value=""
              name="list-radio-license"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="list-radio-license"
              class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {!Array.isArray(translated)
                ? translated
                : translated.map((text) => <p>{text}</p>)}
            </label>
          </div>
        </li>
      );
    }
  }
}

// function Question(props) {
//   const { options, handleAnswer } = props;

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-lg font-medium text-gray-800 mb-4">asdasdad</h2>
//       <div className="grid grid-cols-2 gap-4">
//         {options.map((option, index) => (
//           <button
//             key={index}
//             className="rounded-full py-3 px-6 border border-gray-400 bg-gray-100 hover:bg-gray-200 focus:outline-none"
//             onClick={() => handleAnswer(option.isCorrect)}
//           >
//             {option.answer}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

export default Home;
