const dal = require('./../../00_DAL/index');
const { TriviaQueryCreator } = { ...require('./triviaQueryCreator') };

class TriviaQueryHandler {
  
    
    static async setTriviaAnswer(queryId,answer,userId){

    }

    static async getTriviaQuery(subject,userId) {
        let query;
    
        // TODO: check if we have a query in db


        //if we do not have in the DB a ready query - we generate a new query
        query=await TriviaQueryCreator.generateTriviaQuery(subject);


        return query;
    }

}

module.exports = { TriviaQueryHandler }