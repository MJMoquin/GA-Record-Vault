var express = require('express');
var router = express.Router();
const albumsCtrl = require('../controllers/albums');

router.get('/', albumsCtrl.index);
router.get('/new', albumsCtrl.new);
router.get('/:id', albumsCtrl.show);
router.post('/', albumsCtrl.create);
router.delete('/:id', albumsCtrl.delete);


module.exports = router;