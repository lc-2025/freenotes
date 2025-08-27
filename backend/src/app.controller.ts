import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ROOT } from './utilities/constants';
import Public from './decorators/public.decorator';

/**
 * @description Root controller
 * The required decorator links metadata to class
 * by binding requests to the correspondent controller.
 * The param defines the route prefix.
 * CRUD actions are defined by decorators as well
 * @author Luca Cattide
 * @date 17/08/2025
 * @export
 * @class AppController
 */
@Controller()
export class AppController {
  /**
   * Creates an instance of AppController.
   * @author Luca Cattide
   * @date 20/08/2025
   * @param {AppService} appService
   * @memberof AppController
   */
  constructor(private readonly appService: AppService) {}

  /**
   * @description Root endpoint
   * @author Luca Cattide
   * @date 24/08/2025
   * @returns {*}  {string}
   * @memberof AppController
   */
  @Public()
  @Get()
  @ApiOkResponse({ description: ROOT })
  getRoot(): string {
    return this.appService.getRoot();
  }
}
