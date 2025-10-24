import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { Request } from 'express';
import TQueryFilter from 'src/types/query.type';
import { TOKEN } from './constants';

/**
 * @description Cookie JWT token extraction helper
 * @author Luca Cattide
 * @date 27/09/2025
 * @param {Request} request
 * @returns {*}  {(string | null)}
 */
const extractCookieToken = (request: Request): string | null => {
  const cookies = request.headers.cookie?.split('; ');
  let token: string | null = null;

  if (cookies && cookies.length) {
    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith(`${TOKEN.REFRESH}=`),
    );

    if (refreshTokenCookie) {
      token = refreshTokenCookie.split('=')[1];
    }
  }

  return token;
};

/**
 * @description Route exception error setter
 * @author Luca Cattide
 * @date 17/08/2025
 * @param {HttpStatus} status
 * @param {string} message
 * @param {*} [error]
 */
const setError = (status: HttpStatus, message: string, error?: any): void => {
  throw new HttpException(
    {
      status,
      error: message,
    },
    status,
    error ? { cause: error } : undefined,
  );
};

/**
 * @description Query filter setter
 * @author Luca Cattide
 * @date 17/08/2025
 * @param {Array<string>} ids
 * @returns {*}  {TQueryFilter}
 */
const setFilter = (ids: Array<string>): TQueryFilter => ({
  id: {
    $in: `${ids.map((id: string) => new mongoose.Types.ObjectId(id))}`,
  },
});

/**
 * @description Array to string conversion handler
 * @author Luca Cattide
 * @date 19/08/2025
 * @param {Array<string>} ids
 * @returns {*}  {string}
 */
const setList = (ids: Array<string>): string => ids.join(', ');

export { extractCookieToken, setError, setFilter, setList };
