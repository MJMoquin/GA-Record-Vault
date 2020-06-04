const Album = require('../models/album');
const axios = require('axios');

module.exports = {
    index,
    new: newAlbum,
    create,
    show,
    delete: deleteOne,
    search
}

function search(req, res) {
  artistName = req.body.artistName
  axios.get(`http://ws.audioscrobbler.com/2.0/?api_key=${process.env.API_KEY}&method=album.search&album=${req.body.query}&format=json`)
  .then(response => {
      console.log(response.data)
      res.render('albums/new', {title: "Search for Album", albums: response.data.results.albummatches.album, artistName, user: req.user})
  })
}

function index(req, res) {
    Album.find({}, function(err, albums) {
      res.render('albums/index', { title: 'My Albums', albums });
    });
}

function newAlbum(req, res) {
    res.render('albums/new', {title: 'Add New Album', albums: null})
}

// function create(req, res) {
//   req.body.userId = req.user
//   req.body.coverImageUrl = "/images/" + req.body.coverImageUrl
//   const album = new Album(req.body);
//   album.save(function(err) {
//   if (err) return res.redirect('/albums/new');
//   res.redirect('/albums')
//   res.redirect(`/albums/${movie._id}`);
//   });
// }

function show(req, res) {
  Album.findById(req.params.id, function(err, album){
    console.log(req.params.id)
    res.render('albums/show', {title: 'Album Details',album});
    console.log(req.user + "<== user")
    console.log(album + "<== album")
  })
  
  
}

function deleteOne(req, res) {
    console.log(req.params.id)
    Album.findByIdAndDelete(req.params.id, function(err, album){
      res.redirect('/albums')
    })
  }


function create(req, res) {
  req.body.userId = req.user
  axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${process.env.API_KEY}&mbid=${req.body.mbid}&format=json`)
  .then(response => {
    req.body.albumDetails = response.data.album
    console.log(req.body)
    const album = new Album(req.body);
    album.save(function(err) {
    if (err) return res.redirect('/albums/new');
    res.redirect('/albums')
    })
  })
}