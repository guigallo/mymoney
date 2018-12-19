const validate = require('../middlewares/validateRequest');
const logger = require('../services/logger');


class Controller {
  
  constructor(req, res, name, Model, properties) {
    this.request = req;
    this.response = res;
    this.name = name;
    this.Model = Model;
    this.properties = properties
  };

  _log(action, newId = undefined) {
    let newid = (newId) ? ` ${newId} ` : ' ';
    logger.info(`${this.name}${newid}${action} by ${this.request.user.id}`);
  }

  create() {
    if(! validate(this.request, this.response)) return;

    let model = {};
    this.properties.forEach(property => {
      if(this.request.body[property])
        model[property] = this.request.body[property]
    });

    this.Model.create(model, (errors, created) => {
      if(errors) return this.response.status(500).json({ errors });

      this._log('created');
      this.response.status(201).json({ result: created });
    });
  }

  read() {
    this.Model.find({}, (err, read) => {
      if(err) return this.response.status(500).json({ errors: `Error to get ${this.name}` });
      if(! read) return this.response.status(404).json({ errors: 'Nothing to return'});

      this._log('read');
      this.response.status(200).json({ result: read });
    });
  }

  readById() {
    this.Model.findById(this.request.params.id, (err, readById) => {
      if(! readById) return this.response.status(404).json({ errors: `${this.name} not found` });

      this._log('read');
      this.response.status(200).json({ result: readById });
    });
  }

  update() {
    this.Model.findByIdAndUpdate(this.request.params.id, this.request.body, err => {
      if (err) return this.response.status(500).json({ errors: `${this.name} not found` });

      this._log('read', this.request.params.id);
      this.response.status(201).json({ message: `${this.name} update successfully` });
    });
  }

  delete() {
    this.Model.findByIdAndDelete(this.request.params.id, err => {
      if(err) return this.response.status(500).json({ errors: `Error to delete ${this.name}` });

      this._log('deleted', this.request.params.id);
      this.response.status(201).json({ message: `${this.name} deleted successfully` });
    });
  }
}

module.exports = Controller;