const config = {
  domain: process.env.AUTH0_DOMAIN,
  audience: "task.api"
};


const { expressjwt } = require('express-jwt');
const jwksrsa = require('jwks-rsa');

exports.user = expressjwt({
  secret: jwksrsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.domain}/.well-known/jwks.json`
  }),
  audience: config.audience,
  issuer: `https://${config.domain}/`,
  algorithms: ["RS256"]
});






/*
const config = {
  domain: process.env.AUTH0_DOMAIN,
  audience: "task.api"
};

exports.user = require("express-jwt")({
  secret: require("jwks-rsa").expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.domain}/.well-known/jwks.json`
  }),
  audience: config.audience,
  issuer: `https://${config.domain}/`,
  algorithms: ["RS256"]
});
*/
