const dal = require('./../00_DAL/index');
const { DbHandler } = { ...require('./dbHandler') };

const { TriviaQueryHandler } = { ...require('./trivia/triviaQueryHandler') };

function connectDb() {
    return dal.connect();
}

function createNewDB() {
   return DbHandler.createDatabase();
}

function getTriviaQuery(subject,userId) {
    return TriviaQueryHandler.getTriviaQuery(subject,userId);
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