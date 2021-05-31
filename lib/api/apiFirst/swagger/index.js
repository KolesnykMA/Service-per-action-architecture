const express = require('express');
const swaggerUi = require('swagger-ui-express');

const webRouter = express();

webRouter.use('/', swaggerUi.serve, (req, res) => {
    const html = swaggerUi.generateHTML(require('./index.json'));
    res.send(html);
});

module.exports = webRouter;