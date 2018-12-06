var express = require('express');
var router = express.Router();
var object = require('../modules/objectsAndTypes');

router.get('/:id', (req, res, next) => {
  object.get('tags', req.params.id, 1)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.post('/save', (req, res, next) => {
  object.save([
    'nombre',
    'description'
  ], req.query, 'tags')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.put('/save/:id', (req, res, next) => {
  let values = req.query;
  values.id = req.params.id;
  object.update([
    'nombre',
    'description'
  ], values, 'tags')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.delete('/delete/:id', (req, res, next) => {
  object.delete('tags', req.params.id)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.get('/file/:id', (req, res, next) => {
  const includes = {
    id: [
      { model: models.Product, as: 'file' }
    ],
    all: [
      { model: models.Product, as: 'file' }
    ]
  };

  object.get('tags', req.params.id, 1, includes)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

module.exports = router;
