const config = require('./utils/config.js');
const app = require('./app.js');
const { info } = require('console');

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`);
});
