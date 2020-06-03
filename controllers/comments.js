const Album = require('../models/album');

module.exports = {
  create
};

function create(req, res) {
  req.body.user = req.user.name
  Album.findById(req.params.id, function(err, album) {
    album.comments.push(req.body);
    album.save(function(err) {
      res.redirect(`/albums/${album._id}`);
    });
  });
}