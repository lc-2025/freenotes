import CustomFormField from '@/components/Layout/CustomFormField';
import CustomButton from '@/components/Layout/CustomButton';
import { NOTE, SECTION } from '@/utils/constants';

/**
 * @description New note page
 * @author Luca Cattide
 * @date 14/08/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function New(): React.ReactNode {
  const { TITLE, CONTENT } = NOTE.LABEL;
  const { NEW } = SECTION;
  const fields = [
    {
      id: 'note-title',
      label: TITLE,
      placeholder: TITLE,
    },
    {
      id: 'note-content',
      label: CONTENT,
      placeholder: CONTENT,
      isTextarea: true,
    },
  ];

  return (
    <section className="new flex w-full flex-1 flex-col pb-4 md:pb-12">
      <h6 className="new__title hidden">{NEW}</h6>
      <div className="new__container mx-4 mt-4 flex flex-1 flex-col md:mx-12 md:mt-8">
        {fields.map((field, i) => (
          <CustomFormField key={crypto.randomUUID() + i} {...field} />
        ))}
      </div>
      <aside className="new__action mx-4 mt-4 md:mx-12 md:mt-8">
        <h6 className="action__title hidden">{NEW}</h6>
        <CustomButton
          ariaLabel="Save note"
          color="bg-blue-600 dark:bg-blue-500"
          text="Save"
          type="button"
        />
      </aside>
    </section>
  );
}
