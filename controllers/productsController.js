const Product = require("../models/Products");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(200).json("product created successfully");
    } catch (error) {
      res.status(500).json("Failed to create the product");
    }
  },
};
