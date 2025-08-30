const { Product } = require('../models');

/* GET /api/products */
exports.getAll = async (_req, res, next) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.json(products);
  } catch (err) { next(err); }
};

/* GET /api/products/:id */
exports.getOne = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) { next(err); }
};

/* POST /api/products */
exports.create = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { next(err); }
};
exports.create = async (req, res, next) => {
  try {
    const data = { ...req.body };

    if (req.file) data.imageUrl = '/uploads/products/' + req.file.filename;

    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

/* PUT /api/products/:id */
exports.update = async (req, res, next) => {
  try {
    const [rows, [product]] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (!rows) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) { next(err); }
};

/* DELETE /api/products/:id */
exports.remove = async (req, res, next) => {
  try {
    const rows = await Product.destroy({ where: { id: req.params.id } });
    if (!rows) return res.status(404).json({ message: 'Not found' });
    res.status(204).end();
  } catch (err) { next(err); }
};
