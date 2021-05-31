module.exports = async function(db) {
    await db.models.User.bulkCreate([
        {
            userId: 'aa00f7f7-3b38-4034-a26d-8149a0eb2473',
            userName: 'alice',
            email: 'alice@gmail.com',
            phone: '0987655621',
            password: '123',
        },
    ])
};
