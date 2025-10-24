type TCustomFormField = {
  callback: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ) => void;
  id: string;
  isTextarea?: boolean;
  label: string;
  placeholder: string;
  value: string;
};

export type { TCustomFormField };
