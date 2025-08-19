import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import TQueryFilter from 'src/types/query.type';

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
  _id: {
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

export { setFilter, setError, setList };
