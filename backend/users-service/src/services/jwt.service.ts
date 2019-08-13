import * as jwt from 'koa-jwt';
import * as jwksRsa from 'jwks-rsa';

import config, { AppConfig } from '../common/utils/config.loader';

const jwksUri = `https://storage-app.eu.auth0.com/.well-known/jwks.json`;
const audience = 'http://localhost:3017';
const issuer = `https://storage-app.eu.auth0.com/`;
// const jwksUri = `https://${config.get(AppConfig.AUTH0_DOMAIN)}/.well-known/jwks.json`;
// const audience = config.get(AppConfig.AUTH0_AUDIENCE);
// const issuer = `https://${config.get(AppConfig.AUTH0_DOMAIN)}/`;

export const checkJwt = () => jwt({
  secret: jwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.get(AppConfig.AUTH0_DOMAIN)}/.well-known/jwks.json`,
  }),
  audience: config.get(AppConfig.AUTH0_AUDIENCE),
  issuer: `https://${config.get(AppConfig.AUTH0_DOMAIN)}/`,
  algorithms: ["RS256"],
})

export const checkJwt2 = async () => {

  const client = jwksRsa.koaJwtSecret({
    jwksUri,
    cache: false,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  });

  // console.log(client)

  const result = jwt({
    audience,
    issuer,
    secret: client,
    algorithms: ["RS256"],
  });

  return result;

}
