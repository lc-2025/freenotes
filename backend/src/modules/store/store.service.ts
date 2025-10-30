import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import Store from 'ioredis';
import { ERROR, MESSAGE, STORE } from 'src/utilities/constants';
import { setError } from 'src/utilities/utils';

const { CREATE, FIND } = ERROR;
const { DELETE, DELETED, READ, REFRESH, REFRESH_SAVED } = MESSAGE;
const { CLIENT, PREFIX } = STORE;

/**
 * @description Store service class
 * Manages the JWT refresh token storage
 * @author Luca Cattide
 * @date 28/10/2025
 * @class StoreService
 */
@Injectable()
class StoreService {
  private readonly logger = new Logger(StoreService.name);

  /**
   * Creates an instance of StoreService.
   * @author Luca Cattide
   * @date 28/10/2025
   * @param {Store} store
   * @memberof StoreService
   */
  constructor(@Inject(CLIENT) private readonly store: Store) {}

  /**
   * @description User ID getter method
   * Retrieves the User ID by JWT refresh token
   * @author Luca Cattide
   * @date 28/10/2025
   * @param {string} token
   * @returns {*}  {(Promise<string | null | undefined>)}
   * @memberof StoreService
   */
  async getUserId(token: string): Promise<string | null | undefined> {
    try {
      this.logger.log(`${READ} the user...`);

      return await this.store.get(`${PREFIX}${token}`);
    } catch (error) {
      const message = `User ${FIND}`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Refresh token deletion method
   * @author Luca Cattide
   * @date 28/10/2025
   * @param {string} token
   * @returns {*}  {Promise<void>}
   * @memberof StoreService
   */
  async deleteRefreshToken(token: string): Promise<void> {
    const messageSuffix = 'refresh token';

    try {
      this.logger.log(`${DELETE} the ${messageSuffix}...`);

      await this.store.del(`${PREFIX}${token}`);

      this.logger.log(`${messageSuffix} ${DELETED}`);
    } catch (error) {
      const message = `${ERROR.DELETE} the ${messageSuffix}`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }

  /**
   * @description Refresh token setter method
   * @author Luca Cattide
   * @date 28/10/2025
   * @param {number} expiration
   * @param {string} token
   * @param {string} userId
   * @returns {*}  {Promise<void>}
   * @memberof StoreService
   */
  async setRefreshToken(
    expiration: number,
    token: string,
    userId: string,
  ): Promise<void> {
    try {
      this.logger.log(REFRESH);

      await this.store.set(`${PREFIX}${token}`, userId, 'PX', expiration);

      this.logger.log(REFRESH_SAVED);
    } catch (error) {
      const message = `${CREATE} the new refresh token`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }
}

export default StoreService;
