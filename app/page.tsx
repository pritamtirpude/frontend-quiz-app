import { quizzes } from '@/data';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="mt-12 flex size-full flex-col justify-between gap-6 md:mt-12 lg:mt-24  lg:flex-row">
      <div className="w-full">
        <h1 className="text-[40px] font-bold leading-[50px] text-dark-700 dark:text-light-900 lg:text-[64px] lg:leading-[70px]">
          <span className="font-thin text-dark-800 dark:text-light-900">
            Welcome to the
          </span>
          <br />
          Frontend Quiz!
        </h1>

        <p className="mt-4 italic text-dark-900 dark:text-light-700 lg:mt-12">
          Pick a subject to get started.
        </p>
      </div>

      <div className="mt-10 flex w-full flex-col gap-6 md:mt-16 lg:mt-0">
        {quizzes.map((quiz) => (
          <Link key={quiz.title} href={`/quiz/${quiz.title}`}>
            <div className="flex w-full cursor-pointer items-center gap-8 rounded-2xl bg-light-900 p-5 drop-shadow-xl dark:bg-dark-800">
              <div
                style={{ backgroundColor: `${quiz.bgIconColor}` }}
                className={`flex size-10 items-center justify-center rounded-md p-2 lg:size-14`}
              >
                <Image
                  src={quiz.icon}
                  alt={quiz.title}
                  width={32}
                  height={32}
                  className="rounded-md"
                />
              </div>

              <h2 className="text-lg  text-dark-700 dark:text-light-900 lg:text-[28px]">
                {quiz.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
