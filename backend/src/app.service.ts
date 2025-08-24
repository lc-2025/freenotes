import { Injectable } from '@nestjs/common';
import { ROOT } from './utilities/constants';

/**
 * @description Root service
 * The required decorator links metadata to class
 * by notifying Nest that it interacts with the expected controller
 * @author Luca Cattide
 * @date 17/08/2025
 * @export
 * @class AppService
 */
@Injectable()
export class AppService {
  /**
   * @description Root retrieve method
   * @author Luca Cattide
   * @date 24/08/2025
   * @returns {*}
   * @memberof AppService
   */
  getRoot() {
    return ROOT;
  }
}
