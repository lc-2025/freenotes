import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HEADER, PROTOCOL } from 'src/utilities/constants';

@Injectable()
class SslMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { HTTPS } = PROTOCOL;
    const { headers, url } = req;
    const { host } = req.headers;

    // Protocol check
    if (process.env.NODE_ENV === 'production' && headers[HEADER.XFP] !== HTTPS) {
      return res.redirect(`${HTTPS}://${host}${url}`);
    }

    next();
  }
}

export default SslMiddleware;
