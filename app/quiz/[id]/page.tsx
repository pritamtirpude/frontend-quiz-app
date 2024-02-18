'use client';

import React, { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import { quizzes } from '@/data';
import ViewScore from '@/components/ViewScore/ViewScore';
import QuestionWizard from '@/components/QuestionWizard/QuestionWizard';

const QuestionsPage = () => {
  const pathname = usePathname();

  const [quesIndex, setQuesIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [isActive, setIsActive] = useState<number | null>(null);
  const [incorrectIndex, setIncorrectIndex] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [correctAnsHint, setCorrectAnsHint] = useState<string | null>(null);
  const [isNextQuestion, setIsNextQuestion] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isViewScore, setIsViewScore] = useState<boolean>(false);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const [emptyError, setEmptyError] = useState<boolean>(false);

  const subjectObj = quizzes.filter(
    (ques) => ques?.title === pathname.split('/').pop(),
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
        return subjectObj[0]?.questions?.length - 1;
      }

      return prevState + subjectObj[0]?.questions?.length * 0 + 1;
    });
  };

  const checkIsLastQuestion = () => {
    if (quesIndex === subjectObj[0]?.questions?.length - 1) {
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
    const correctAns = subjectObj[0]?.questions[quesIndex]?.answer;

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

    if (quesIndex === subjectObj[0]?.questions?.length - 1) {
      setIsLastQuestion((prevState) => !prevState);
    }
  };

  return (
    <Fragment>
      {isViewScore ? (
        <ViewScore score={score} subjectObj={subjectObj} />
      ) : (
        <QuestionWizard
          subjectObj={subjectObj}
          quesIndex={quesIndex}
          isLastQuestion={isLastQuestion}
          isActive={isActive}
          correctAnswer={correctAnswer}
          incorrectIndex={incorrectIndex}
          correctAnsHint={correctAnsHint}
          setAnswer={setAnswer}
          setIsActive={setIsActive}
          handleViewScoreButton={handleViewScoreButton}
          isNextQuestion={isNextQuestion}
          hanldeNextQuestions={hanldeNextQuestions}
          handleAnswer={handleAnswer}
          emptyError={emptyError}
          setEmptyError={setEmptyError}
        />
      )}
    </Fragment>
  );
};

export default QuestionsPage;
