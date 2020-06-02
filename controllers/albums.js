const Album = require('../models/album');

module.exports = {
    index,
    new: newAlbum,
    create,
    show,
    delete: deleteOne
}

function index(req, res) {
    Album.find({}, function(err, albums) {
      res.render('albums/index', { title: 'My Albums', albums });
    });
}

function newAlbum(req, res) {
    res.render('albums/new', {title: 'Add New Album'})
}

function create(req, res) {
    req.body.coverImageUrl = "/images/" + req.body.coverImageUrl
    console.log(req.body)
    const album = new Album(req.body);
    album.save(function(err) {
    if (err) return res.redirect('/albums/new');
    console.log(album);
    res.redirect('/albums')
//     res.redirect(`/albums/${movie._id}`);
  });
}

function show(req, res) {
  Album.findById(req.params.id, function(err, album){
    console.log(req.params.id)
    res.render('albums/show', {title: 'Album Detail',album});
  })
  
}

function deleteOne(req, res) {
    console.log(req.params.id)
    Album.findByIdAndDelete(req.params.id, function(err, album){
      res.redirect('/albums')
    })
  }
