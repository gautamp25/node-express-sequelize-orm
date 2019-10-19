const express = require('express')
const Playlist = require('./models/playlist')
const Artist = require('./models/artist')
const Album = require('./models/album')
const Sequelize = require('sequelize')

const app = express()
const port = process.env.port || 3000
const { Op } = Sequelize;

Artist.hasMany(Album,{
    foreignKey:'ArtistId'
})

Album.belongsTo(Artist,{
    foreignKey:'ArtistId'
})

//  Default Page
app.get('/', (req,res)=>{
    res.send("Welcome to Sequelize ORM!!!")
})

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

app.get('/api/playlist/:id', async (req,res) => {
    let { id } = req.params
    const playlist = await Playlist.findByPk(id)
    if (playlist){
        res.json(playlist)
    }else{
        res.status(404).send('No record found..!')
    }
})

app.get('/api/artist/:id', async (req,res) => {
    let { id } = req.params
    const artist = await Artist.findByPk(id,{ include : [Album]})
    if (artist){
        res.json(artist)
    }else{
        res.status(404).send('No record found..!')
    }
})


app.listen(port,()=>{
    console.log(`Listening to request on http://localhost:${port}` )
})