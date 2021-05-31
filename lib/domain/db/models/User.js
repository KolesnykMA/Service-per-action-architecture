const crypto = require('crypto');
const Sequelize = require('sequelize');
const BaseModel = require('./BaseModel.js');
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
    passwordHash: {
      type: DT.STRING,
      allowNull: true,
    },
    salt: {
      type: DT.STRING,
      allowNull: true,
    },
    password: {
      type : DT.VIRTUAL,
      set(password) {
        const salt = this.#generateSalt();
        this.setDataValue('salt', salt);
        this.setDataValue('passwordHash', this.#hashPassword(password, salt));
      }
    }
  };

  static initRelations(models) {
    // Associations here
    // this.hasOne(models.NewModel, {
    //   foreignKey: '',
    //   targetKey: '',
    //   onUpdate: '',
    // });
  }

  static buildUserQueryObject = (params) => {
    const {page, limit} = params;

    const userQueryObject = {
      where: {},
      include: [],
      order: [],
    }

    if (page && limit) {
      userQueryObject.limit = limit;
      userQueryObject.offset = (page - 1) * limit;
    }

    return userQueryObject;
  }

  static async getUsers(params = {}) {
    const userQueryObject = this.buildUserQueryObject(params);

    return this.findAll(userQueryObject)
  }

  static async getUser(id, params) {
    const userQueryObject = this.buildUserQueryObject(params);

    return this.findByPk(id, userQueryObject)
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

  checkPassword(password) {
    const hash = this.#hashPassword(password, this.salt);

    if (hash !== this.passwordHash) {
      throw new NotFound({
        code: 'NOT_FOUND',
        fields: {password},
        message: 'Invalid password',
      })
    }
  }

  #generateSalt() {
    const salt = crypto.randomBytes(SALT_LENGTH);

    return salt.toString('hex');
  }

  #hashPassword(password, salt) {
    const hash = crypto.scryptSync(password, salt, KEY_LENGTH);

    return hash.toString('hex');
  }
}

module.exports = User;
