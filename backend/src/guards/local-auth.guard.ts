import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { STRATEGY } from 'src/utilities/constants';

/**
 * @description Authentication local guard
 * @author Luca Cattide
 * @date 25/08/2025
 * @class LocalAuthGuard
 * @extends {AuthGuard(STRATEGY.LOCAL)}
 */
@Injectable()
class LocalAuthGuard extends AuthGuard(STRATEGY.LOCAL) {}

export default LocalAuthGuard;
