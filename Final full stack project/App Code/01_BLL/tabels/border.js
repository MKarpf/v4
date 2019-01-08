const dal = require('./../../00_DAL/index');
const {DbHandler} = {...require('./../dbHandler')};

class Border{

    static createTable(){
         return dal.runQuery(`create table Borders(
                                Id                              int AUTO_INCREMENT PRIMARY KEY,
                                CountryId                       int NOT NULL,
                                BorderCountryId                 int NOT NULL,
                                FOREIGN KEY (CountryId)         REFERENCES Countries(Id),
                                FOREIGN KEY (BorderCountryId)   REFERENCES Countries(Id)
                                );`
        );
    }

    static dropTable(){
        return dal.runQuery('drop table if exists Borders;');
    }

    static async insertTable() {
        return dal.runQueryWithParam("INSERT INTO Borders (CountryId,BorderCountryId) VALUES ?", await Border.getValues());
    }

    static async getValues() {
        let countries = require('./countriesData.json');
        let arr=[];

        for(let country of countries)
        {
            let countryId= await dal.runQueryWithParam("select Id from Countries where CountryName like  ?", country.name)

            for(let border of country.borders){
                let borderId=await dal.runQueryWithParam("select Id from Countries where alpha3Code=?",border);

                arr.push([
                    dal.extractDbResult(countryId)[0].Id,
                    dal.extractDbResult(borderId)[0].Id
                 ]);
            }
        }
        
        return arr;
        
    }

}

module.exports={ Border}


