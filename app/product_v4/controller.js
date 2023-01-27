const Product = require('./model');
const path = require('path');
const fs = require('fs');

const index = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const view = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    Product.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;
  let values = {
    name: name,
    price: price,
    stock: stock,
    status: status,
  };
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    await fs.renameSync(image.path, target, (err) => {
      if (err) throw err;
    });
    values.image_url = `http://localhost:3000/public/${image.originalname}`;
  }
  Product.findByIdAndUpdate(id, values)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const destroy = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
