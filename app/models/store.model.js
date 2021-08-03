module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      slno: String,
      shopname: String,
      isactive: Boolean,
      isreg : Boolean,
      contact: Number,
      address: String,
      pincode: Number,
      gst: String,
      route: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const store = mongoose.model("store", schema);
  return store;
};
