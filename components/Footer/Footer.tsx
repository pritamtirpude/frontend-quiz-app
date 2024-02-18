import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-center gap-4  border-t-[0.1rem] border-dark-700  p-4 dark:border-dark-900">
      <div className="flex items-center justify-center rounded-md border-[0.1rem]  border-dark-700 p-2 dark:border-light-900">
        <Link
          href="https://github.com/pritamtirpude"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaGithub size={15} />
        </Link>
      </div>
      <div className="flex items-center justify-center rounded-md border-[0.1rem]  border-dark-700 p-2 dark:border-light-900">
        <Link
          href="https://twitter.com/ptirpude1991"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaTwitter size={15} />
        </Link>
      </div>
      <div className="flex items-center justify-center rounded-md border-[0.1rem]  border-dark-700 p-2 dark:border-light-900">
        <Link
          href="https://www.linkedin.com/in/pritam23/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaLinkedin size={15} />
        </Link>
      </div>
      <div className="flex items-center justify-center rounded-md border-[0.1rem]  border-dark-700 p-2 dark:border-light-900">
        <Link
          href="https://www.instagram.com/pritam231991/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaInstagram size={15} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
