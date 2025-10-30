type TUseStore = {
  getAccessToken: (email: string) => Promise<string | null>;
  setAccessToken: (email: string, token: string) => Promise<void>;
};

export type { TUseStore };
