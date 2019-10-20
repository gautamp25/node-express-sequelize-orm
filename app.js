const express = require('express')
const bodyParser = require('body-parser')
const Playlist = require('./models/playlist')
const Artist = require('./models/artist')
const Album = require('./models/album')
const Track = require('./models/track')
const Genre = require('./models/genres')
const Sequelize = require('sequelize')

const app = express()
const port = process.env.port || 3000
const { Op } = Sequelize;
app.use(bodyParser.json())
Artist.hasMany(Album,{
    foreignKey:'ArtistId'
})

Album.belongsTo(Artist,{
    foreignKey:'ArtistId'
})

Playlist.belongsToMany(Track,{
    through:'playlist_track',
    foreignKey:'PlaylistId',
    timestamps:false
})

Track.belongsToMany(Playlist,{
    through:'playlist_track',
    foreignKey:'TrackId',
    timestamps:false
})

Genre.hasMany(Track,{
    foreignKey:'GenreId'
})

//  Default Page
app.get('/', (req,res)=>{
    res.send('<h1>Welcome to build API in <i>Node.js</i> with <i>Express</i> and <i>Sequelize ORM</i>!!!</h1>')
}) 

// create artist
app.post('/api/artist', async (req, res) => {
    const artist = await Artist.create({
        name: req.body.name
    })
    if (artist){
        res.json(artist)
    }else{
        console.log(errors)
        res.json(errors.message)
        
    }
}) 

// delete playlist
app.delete('/api/playlist/:id',(req, res) => {
    let { id } = req.params
    Playlist.findByPk(id).then((playlist) => {
        if(playlist){
            return playlist.setTracks([]).then(() =>{
                return playlist.destroy()
            })
        }else{
            return Promise.reject()
        }
    }).then(()=>{
        res.status(204).send('Record deleted..')
    },() =>{
        res.status(404).send()
    })
})

//  get Genre
app.get('/api/genres/:id', async (req, res) =>{
    let { id } = req.params
    const genre = await Genre.findByPk(id,{include:[Track]})
    if(genre){
        res.json(genre)
    }
})

// get all playlists
app.get('/api/playlists',async (req,res)=>{
    //  filtering the query string
    let filter ={}
    let { q } = req.query
    if(q){
        filter = {
            where:{
                name:{
                    [Op.like]:`${q}%`
                }
            }
        }
    }
    const playlists = await Playlist.findAll(filter)
        res.json(playlists);
})

// get playlist
app.get('/api/playlist/:id', async (req,res) => {
    let { id } = req.params
    const playlist = await Playlist.findByPk(id,{
        include:[Track]
    })
    if (playlist){
        res.json(playlist)
    }else{
        res.status(404).send('No record found..!')
    }
})

// get track
app.get('/api/track/:id', async (req,res) => {
    let { id } = req.params
    const track = await Track.findByPk(id,{
        include:[Playlist]
    })
    if (track){
        res.json(track)
    }else{
        res.status(404).send('No record found..!')
    }
})

// get artist with album details 
app.get('/api/artist/:id', async (req,res) => {
    let { id } = req.params
    const artist = await Artist.findByPk(id,{ include : [Album]})
    if (artist){
        res.json(artist)
    }else{
        res.status(404).send('No record found..!')
    }
})

// get album with artist details 
app.get('/api/album/:id', async (req,res) => {
    let { id } = req.params
    const album = await Album.findByPk(id,{ include : [Artist]})
    if (album){
        res.json(album)
    }else{
        res.status(404).send('No record found..!')
    }
})


app.listen(port,()=>{
    console.log(`Listening to request on http://localhost:${port}` )
})