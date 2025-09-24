import { TCustomFormField } from '@/types/components/CustomFormField';

const CustomFormField = ({
  id,
  label,
  placeholder,
  isTextarea = false,
}: TCustomFormField) => {
  return (
    <div
      className={`costom-form-field mt-4 w-full ${isTextarea && 'flex flex-1 flex-col'}`}
    >
      <label className="custom-form-field__label sr-only" htmlFor={id}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className={`custom-form-field__textarea text-light-text dark:text-dark-text placeholder:text-light-placeholder holder dark:placeholder:text-dark-placeholder h-full w-full flex-1 rounded-lg bg-gray-100 p-2 text-base font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl md:p-4 md:text-lg dark:bg-gray-700`}
          id={id}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`custom-form-field__input text-light-text dark:text-dark-text placeholder:text-light-placeholder holder dark:placeholder:text-dark-placeholder h-full w-full rounded-lg bg-gray-100 p-2 text-base font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl md:p-4 md:text-lg dark:bg-gray-700`}
          id={id}
          placeholder={placeholder}
          type="text"
        />
      )}
    </div>
  );
};

export default CustomFormField;
