const dal = require('./../../00_DAL/index');
class User {

    static createTable() {

        return dal.runQuery(`create table Users(
                                Id 				int AUTO_INCREMENT PRIMARY KEY, 
                                FirstName 		nvarchar(16) NOT NULL, 
                                LastName 		nvarchar(16) NOT NULL,
                                UserName    	nvarchar(16) NOT NULL UNIQUE,
                                Age    			int check(Age>=5 and Age<=120),
                                UserPassword    nvarchar(64) NOT NULL,
                                UserLevel    	int check(UserLevel>0 and UserLevel<=3)
                                );
                            `);
    }

    static dropTable() {
        return dal.runQuery('drop table if exists Users;');
    }
   
}


module.exports = { User }