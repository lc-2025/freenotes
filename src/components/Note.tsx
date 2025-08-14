import { TNote } from '@/types/Note';

/**
 * @description Note component
 * @author Luca Cattide
 * @date 14/08/2025
 * @param {TNote} { title }
 * @returns {*}  {React.ReactNode}
 */
const Note = ({ title }: TNote): React.ReactNode => {
  return (
    <article className="note bg-light-bg dark:bg-dark-bg dark:border-dark-border h-card-mobile md:h-card-desktop bg-light-bg dark:bg-dark-bg border-light-border h-30 w-full rounded-lg border pt-4 pl-2 md:rounded-xl md:pl-4">
      <h2 className="note__title text-light-text dark:text-dark-text text-lg font-semibold md:text-xl">
        {title}
      </h2>
    </article>
  );
};

export default Note;
