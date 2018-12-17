const Category = require('../models/Category');
const { validationResult } = require('express-validator/check');
const logger = require('../services/logger');

function validateResult(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return false;
  }
  return true;
}

module.exports = {
  create(req, res) {
    if(! validateResult(req, res)) return;

    Category.create({
      name: req.body.name,
      value: req.body.value
    }, (errors, category) => {
      if(errors) return res.status(500).json({ errors });

      logger.info(`Category created by ${req.user.id}`);
      res.status(201).json({ category });
    });
  },

  read(req, res) {
    Category.find({}, (err, categories) => {
      if(err) return res.status(500).json({ errors: 'Error to get categories' });
      if(! categories) return res.status(404).json({ errors: 'Categories not found'});

      logger.info(`Categories read by ${req.user.id}`);
      res.status(200).json({ categories });
    });
  },

  readById(req, res) {
    Category.findById(req.params.id, (err, category) => {
      if(err) return res.status(500).json({ errors: 'Error to get category' });
      if(! category) return res.status(404).json({ errors: 'Category not found' });

      logger.info(`Category ${req.param.id} read by ${req.user.id}`);
      res.status(200).json({ category });
    })
  },

  update(req, res) {
    if(req.body.value)
      return res.status(400).json({ errors: 'Not implemented to change value' });  //TODO

    Category.findByIdAndUpdate(req.params.id, req.body, err => {
      if (err) return res.status(500).json({ errors: 'Error to update category' });

      logger.info(`Category ${req.param.id} updated by ${req.user.id}`);
      res.status(201).json({ message: 'Category update successfully' });
    });
  },

  delete(req, res) {
    Category.findByIdAndDelete(req.params.id, err => {
      if(err) return res.status(500).json({ errors: 'Error to delete category' });

      logger.info(`Category ${req.param.id} deleted by ${req.user.id}`);
      res.status(201).json({ message: 'Category deleted successfully' });
    })
  }
}