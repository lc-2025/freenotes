import CustomFormField from '@/components/CustomFormField';
import CustomButton from '@/components/CustomButton';

/**
 * @description New note page
 * @author Luca Cattide
 * @date 14/08/2025
 * @export
 * @returns {*}  {React.ReactNode}
 */
export default function New(): React.ReactNode {
  const fields = [
    {
      id: 'note-title',
      height: 'h-10 md:h-12',
      label: 'Note Title',
      placeholder: 'Note Title',
    },
    {
      id: 'note-content',
      height: 'h-[300px] md:h-[480px]',
      label: 'Note Content',
      placeholder: 'Note Content',
      isTextarea: true,
    },
  ];

  return (
    <section className="new w-full">
      <h6 className="new__title hidden">New</h6>
      <div className="new__container mx-4 mt-4 md:mx-12 md:mt-8">
        {fields.map((field, i) => (
          <CustomFormField key={crypto.randomUUID() + i} {...field} />
        ))}
      </div>
      <aside className="new__action mx-4 mt-4 md:mx-12 md:mt-8">
        <h6 className="action__title hidden">New</h6>
        <CustomButton
          ariaLabel="Save note"
          color="bg-blue-600 dark:bg-blue-500"
          text="Save"
        />
      </aside>
    </section>
  );
}
