import NoteNew from '@/components/Note/NoteNew';
import { SECTION } from '@/utils/constants';

/**
 * @description New note page
 * @author Luca Cattide
 * @date 14/08/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function New(): React.ReactNode {
  return (
    <section className="new flex w-full flex-1 flex-col pb-4 md:pb-12">
      <h6 className="new__title hidden">{SECTION.NEW}</h6>
      <NoteNew />
    </section>
  );
}
