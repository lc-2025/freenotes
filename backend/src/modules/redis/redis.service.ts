import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { ERROR, MESSAGE, REDIS } from 'src/utilities/constants';
import { setError } from 'src/utilities/utils';

const { CREATE, FIND } = ERROR;
const { DELETE, DELETED, READ, REFRESH, REFRESH_SAVED } = MESSAGE;
const { CLIENT, PREFIX } = REDIS;

/**
 * @description Redis service class
 * Manages the JWT refresh token storage
 * @author Luca Cattide
 * @date 28/10/2025
 * @class RedisService
 */
@Injectable()
class RedisService {
  private readonly logger = new Logger(RedisService.name);

  /**
   * Creates an instance of RedisService.
   * @author Luca Cattide
   * @date 28/10/2025
   * @param {Redis} redis
   * @memberof RedisService
   */
  constructor(@Inject(CLIENT) private readonly redis: Redis) {}

  /**
   * @description User ID getter method
   * Retrieves the User ID by JWT refresh token
   * @author Luca Cattide
   * @date 28/10/2025
   * @param {string} token
   * @returns {*}  {(Promise<string | null | undefined>)}
   * @memberof RedisService
   */
  async getUserId(token: string): Promise<string | null | undefined> {
    try {
      this.logger.log(`${READ} the user...`);

      return await this.redis.get(`${PREFIX}${token}`);
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
   * @memberof RedisService
   */
  async deleteRefreshToken(token: string): Promise<void> {
    const messageSuffix = 'refresh token';

    try {
      this.logger.log(`${DELETE} the ${messageSuffix}...`);

      await this.redis.del(`${PREFIX}${token}`);

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
   * @memberof RedisService
   */
  async setRefreshToken(
    expiration: number,
    token: string,
    userId: string,
  ): Promise<void> {
    try {
      this.logger.log(REFRESH);

      await this.redis.set(`${PREFIX}${token}`, userId, 'PX', expiration);

      this.logger.log(REFRESH_SAVED);
    } catch (error) {
      const message = `${CREATE} the new refresh token`;

      this.logger.error(message);
      setError(HttpStatus.INTERNAL_SERVER_ERROR, message, error);
    }
  }
}

export default RedisService;
