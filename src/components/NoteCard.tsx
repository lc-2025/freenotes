'use client';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/utils/constants';
import { TNote } from '@/types/Note';

/**
 * @description Note card component
 * @author Luca Cattide
 * @date 14/08/2025
 * @param {TNote} { title }
 * @returns {*}  {React.ReactNode}
 */
const NoteCard = ({ title }: TNote): React.ReactNode => {
  const router = useRouter();

  const handleDetails = (): void => {
    // TODO: Update with ID
    router.push(ROUTE.DETAILS.PATH);
  };

  return (
    <article
      className="note dark:border-dark-border md:h-card-desktop bg-light-bg dark:bg-dark-bg border-light-border h-30 w-full cursor-pointer rounded-lg border pt-4 pl-2  hover:opacity-75 md:rounded-xl md:pl-4"
      onClick={handleDetails}
    >
      <h2 className="note__title text-light-text dark:text-dark-text text-lg font-semibold md:text-xl select-none">
        {title}
      </h2>
    </article>
  );
};

export default NoteCard;
