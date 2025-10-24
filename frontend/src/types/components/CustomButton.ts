type TCustomButton = {
  ariaLabel: string;
  callback?: () => Promise<void>;
  color: string;
  disabled?: boolean;
  text: string;
  type: TCustomButtonType;
};

type TCustomButtonType = 'button' | 'submit';

export type { TCustomButton };
