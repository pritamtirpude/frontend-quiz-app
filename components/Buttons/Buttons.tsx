import React, { Fragment } from 'react';

type ButtonsProps = {
  isLastQuestion: boolean;
  handleViewScoreButton: () => void;
  isNextQuestion: boolean;
  hanldeNextQuestions: () => void;
  handleAnswer: () => void;
};

const Buttons = ({
  isLastQuestion,
  handleViewScoreButton,
  isNextQuestion,
  hanldeNextQuestions,
  handleAnswer,
}: ButtonsProps) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Buttons;
