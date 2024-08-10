import jwt from 'jsonwebtoken';
import enviroment from '../config/enviroment';

export default class JWTUtils {
  static generateAccessToken(payload, options = {}) {
    const { expiresIn = '1d' } = options;
    return jwt.sign(payload, enviroment.jwtAccessTokenSecret, {
      expiresIn,
    });
  }
  static generateRefreshToken(payload) {
    return jwt.sign(payload, enviroment.jwtRefreshTokenSecret);
  }
  static verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, enviroment.jwtAccessTokenSecret);
  }
  static verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, enviroment.jwtRefreshTokenSecret);
  }
}
