const makeServiceRunner = require('../../../helpers/makeServiceRunner');

const UsersList = require('../../../../use-cases/main/users/UsersList');
const UserShow = require('../../../../use-cases/main/users/UserShow');
const UserCreate = require('../../../../use-cases/main/users/UserCreate');
const UserUpdate = require('../../../../use-cases/main/users/UserUpdate');
const UserDelete = require('../../../../use-cases/main/users/UserDelete');

const list = makeServiceRunner(
    UsersList,
    (req) => ({
        ...req.query,
    }),
    (_) => ({}),
);

const show = makeServiceRunner(
    UserShow,
    (req) => ({
        userId: req.params.userId,
    }),
    (_) => ({}),
);

const create = makeServiceRunner(
    UserCreate,
    (req) => ({
        ...req.body,
    }),
    (_) => ({}),
);

const update = makeServiceRunner(
    UserUpdate,
    (req) => ({
        ...req.body,
    }),
    (req) => (req.user),
);

const remove = makeServiceRunner(
    UserDelete,
    (req) => ({
        ...req.body,
    }),
    (req) => (req.user),
);

module.exports = {
    list,
    show,
    create,
    update,
    remove,
};
