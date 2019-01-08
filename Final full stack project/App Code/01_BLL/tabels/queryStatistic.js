const dal = require('./../../00_DAL/index');
class QueryStatistic {

    static createTable() {

        return dal.runQuery(`create table QueryStatistics(
                                Id                   int AUTO_INCREMENT PRIMARY KEY,
                                QuerySubject         nvarchar(255) NOT NULL,
                                QueryContent         nvarchar(255) NOT NULL,
                                OptionA              nvarchar(255) NOT NULL,
                                OptionB              nvarchar(255) NOT NULL,
                                OptionC              nvarchar(255) NOT NULL,
                                OptionD              nvarchar(255) NOT NULL,
                                OptionCorrect        nvarchar(255) NOT NULL,
                                SumOfAnswers         int NOT NULL,
                                SumOfRightAnswers    int NOT NULL
                                );
                            `);
    }

    static dropTable() {
        return dal.runQuery('drop table if exists QueryStatistics;');
    }
   
}


module.exports = { QueryStatistic }