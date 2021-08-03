const dbConfig = require("../config/db.config.js");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
//db.url = dbConfig.url;

db.stores = require("./store.model.js")(mongoose);
db.user = require("./user.model");
db.role = require("./role.model");
db.routes = require("./shoproute.model")(mongoose);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;