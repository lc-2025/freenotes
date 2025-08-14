import Search from '@/components/Search';
import Note from '@/components/Note';

/**
 * @description Home Page
 * @author Luca Cattide
 * @date 14/08/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function Home(): React.ReactNode {
  return (
    <section className="home w-full">
      <h6 className="home__title hidden">Home</h6>
      <Search />
      <div className="home__container mx-4 mt-4 grid grid-cols-1 gap-4 md:mx-12 md:mt-4 md:grid-cols-3">
        <Note title="Sample Note" />
      </div>
      <button
        aria-label="Create new note"
        className="home__new fixed right-4 bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-600 transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-blue-600 md:right-12 md:bottom-8 md:h-16 md:w-16 dark:bg-blue-500"
        type="button"
      >
        <span className="new__title text-2xl font-bold text-white md:text-3xl">
          +
        </span>
      </button>
    </section>
  );
}
