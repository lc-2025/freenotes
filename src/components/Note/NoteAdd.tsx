'use client';

import { useRouter } from 'next/navigation';
import { ARIA, ROUTE } from '@/utils/constants';
import { PlusIcon } from '@heroicons/react/24/solid';

/**
 * @description Note add button component
 * @author Luca Cattide
 * @date 14/08/2025
 * @returns {*}  {React.ReactNode}
 */
const NoteAdd = (): React.ReactNode => {
  const router = useRouter();

  /**
   * @description New note action handler
   * @author Luca Cattide
   * @date 14/08/2025
   */
  const handleNew = (): void => {
    router.push(ROUTE.NEW.PATH);
  };

  return (
    <button
      aria-label={ARIA.NEW}
      className="home__new fixed right-4 bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-600 hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 md:right-12 md:bottom-8 md:h-16 md:w-16 dark:bg-blue-500"
      onClick={handleNew}
      type="button"
    >
      <PlusIcon className="action__ title size-6 text-2xl text-white md:text-3xl" />
    </button>
  );
};

export default NoteAdd;
