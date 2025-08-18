import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TNoteDecorator } from './types/note.types';

/**
 * Note custom decorator
 * Manages `param` and `body` properties
 * together
 */
const Note = createParamDecorator(
  (data: TNoteDecorator, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { param, body } = request;

    return { ...param, ...body };
  },
);

export { Note };
