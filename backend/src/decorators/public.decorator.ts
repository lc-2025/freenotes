import { SetMetadata } from '@nestjs/common';
import { DECORATOR } from 'src/utilities/constants';

/**
 * @description Public decorator
 * @author Luca Cattide
 * @date 26/08/2025
 */
const Public = () => SetMetadata(DECORATOR.PUBLIC, true);

export default Public;
