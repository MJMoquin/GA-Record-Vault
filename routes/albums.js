var express = require('express');
var router = express.Router();
const albumsCtrl = require('../controllers/albums');

router.get('/', isLoggedIn, albumsCtrl.index);
router.get('/new', isLoggedIn, albumsCtrl.new);
router.get('/:id', isLoggedIn, albumsCtrl.show);
router.post('/', isLoggedIn, albumsCtrl.create);
router.delete('/:id', isLoggedIn, albumsCtrl.delete);
router.post('/query', isLoggedIn, albumsCtrl.search);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;