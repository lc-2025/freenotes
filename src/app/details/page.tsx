import CustomButton from '@/components/CustomButton';
import { ACTION, ARIA } from '@/utils/constants';

/**
 * @description Note details page
 * @author Luca Cattide
 * @date 14/08/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function Details(): React.ReactNode {
  const { EDIT, DELETE } = ACTION;

  return (
    <section className="details flex w-full flex-1 flex-col pb-4 md:pb-12">
      <div className="details__note mx-4 mt-4 flex flex-1 flex-col md:mx-12 md:mt-8">
        <h2 className="note__title text-light-text dark:text-dark-text text-lg font-semibold md:text-xl">
          Sample Note
        </h2>
        <p className="note__body text-light-subtext dark:text-dark-subtext mt-2 text-base font-normal md:text-lg">
          This is a sample note content...
        </p>
        <div className="note__tags mt-4 h-6 w-20 rounded bg-gray-100 md:h-7 md:w-24 dark:bg-gray-700">
          <span className="tags__tag text-light-placeholder dark:text-dark-placeholder px-2 text-sm font-normal select-none md:text-base">
            Tag
          </span>
        </div>
      </div>
      <aside className="details__actions mx-4 mt-4 flex flex-col gap-4 md:mx-12 md:mt-8 md:flex-row">
        <h6 className="actions__title hidden">Actions</h6>
        <CustomButton
          ariaLabel={ARIA.EDIT}
          color="bg-blue-600 dark:bg-blue-500"
          text={EDIT}
          type="button"
        />
        <CustomButton
          ariaLabel={ARIA.DELETE}
          color="bg-red-600 dark:bg-red-500"
          text={DELETE}
          type="button"
        />
      </aside>
    </section>
  );
}
