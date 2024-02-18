'use client';

import React from 'react';
import iconCorrect from '../../public/assets/images/icon-correct.svg';
import iconIncorrect from '../../public/assets/images/icon-incorrect.svg';
import Buttons from '../Buttons/Buttons';
import Image from 'next/image';
import { Subject } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeVariants } from '@/animation';

type QuestionWizardProps = {
  subjectObj: Subject;
  quesIndex: number;
  isLastQuestion: boolean;
  isActive: number | null;
  correctAnswer: string | null;
  incorrectIndex: number | null;
  correctAnsHint: string | null;
  isNextQuestion: boolean;
  emptyError: boolean;
  setEmptyError: (empty: boolean) => void;
  setAnswer: (answer: string) => void;
  setIsActive: (isActive: number) => void;
  handleViewScoreButton: () => void;
  hanldeNextQuestions: () => void;
  handleAnswer: () => void;
};

const QuestionWizard = ({
  subjectObj,
  quesIndex,
  isLastQuestion,
  isActive,
  correctAnswer,
  incorrectIndex,
  correctAnsHint,
  isNextQuestion,
  emptyError,
  setEmptyError,
  setAnswer,
  setIsActive,
  handleViewScoreButton,
  hanldeNextQuestions,
  handleAnswer,
}: QuestionWizardProps) => {
  return (
    <div className="mb-28 mt-8 flex w-full flex-col   justify-between gap-10 md:mt-12 md:flex-col md:gap-14 lg:mt-[85px] lg:flex-row lg:gap-28">
      <div className="flex  flex-1 flex-col">
        <div className="size-full lg:max-h-[420px]">
          <h3 className="flex-1 italic text-dark-900 dark:text-light-700">
            Question&nbsp;
            {quesIndex === subjectObj[0]?.questions?.length
              ? subjectObj[0]?.questions?.length
              : quesIndex + 1}
            &nbsp;of&nbsp;
            {subjectObj[0]?.questions?.length}
          </h3>

          <AnimatePresence mode="wait" initial={false}>
            <motion.h4
              key={quesIndex}
              variants={fadeVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="mt-7 w-full flex-1 text-xl text-dark-700 dark:text-light-900 md:text-4xl lg:text-4xl"
            >
              {subjectObj[0]?.questions[quesIndex]?.question}
            </motion.h4>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex h-4 w-full  rounded-full bg-light-900 p-1 dark:bg-dark-800 md:mt-10 lg:mt-0">
          <motion.div
            animate={{
              width: `${isLastQuestion ? `${(quesIndex + 1 / 10) * 100}%` : `${(quesIndex / 10) * 100}%`}`,
            }}
            transition={{
              duration: 0.3,
            }}
            className="h-full rounded-full bg-customPurple "
          ></motion.div>
        </div>
      </div>

      <div className="relative z-10 flex size-full flex-1 flex-col gap-6">
        <AnimatePresence>
          {emptyError && (
            <motion.div
              variants={fadeVariants}
              animate="show"
              initial="hidden"
              exit="exit"
              className="absolute top-12 -z-10 flex size-full flex-1 items-end  justify-center gap-2"
            >
              <Image
                src={iconIncorrect}
                width={30}
                height={30}
                alt="icon incorrect"
              />
              <p className="text-lg text-customRed dark:text-light-900 md:text-2xl lg:text-2xl">
                Please select an answer
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {subjectObj[0]?.questions[quesIndex]?.options?.map((opt, index) => (
          <div
            className={`flex w-full cursor-pointer items-center justify-between rounded-2xl bg-light-900 p-3    transition-all  hover:border-customPurple  dark:bg-dark-800 ${isActive === index ? 'border-4 border-customPurple' : correctAnswer === opt ? 'border-4 border-customGreen dark:border-customGreen' : index === incorrectIndex ? 'border-4 border-customRed' : correctAnsHint === opt ? 'border-4 border-customGreen' : 'border-4 border-transparent'}`}
            key={opt}
            onClick={() => {
              setAnswer(opt);
              setIsActive(index);
              if (index) {
                setEmptyError(false);
              }
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

        <Buttons
          isLastQuestion={isLastQuestion}
          handleViewScoreButton={handleViewScoreButton}
          isNextQuestion={isNextQuestion}
          hanldeNextQuestions={hanldeNextQuestions}
          handleAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};

export default QuestionWizard;
