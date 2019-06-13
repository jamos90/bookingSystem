if(process.env.NODE_ENV) {
    module.exports = require('./prod.js');
}
else {
    module.exports = require('./dev.js');
}
