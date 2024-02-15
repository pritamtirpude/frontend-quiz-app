'use client';

import React, { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import { quizzes } from '@/data';
import iconCorrect from '../../../public/assets/images/icon-correct.svg';
import iconIncorrect from '../../../public/assets/images/icon-incorrect.svg';
import Image from 'next/image';
import ViewScore from '@/components/ViewScore/ViewScore';

const QuestionsPage = () => {
  const pathname = usePathname();

  const [quesIndex, setQuesIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [isActive, setIsActive] = useState<number | null>();
  const [incorrectIndex, setIncorrectIndex] = useState<number | null>();
  const [correctAnswer, setCorrectAnswer] = useState<string | null>();
  const [correctAnsHint, setCorrectAnsHint] = useState<string | null>();
  const [isNextQuestion, setIsNextQuestion] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isViewScore, setIsViewScore] = useState<boolean>(false);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const [emptyError, setEmptyError] = useState<boolean>(false);

  const subjectObj = quizzes.filter(
    (ques) => ques.title === pathname.split('/').pop(),
  );

  const hanldeNextQuestions = () => {
    setAnswer('');
    setIsNextQuestion((prevState) => !prevState);
    setCorrectAnswer(null);
    setIsActive(null);
    setIncorrectIndex(null);
    setEmptyError(false);

    setQuesIndex((prevState) => {
      if (prevState === subjectObj[0].questions.length - 1) {
        return subjectObj[0].questions.length - 1;
      }

      return prevState + subjectObj[0].questions.length * 0 + 1;
    });
  };

  const checkIsLastQuestion = () => {
    if (quesIndex === subjectObj[0].questions.length - 1) {
      setIsNextQuestion(false);
    } else {
      setIsNextQuestion((prevState) => !prevState);
    }
  };

  const handleViewScoreButton = () => {
    if (isLastQuestion) {
      setIsViewScore((prevState) => !prevState);
    }
  };

  const handleAnswer = () => {
    const correctAns = subjectObj[0].questions[quesIndex].answer;

    if (!answer) {
      setEmptyError((prevState) => !prevState);
      return;
    }

    if (correctAns === answer) {
      setCorrectAnswer(correctAns);
      checkIsLastQuestion();
      setScore((prevState) =>
        prevState !== undefined ? prevState + 1 : prevState,
      );
      setIsActive(null);
      setAnswer('');
    } else {
      setIncorrectIndex(isActive);
      setCorrectAnsHint(correctAns);
      checkIsLastQuestion();
      setIsActive(null);
    }

    if (quesIndex === subjectObj[0].questions.length - 1) {
      setIsLastQuestion((prevState) => !prevState);
    }
  };

  return (
    <Fragment>
      {isViewScore ? (
        <ViewScore score={score} subjectObj={subjectObj} />
      ) : (
        <div className="mt-8 flex w-full flex-col  justify-between gap-10 md:mt-12 md:flex-col md:gap-14 lg:mt-[85px] lg:flex-row lg:gap-28">
          <div className="flex  flex-1 flex-col">
            <div className="size-full lg:max-h-[420px]">
              <h3 className="flex-1 italic text-dark-900 dark:text-light-700">
                Question&nbsp;
                {quesIndex === subjectObj[0].questions.length
                  ? subjectObj[0].questions.length
                  : quesIndex + 1}
                &nbsp;of&nbsp;
                {subjectObj[0].questions.length}
              </h3>

              <h4 className="mt-7 flex-1 text-xl text-dark-700 dark:text-light-900 md:text-4xl lg:text-4xl">
                {subjectObj[0].questions[quesIndex]?.question}
              </h4>
            </div>

            <div className="mt-6 flex h-4 w-full  rounded-full bg-light-900 p-1 dark:bg-dark-800 md:mt-10 lg:mt-0">
              <div
                style={{
                  width: `${isLastQuestion ? `${(quesIndex + 1 / 10) * 100}%` : `${(quesIndex / 10) * 100}%`}`,
                }}
                className="h-full rounded-full bg-customPurple "
              ></div>
            </div>
          </div>

          <div className="flex size-full flex-1 flex-col gap-6">
            {subjectObj[0].questions[quesIndex].options.map((opt, index) => (
              <div
                className={`flex w-full cursor-pointer items-center justify-between rounded-2xl    bg-light-900  p-3  dark:bg-dark-800 ${isActive === index ? 'border-4 border-customPurple' : correctAnswer === opt ? 'border-4 border-customGreen dark:border-customGreen' : index === incorrectIndex ? 'border-4 border-customRed' : correctAnsHint === opt ? 'border-4 border-customGreen' : 'border-4 border-transparent'}`}
                key={opt}
                onClick={() => {
                  setAnswer(opt);
                  setIsActive(index);
                }}
              >
                <div className="flex w-full items-center gap-4 md:gap-8 lg:gap-8">
                  <div
                    className={`flex size-10  items-center justify-center rounded-md  p-2  md:size-14 md:p-3 lg:size-14 lg:p-3 ${correctAnswer === opt ? 'bg-customGreen dark:bg-customGreen' : incorrectIndex === index ? 'bg-customRed' : 'bg-light-800 dark:bg-light-900'}`}
                  >
                    <span
                      className={`text-lg font-bold text-dark-700 md:text-2xl lg:text-2xl ${correctAnswer === opt ? 'text-light-900' : incorrectIndex === index ? 'text-light-900' : ''}`}
                    >
                      {index === 0
                        ? 'A'
                        : index === 1
                          ? 'B'
                          : index === 2
                            ? 'C'
                            : index === 3
                              ? 'D'
                              : ''}
                    </span>
                  </div>

                  <h5 className="flex-1 leading-6 text-dark-700 dark:text-light-900 md:text-2xl lg:text-2xl">
                    {opt}
                  </h5>
                </div>

                {correctAnswer === opt || correctAnsHint === opt ? (
                  <Image
                    src={iconCorrect}
                    width={30}
                    height={30}
                    alt="icon correct"
                  />
                ) : incorrectIndex === index ? (
                  <Image
                    src={iconIncorrect}
                    width={30}
                    height={30}
                    alt="icon incorrect"
                  />
                ) : (
                  ''
                )}
              </div>
            ))}

            {isLastQuestion ? (
              <button
                type="button"
                onClick={handleViewScoreButton}
                className="rounded-2xl bg-customPurple p-4 text-xl text-light-900 lg:p-6 lg:text-2xl"
              >
                View Score
              </button>
            ) : isNextQuestion ? (
              <button
                type="button"
                onClick={hanldeNextQuestions}
                className="rounded-2xl bg-customPurple p-4 text-xl text-light-900 lg:p-6 lg:text-2xl"
              >
                Next Question
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAnswer}
                className="rounded-2xl bg-customPurple p-4 text-xl text-light-900 lg:p-6 lg:text-2xl"
              >
                Submit Answer
              </button>
            )}

            {emptyError && (
              <div className="w-full flex-1">
                <p className="">Please select an answer</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default QuestionsPage;
