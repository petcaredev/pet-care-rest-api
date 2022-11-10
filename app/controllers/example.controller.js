const db = require('../models');

const Example = db.examples;

exports.index = (req, res) => {
  Example.findAll()
    .then((data) => {
      res.status(200).send({
        error: false,
        message: 'This is the list of all examples.',
        count: data.length,
        examples: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err.message || 'Some error occurred while retrieving examples.',
      });
    });
};

exports.store = (req, res) => {
  const { title, description } = req.body;

  const example = {
    title,
    description,
  };

  Example.create(example)
    .then((data) => {
      res.status(200).send({
        error: false,
        message: 'Example was created successfully.',
        example: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message:
          err.message || 'Some error occurred while creating the Example.',
      });
    });
};

exports.show = (req, res) => {
  const { id } = req.params;

  Example.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send({
          error: false,
          message: 'This is the example you requested.',
          example: data,
        });
      } else {
        res.status(404).send({
          error: true,
          message: `Cannot find Example with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || `Error retrieving Example with id = ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  Example.update(req.body, {
    where: { id },
  })
    .then((result) => {
      if (result == 1) {
        res.status(200).send({
          error: false,
          message: 'Example was updated successfully.',
        });
      } else {
        res.status(404).send({
          error: true,
          message: `Cannot update Example with id = ${id}. Maybe Example was not found!.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || `Error updating Example with id = ${id}`,
      });
    });
};

exports.destroy = (req, res) => {
  const { id } = req.params;

  Example.destroy({
    where: { id },
  })
    .then((result) => {
      if (result == 1) {
        res.status(200).send({
          error: false,
          message: 'Example was deleted successfully!',
        });
      } else {
        res.status(404).send({
          error: true,
          message: `Cannot delete Example with id = ${id}. Maybe Example was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: true,
        message: err.message || `Could not delete Example with id = ${id}`,
      });
    });
};
