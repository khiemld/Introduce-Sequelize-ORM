import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import environment from '../config/enviroment';
export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.RefreshToken = User.hasOne(models.RefreshToken);
      User.Roles = User.hasMany(models.Role);
    }

    static async hashPassword(password) {
      return bcrypt.hash(password, environment.saltRounds);
    }

    static async createNewUser({
      email,
      password,
      roles,
      username,
      firstName,
      lastName,
      refreshToken,
    }) {
      return sequelize.transaction(async () => {
        let rolesToSave = [];
        if (roles && Array.isArray(roles)) {
          rolesToSave = roles.map((role) => ({ role }));
        }
        await User.create(
          {
            email,
            password,
            username,
            firstName,
            lastName,
            Roles: rolesToSave,
            RefreshToken: {
              token: refreshToken,
            },
          },
          {
            include: [User.RefreshToken, User.Roles],
          }
        );
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email is invalid',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Username must be between 2 and 50 characters',
          },
        },
      },
      firstName: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [3, 50],
            msg: 'First name must be between 3 and 50 characters',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        unique: true,
        validate: {
          len: {
            args: [3, 50],
            msg: 'Last name must be between 3 and 50 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attribute: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
    }
  );

  User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.beforeSave(async (user, options) => {
    const hashedPassword = await User.hashPassword(this.password);
    user.password = hashedPassword;
  });

  return User;
};
