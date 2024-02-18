'use client';

import React, { useEffect, useState } from 'react';
import { Subject } from '@/types';
import Image from 'next/image';
import Confetti from 'react-confetti';

type ScoreProps = {
  score: number;
  subjectObj: Subject;
};

const ViewScore = ({ score, subjectObj }: ScoreProps) => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectWindowSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', detectWindowSize);

    return () => {
      window.removeEventListener('resize', detectWindowSize);
    };
  }, [dimension]);

  return (
    <div className="mt-8 flex w-full flex-col justify-between gap-10 md:mt-12  md:flex-col md:gap-16 lg:mt-[85px] lg:flex-row">
      <div className="flex-1">
        <h1 className="text-[40px] leading-[50px]  text-dark-700  dark:text-light-900 lg:text-[64px] lg:leading-[75px]">
          Quiz Completed <br />
          <span className="text-[40px] font-bold text-dark-700 dark:text-light-900 lg:text-[64px]">
            You scored...
          </span>
        </h1>
      </div>

      <div className="flex-1">
        <div className="flex flex-col items-center rounded-3xl bg-light-900 p-8 dark:bg-dark-800 md:p-12 lg:p-12">
          <div className="flex items-center gap-6">
            <div
              style={{ backgroundColor: `${subjectObj[0]?.bgIconColor}` }}
              className={`flex size-10 items-center justify-center rounded-md p-2 lg:size-14`}
            >
              <Image
                src={subjectObj[0].icon}
                alt={subjectObj[0].title}
                width={32}
                height={32}
                className="rounded-md"
              />
            </div>

            <h2 className="text-lg  text-dark-700 dark:text-light-900 md:text-[28px] lg:text-[28px]">
              {subjectObj[0]?.title}
            </h2>
          </div>

          <h3 className="text-[88px] text-dark-700 dark:text-light-900 md:text-[140px] lg:text-[140px]">
            {score}
          </h3>

          <h4 className="text-2xl text-dark-900 dark:text-light-700">
            out of {subjectObj[0].questions.length}
          </h4>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 w-full rounded-2xl bg-customPurple p-4 text-xl text-light-900 lg:p-6 lg:text-2xl"
        >
          Play Again
        </button>
      </div>
      {score >= 5 && (
        <Confetti
          width={dimension.width}
          height={dimension.height}
          className="size-full"
          gravity={0.2}
          initialVelocityY={5}
        />
      )}
    </div>
  );
};

export default ViewScore;
