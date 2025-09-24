type TUseStorage = {
  deleteStorages: (items: Array<string>) => void;
  getStorage: (item: string) => string | null;
  setStorage: (item: string, value: string) => void;
};

export type { TUseStorage };
