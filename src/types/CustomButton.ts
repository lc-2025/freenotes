type TCustomButton = {
  ariaLabel: string;
  color: string;
  text: string;
  type: TCustomButtonType;
};

type TCustomButtonType = 'button' | 'submit';

export type { TCustomButton };
