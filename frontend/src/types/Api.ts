type TApiResponseData = {
  data?: Record<string, string>;
};

type TApiResponseError = {
  error?: Error;
};

type TApiResponse = TApiResponseData & TApiResponseError;

export type { TApiResponse };
