const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        mongoose.connect(process.env.DB_CNN);
        console.log("DB Online");
        

    } catch (error) {
        console.log(err);
        throw new Error("Error a la hora de inicializar la Base de Datos");
    }
}

module.exports = {
    dbConnection
}