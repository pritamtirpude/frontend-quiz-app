'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import darkMoonIcon from '../../public/assets/images/icon-moon-dark.svg';
import darkSunIcon from '../../public/assets/images/icon-sun-dark.svg';
import lightMoonIcon from '../../public/assets/images/icon-moon-light.svg';
import lightSunIcon from '../../public/assets/images/icon-sun-light.svg';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { quizzes } from '@/data';

const Theme = () => {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const subject = quizzes.filter(
    (ques) => ques.title === pathname.split('/').pop(),
  );

  return (
    <div
      className={`flex w-full items-center ${pathname !== '/' ? 'justify-between' : 'justify-end'}`}
    >
      {pathname !== '/' && (
        <div className="flex items-center gap-6">
          <div
            style={{ backgroundColor: `${subject[0]?.bgIconColor}` }}
            className={`flex size-10 items-center justify-center rounded-md p-2 lg:size-14`}
          >
            <Image
              src={subject[0].icon}
              alt={subject[0].title}
              width={32}
              height={32}
              className="rounded-md"
            />
          </div>
          <h1 className="text-lg text-dark-700 dark:text-light-900 md:text-[28px] lg:text-[28px]">
            {subject[0]?.title}
          </h1>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Image
          src={theme !== 'dark' ? darkSunIcon : lightSunIcon}
          width={21}
          height={21}
          alt="sun icon"
          priority={true}
        />

        <div
          onClick={handleThemeChange}
          className={`flex h-7 w-12 ${theme === 'dark' ? 'justify-end' : 'justify-start'} cursor-pointer items-center rounded-full bg-customPurple p-1`}
        >
          <motion.div
            layout
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 700,
            }}
            className="size-5 rounded-full bg-white"
          ></motion.div>
        </div>

        <Image
          src={theme !== 'dark' ? darkMoonIcon : lightMoonIcon}
          width={21}
          height={21}
          alt="moon icon"
          priority={true}
        />
      </div>
    </div>
  );
};

export default Theme;
