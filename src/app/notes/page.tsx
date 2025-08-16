import Search from '@/components/Layout/Search';
import NoteCard from '@/components/Note/NoteCard';
import NoteAdd from '@/components/Note/NoteAdd';

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
        <NoteCard title="Sample Note" />
      </div>
      <NoteAdd />
    </section>
  );
}
