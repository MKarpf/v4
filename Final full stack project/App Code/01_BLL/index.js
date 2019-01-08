const dal = require('./../00_DAL/index');
const { DbHandler } = { ...require('./dbHandler') };

const { TriviaQueryCreator } = { ...require('./triviaQueryCreator') };

function connectDb() {
    return dal.connect();
}

function createNewDB() {
   return DbHandler.createDatabase();
}

function getTriviaQuery(subject) {
    return TriviaQueryCreator.triviaQuery(subject);
}

function dropTables() {
    return DbHandler.dropAllTables();
}

module.exports = {
    connectDb,
    createNewDB,
    dropTables,
    getTriviaQuery
}