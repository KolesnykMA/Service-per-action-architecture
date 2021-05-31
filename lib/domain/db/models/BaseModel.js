const Sequelize = require('sequelize');
const {NotUnique, NotFound, ForeignKeyError} = require('../../DomainError');

class BaseModel extends Sequelize.Model {
  static init(sequelize, options = {}) {
    super.init(this.schema, {...options, sequelize});
  }

  static initRelationsAndHooks(sequelize) {
    if (this.initRelations) this.initRelations(sequelize.models);
    if (this.initHooks) this.initHooks();
  }

  static async getByPk$(id) {
    const entity = await this.findByPk(id);

    if (!entity) {
      throw new NotFound({
        code: 'NOT_FOUND',
        fields: {resource: this, id},
        message: `No such ${this} resource with ${id}`
      });
    }

    return entity;
  }

  static async save(data, params = {}) {
    try {
      return await this.create(data, params);
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new NotUnique({
          code: 'NOT_UNIQUE',
          fields: error.fields,
          message: error.message,
        });
      }

      throw error;
    }
  }

  static async createFromList(list) {
    try {
      return await this.bulkCreate(list);
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new NotUnique({
          code: error.parent.code,
          fields: error.fields,
          message: error.message,
        });
      }

      throw error;
    }
  }

  static async updateByPk(id, data) {
    try {
      const entity = await this.getByPk$(id);
      return await entity.update(data);
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new NotUnique({
          code: 'NOT_UNIQUE',
          fields: error.fields,
          message: error.message,
        });
      }

      throw error;
    }
  }

  static async deleteByPk(id, params = {}) {
    try {
      const entity = await this.getByPk$(id);
      return await entity.destroy({
        ...params,
      });
    } catch (error) {
      if (error instanceof Sequelize.ForeignKeyConstraintError) {
        throw new ForeignKeyError({
          code: 'FK_ERROR',
          fields: error.fields,
          message: error.message,
        });
      }

      throw error;
    }
  }
}

module.exports = BaseModel;
