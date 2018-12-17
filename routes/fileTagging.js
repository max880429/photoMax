var express = require('express');
var router = express.Router();
var object = require('../modules/objectsAndTypes');

router.post('/tag', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  models.FileTag
    .findOne({ file: req.params.body.file, tag: req.params.body.tag })
    .then(fileTag => {
      if (!fileTag)
        models.FileTag.create({ file: req.params.body.file, tag: req.params.body.tag });

      models.File
        .findOne({
          where: { id: req.params.body.file },
          includes: [{ as: 'Tags', model: models.Tag }]
        })
        .then(file => {
          let response = [];
          if (file) {
            response.push({ command: 'message', type: "info", content: "tag agregado" });
            response.push({ command: 'model', type: 'file', content: file });
            res.json({ status: true, content: response });
          } else {
            response.push({ command: 'message', type: "error", content: "file no existe" });
            res.json({ status: false, content: response });
          }
        });
    });
});

router.delete('/tag', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  models.FileTag
    .findAll({ file: req.params.body.file, tag: req.params.body.tag })
    .then(fileTag => {
      if (fileTag)
        fileTag.destroy();

      models.File
        .findOne({
          where: { id: req.params.body.file },
          includes: [{ as: 'Tags', model: models.Tag }]
        })
        .then(file => {
          let response = [];
          if (file) {
            response.push({ command: 'message', type: "info", content: "tag eliminado" });
            response.push({ command: 'model', type: 'file', content: file });
            res.json({ status: true, content: response });
          } else {
            response.push({ command: 'message', type: "error", content: "file no existe" });
            res.json({ status: false, content: response });
          }
        });
    });
});

module.exports = router;
