module.exports = app => {
  const stores = require("../controllers/store.controller.js");

  var router = require("express").Router();

  // Create a new store
  router.post("/", stores.create);

  // Retrieve all store
  router.get("/", stores.findAll);

  // Retrieve all store
  router.get("/route", stores.findRoute);

  // Retrieve all published Tutorials
  router.get("/active", stores.findAllActive);

  // Retrieve a single store with id
  router.get("/:id", stores.findOne);

  // Update a store with ids
  router.put("/:id", stores.update);

  // Delete a store with id
  router.delete("/:id", stores.delete);

  // Create a new store
  router.delete("/", stores.deleteAll);

  app.use("/api/tutorials", router);
};
