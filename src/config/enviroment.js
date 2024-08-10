export default {
  port: parseInt(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'production',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    '887330bdeb1aed103123468046125eea321790a92752a7dd4785d1acef85628f',
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    'd9876906c9b728c48da53e7e4fc2be023202732f3e2acd97a0fb995fdc4fa4ed',
};
