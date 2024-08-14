import JWTUtils from '../../src/utils/jwt-ultils';

describe('jwt utils', () => {
  it('should return an access token', () => {
    const payload = { email: 'test@example.com' };
    expect(JWTUtils.generateAccessToken(payload)).toEqual(expect.any(String));
  });

  it('should return a refresh token', () => {
    const payload = { email: 'test@example.com' };
    expect(JWTUtils.generateRefreshToken(payload)).toEqual(expect.any(String));
  });
  it('should verify that the access token is valid', () => {
    const payload = { email: 'test@example.com' };
    const jwt = JWTUtils.generateAccessToken(payload);
    expect(JWTUtils.verifyAccessToken(jwt)).toEqual(
      expect.objectContaining(payload)
    );
  });
  it('should verify that the refresh token is valid', () => {
    const payload = { email: 'test@example.com' };
    const jwt = JWTUtils.generateRefreshToken(payload);
    expect(JWTUtils.verifyRefreshToken(jwt)).toEqual(
      expect.objectContaining(payload)
    );
  });
  it('should throw an error if the access token is invalid', () => {
    const jwt = 'invalid-jwt';
    expect(() => JWTUtils.verifyAccessToken(jwt)).toThrow(
      jwt.JsonWebTokenError
    );
  });
  it('should throw an error if the refresh token is invalid', () => {
    const jwt = 'invalid-jwt';
    expect(() => JWTUtils.verifyRefreshToken(jwt)).toThrow(
      jwt.JsonWebTokenError
    );
  });
});
