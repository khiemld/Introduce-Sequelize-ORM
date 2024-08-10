import jwt from 'jsonwebtoken';
import JWTUtils from '../../src/utils/jwt-utils';

describe('jwt utils', () => {
  it('should generate access token', () => {
    const payload = { email: 'test@gmail.com' };
    expect(JWTUtils.generateAccessToken(payload)).toEqual(expect.any(String));
  });
  it('it should return a refresh token', () => {
    const payload = { email: 'test@example.com' };
    expect(JWTUtils.generateRefreshToken(payload).toEqual(expect.any(String)));
  });
});
