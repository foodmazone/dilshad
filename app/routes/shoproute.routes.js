module.exports = app => {
    const routes = require("../controllers/shoproute.controller.js");
  
    var router = require("express").Router();
  
    // Create a new store
    router.post("/", routes.create);

    app.use("/api/routes", router);
};
