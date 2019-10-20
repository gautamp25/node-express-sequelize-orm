const sequelize = require('../database/sequelize')
const Sequelize = require('sequelize')

module.exports = sequelize.define('artist',{
    id: {
        field:'ArtistId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'Name',
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "Name is required."
            },
            isAlpha: {
                args: true,
                msg: "Name must contains only letters. "
            },
            len: {
                args: [2,10],
                msg: "Name must be between 2 to 10 characters. "
            }
        }
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

