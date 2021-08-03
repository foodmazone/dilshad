const db = require("../models");
// create a collection in mongodb as stores
const Store = db.stores;


// Create and Save a new store
exports.create = (req, res) => {
  // Validate request
  if (!req.body.slno) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //var id= getNextSequenceValue("storeid");
  // Create a document store details
  const store = new Store({
    //slno: req.body.slno,
    slno:req.body.slno,
    shopname: req.body.shopname,
    isactive: req.body.isactive ? req.body.isactive : false,
    isreg: req.body.isreg ? req.body.isreg : false,
    contact: req.body.contact,
    address: req.body.address,
    pincode: req.body.pincode,
    gst: req.body.gst,
    route: req.body.route
  });

  // Save store in the database
  store
    .save(store)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Store data base."
      });
    });
};

// Retrieve all stores from the database.
exports.findAll = (req, res) => {
  const shopname = req.query.shopname;
  var condition = shopname ? { shopname: { $regex: new RegExp(shopname), $options: "i" } } : {};

  Store.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stores."
      });
    });
};

// Retrieve all stores from the database based on route.
exports.findRoute = (req, res) => {
  const route = req.query.route;
  var condition = route ? { route: { $regex: new RegExp(route), $options: "i" } } : {};

  Store.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stores."
      });
    });
};

// Find a single store with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Store.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found store with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving store with id=" + id });
    });
};

// Update a store by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Store.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update store with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "store was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating store with id=" + id
      });
    });
};

// Delete a store with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Store.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete stores with id=${id}. Maybe store was not found!`
        });
      } else {
        res.send({
          message: "store was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete store with id=" + id
      });
    });
};

// Delete all store from the database.
exports.deleteAll = (req, res) => {
  Store.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} store were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all store."
      });
    });
};

// Find all  active
exports.findAllActive = (req, res) => {
  Store.find({ isactive: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stores."
      });
    });
};
