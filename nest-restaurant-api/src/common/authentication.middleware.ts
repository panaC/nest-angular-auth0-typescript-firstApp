import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://misclp.eu.auth0.com/.well-known/jwks.json',
        }),

        audience: 'http://localhost:3000',
        issuer: 'https://misclp.eu.auth0.com/',
        algorithm: 'RS256',
      })(req, res, (err) => {
        if (err) {
          const status = err.status || 500;
          const message = err.message || 'Sorry, we were unable to process your request.';
          return res.status(status).send({
            message,
          });
        }
        next();
      });
    };
  }
}


// http://localhost:4200/login?code=d0uiCP_-VSgJ9e7u&state=STATE%3Fprompt%3Dnone