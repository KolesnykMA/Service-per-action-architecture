const crypto = require('crypto');
const Sequelize = require('sequelize');
const BaseModel = require('../BaseModel.js');
const {NotFound} = require('../../DomainError');

const DT = Sequelize.DataTypes;

const SALT_LENGTH = 16;
const KEY_LENGTH  = 64;

class User extends BaseModel {
  static schema = {
    userId: {
      type: DT.UUID,
      defaultValue: DT.UUIDV4,
      primaryKey: true
    },
    userType: {
      type: DT.ENUM('customer', 'seller'),
      allowNull: false,
    },
    userStatus: {
      type: DT.ENUM('active', 'disabled'),
      allowNull: false,
      defaultValue: 'active',
    },
    isActive: {
      type: DT.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    userName: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DT.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DT.STRING,
      allowNull: false,
      unique: true
    },
    termsOfServicesAgreementsAccepted: {
      type: DT.BOOLEAN,
      allowNull: false,
    },
    privacyPolicyAgreementsAccepted: {
      type: DT.BOOLEAN,
      allowNull: false,
    },
    marketingAgreementsAccepted: {
      type: DT.BOOLEAN,
      allowNull: true,
    },
    snsToken: {
      type: DT.STRING,
      allowNull: true,
      unique: true,
    },
    snsType: {
      type: DT.STRING,
      allowNull: true,
      defaultValue: null,
    },
    passwordHash: {
      type: DT.STRING,
      allowNull: true,
    },
    salt: {
      type: DT.STRING,
      allowNull: true,
    },
    followers: {
      type: DT.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    followings: {
      type: DT.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    experience: {
      type: DT.INTEGER,
      defaultValue: 1000,
      allowNull: true,
    },
    level: {
      type: DT.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    password: {
      type : DT.VIRTUAL,
      set(password) {
        const salt = this._generateSalt();
        this.setDataValue('salt', salt);
        this.setDataValue('passwordHash', this._hashPassword(password, salt));
      }
    }
  };

  static initRelations(models) {
    // this.hasOne(models.SellerProfile, {
    //   foreignKey: 'userId',
    //   targetKey: 'userId',
    //   onUpdate: 'CASCADE',
    // });
  }

  static getUserBySnsTokenAndSnsType(snsToken, snsType) {
    return this.findOne({
      where: {
        snsToken,
        snsType,
      },
    });
  }

  static async getUserByUserName(userName) {
    return this.findOne({
      where: {
        userName,
      },
    });
  }

  static async getUserByEmail(email) {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  static async getUserByEmail$(email) {
    const entity = await this.findOne({
      where: {
        email,
      },
    });

    if (!entity) {
      throw new NotFound({
        code: 'NOT_FOUND',
        fields: {email},
        message: 'User with email does not exist'
      });
    }

    return entity;
  }

  static async getUserByPhone(phone) {
    return this.findOne({
      where: {
        phone,
      },
    });
  }

  static async getUserByPhone$(phone) {
    const entity = await this.findOne({
      where: {
        phone,
      },
    });

    if (!entity) {
      throw new NotFound({
        code: 'NOT_FOUND',
        fields: {phone},
        message: 'User with phone does not exist'
      });
    }

    return entity;
  }

  static async getByTokenAndType$(snsToken, snsType) {
    const entity = await this.findOne({
      where: {
        snsToken,
        snsType,
      },
    });

    if (!entity) {
      throw new NotFound({
        code: 'NOT_FOUND',
        fields: {snsToken, snsType},
        message: 'User with phone does not exist'
      });
    }

    return entity;
  }

  checkPassword(password) {
    const hash = this._hashPassword(password, this.salt);

    if (hash !== this.passwordHash) {
      throw new NotFound({
        code: 'NOT_FOUND',
        fields: {password},
        message: 'Invalid password',
      })
    }
  }

  _generateSalt() {
    const salt = crypto.randomBytes(SALT_LENGTH);

    return salt.toString('hex');
  }

  _hashPassword(password, salt) {
    const hash = crypto.scryptSync(password, salt, KEY_LENGTH);

    return hash.toString('hex');
  }
}

module.exports = User;
