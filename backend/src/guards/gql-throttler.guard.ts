import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

// TODO: See https://docs.nestjs.com/security/rate-limiting#graphql

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  /* getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();

    return { req: ctx.req, res: ctx.res };
  } */
}
