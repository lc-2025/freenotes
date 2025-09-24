type TCustomButton = {
  ariaLabel: string;
  color: string;
  disabled?: boolean;
  text: string;
  type: TCustomButtonType;
};

type TCustomButtonType = 'button' | 'submit';

export type { TCustomButton };
