const sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')

module.exports = sequelize.define('artist',{
    id:{
        field:'ArtistId',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name:{
        field:'Name',
        type:Sequelize.STRING
    }
},{
    timestamps:false
})
//  # Don't know why this code is not working START 

/* const Artist = sequelize.define('artist',{
    id:{
        field:'ArtistId',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name:{
        field:'Name',
        type:Sequelize.STRING
    }
},
{
    timestamps:false
})

Artist.associate = function (models) {
    Artist.hasMany(models.album,{
        foreignKey:'ArtistId'
    })
}

module.exports = Artist */

//  # Don't know why this code is not working END

