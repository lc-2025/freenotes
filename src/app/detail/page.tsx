import CustomButton from '@/components/CustomButton';

/**
 * @description Note details page
 * @author Luca Cattide
 * @date 14/08/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function NoteDetailPage(): React.ReactNode {
  return (
    <section className="detail">
      <div className="detail__note mx-4 mt-4 md:mx-12 md:mt-8">
        <h2 className="note__title text-light-text dark:text-dark-text text-lg font-semibold md:text-xl">
          Sample Note
        </h2>
        <p className="note__body text-light-subtext dark:text-dark-subtext mt-2 text-base font-normal md:text-lg">
          This is a sample note content...
        </p>
        <div className="note__tags mt-4 h-6 w-20 rounded bg-gray-100 md:h-7 md:w-24 dark:bg-gray-700">
          <span className="tags__tag text-light-placeholder dark:text-dark-placeholder px-2 text-sm font-normal md:text-base">
            Tag
          </span>
        </div>
      </div>
      <aside className="detail__actions mx-4 mt-4 flex flex-col gap-4 md:mx-12 md:mt-8 md:flex-row">
        <h6 className="actions__title hidden">Actions</h6>
        <CustomButton
          ariaLabel="Edit note"
          color="bg-blue-600 dark:bg-blue-500"
          text="Edit"
        />
        <CustomButton
          ariaLabel="Delete note"
          color="bg-red-600 dark:bg-red-500"
          text="Delete"
        />
      </aside>
    </section>
  );
}
