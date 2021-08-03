const db = require("../models");
// create a collection in mongodb as stores
const Routes = db.routes;


// Create and Save a new store
exports.create = (req, res) => {
  // Validate request
  if (!req.body.shoproute) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //var id= getNextSequenceValue("storeid");
  // Create a document store details
  const shoproute = new Routes({
    //slno: req.body.slno,
    shoproute: req.body.shoproute
  });

  // Save store in the database
  shoproute
    .save(shoproute)
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
