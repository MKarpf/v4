const dal = require('./../../00_DAL/index');
class QueryPerUser {

    static createTable() {

        return dal.runQuery(`create table QueryPerUser(
                                Id                   int AUTO_INCREMENT PRIMARY KEY,
                                QueryId              int NOT NULL,
                                UserId               int NOT NULL,
                                IsCorrect            bit NOT NULL,                    
                                FOREIGN KEY         (UserId) REFERENCES Users(Id),
                                FOREIGN KEY         (QueryId) REFERENCES QueryStatistics(Id)
                                );
                            `);
    }

    static dropTable() {
        return dal.runQuery('drop table if exists QueryPerUser;');
    }
   
}


module.exports = { QueryPerUser }