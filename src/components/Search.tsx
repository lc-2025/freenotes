'use client';

import { useState } from 'react';
import { SECTION, FORM } from '@/utils/constants';

/**
 * @description Search component
 * @author Luca Cattide
 * @date 14/08/2025
 * @returns {*}  {React.ReactNode}
 */
const Search = (): React.ReactNode => {
  const { SEARCH } = FORM.PLACEHOLDER;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <aside className="search relative mx-4 mt-4 md:mx-12 md:mt-8">
        <h6 className="search__title hidden">{SECTION.SEARCH}</h6>
        <label className="search__label sr-only" htmlFor="search">
          {SEARCH}
        </label>
        <input
          className="search__input text-1rem md:text-1.125rem text-light-placeholder dark:text-dark-placeholder h-10 w-full rounded-lg bg-gray-100 px-2 text-base font-normal focus-visible:outline focus-visible:outline-blue-600 md:h-12 md:rounded-xl md:px-4 md:text-lg dark:bg-gray-700"
          id="search"
          placeholder={`${SEARCH}...`}
          type="text"
        />
        <button
          aria-label="Start voice search"
          className="w-2rem h-2rem absolute top-0.5 right-0.5 flex items-center justify-center rounded-full bg-blue-600 focus-visible:outline focus-visible:outline-blue-600 dark:bg-blue-500"
          onClick={() => setOpen(true)}
        >
          <svg
            className="w-1rem h-1rem text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9h2v6h-2V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2z" />
          </svg>
        </button>
      </aside>
      {open && (
        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
          <div className="w-12.5rem h-7.5rem bg-light-bg dark:bg-dark-bg flex items-center justify-center rounded-lg">
            <p className="text-1rem text-light-text dark:text-dark-text font-normal">
              Listening...
            </p>
            <button
              aria-label="Close voice search"
              onClick={() => setOpen(false)}
              className="text-1rem absolute top-0.5 right-0.5 text-blue-600 focus-visible:outline focus-visible:outline-blue-600 dark:text-blue-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
