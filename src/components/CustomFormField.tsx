import { TCustomFormField } from '@/types/CustomFormField';

const CustomFormField = ({
  id,
  height,
  label,
  placeholder,
  isTextarea = false,
}: TCustomFormField) => {
  return (
    <div
      className={`costom-form-field w-full ${height} mt-4`}
    >
      <label className="custom-form-field__label sr-only" htmlFor={id}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className={`custom-form-field__textarea text-light-placeholder dark:text-dark-placeholder h-full w-full rounded-lg bg-gray-100 px-2 pt-2 text-base font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl md:px-4 md:text-lg dark:bg-gray-700`}
          id={id}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`custom-form-field__input text-light-placeholder dark:text-dark-placeholder h-full w-full rounded-lg bg-gray-100 px-2 text-base font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl md:px-4 md:text-lg dark:bg-gray-700`}
          id={id}
          placeholder={placeholder}
          type="text"
        />
      )}
    </div>
  );
};

export default CustomFormField;
