import { TCustomFormField } from '@/types/components/CustomFormField';
import { NEW } from '@/utils/constants';
import { ChangeEvent } from 'react';

const CustomFormField = ({
  callback,
  id,
  isTextarea = false,
  label,
  placeholder,
  value,
}: TCustomFormField) => {
  const { CONTENT, TITLE } = NEW.FIELD;
  const classes =
    'text-light-text dark:text-dark-text placeholder:text-light-placeholder holder dark:placeholder:text-dark-placeholder h-full w-full rounded-lg bg-gray-100 p-2 text-base font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl md:p-4 md:text-lg dark:bg-gray-700';

  return (
    <div
      className={`costom-form-field mt-4 w-full ${isTextarea && 'flex flex-1 flex-col'}`}
    >
      <label className="custom-form-field__label sr-only" htmlFor={id}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          className={`custom-form-field__textarea flex-1 ${classes}`}
          id={id}
          onChange={(e) => callback(e, CONTENT)}
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <input
          className={`custom-form-field__input ${classes}`}
          id={id}
          onChange={(e) => callback(e, TITLE)}
          placeholder={placeholder}
          type="text"
          value={value}
        />
      )}
    </div>
  );
};

export default CustomFormField;
