const Album = require('../models/album');

module.exports = {
    index,
    new: newAlbum,
    create,
    show,
    delete: deleteOne,
    search
}

function search(req, res) {
  axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${req.body.artist}&api_key=${process.env.API_KEY}`)
  .then(response => {
      console.log(response.data)
      res.render('albums/new', {albums: response.data.data, user: req.user})
  })
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
    req.body.userId = req.user
    req.body.coverImageUrl = "/images/" + req.body.coverImageUrl
    const album = new Album(req.body);
    album.save(function(err) {
    if (err) return res.redirect('/albums/new');
    res.redirect('/albums')
//     res.redirect(`/albums/${movie._id}`);
  });
}

function show(req, res) {
  Album.findById(req.params.id, function(err, album){
    console.log(req.params.id)
    res.render('albums/show', {title: 'Album Details',album});
  })
  
}

function deleteOne(req, res) {
    console.log(req.params.id)
    Album.findByIdAndDelete(req.params.id, function(err, album){
      res.redirect('/albums')
    })
  }
