import Search from '@/components/Layout/Search';
import NoteAdd from '@/components/Note/NoteAdd';
import Notebook from '@/components/Note/Notebook';

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
      <Notebook />
      <NoteAdd />
    </section>
  );
}
