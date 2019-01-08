const dal = require('./../00_DAL/index');
const { Country } = { ...require('./tabels/country') };
const { DbHandler } = { ...require('./dbHandler') };

class TriviaQueryCreator {

    static randomCountriesId() {
        let arr = new Array(4);
        for (let i = 0; i < arr.length; i++)
            arr[i] = Math.floor(Math.random() * (Country.lastCountryId - 1) + 1);

        return arr;
    }

    static async triviaQuery(subject) {
        let randomIdList = TriviaQueryCreator.randomCountriesId();

        let countryTableCol = await DbHandler.getTableCols("Countries");
        let CurrencyTableCol = await DbHandler.getTableCols("Countries");
        let languagesTableCol = await DbHandler.getTableCols("Languages");

        let sqlQuery;

        if (countryTableCol.find(e => e == subject)) {
            sqlQuery = `SELECT ${subject},CountryName 
                        FROM Countries 
                        WHERE Id IN (${randomIdList.join(",")})`;
        }
        else if (CurrencyTableCol.find(e => e == subject)) {
            sqlQuery = `SELECT Currencies.${subject}, Countries.CountryName 
                        FROM Countries join Currencies join CurrencyPerCountry 
                        ON CurrencyPerCountry.CurrencyId=Currencies.Id 
                        AND CurrencyPerCountry.CountryId=Countries.Id
                        WHERE CurrencyPerCountry.CountryId IN (${randomIdList.join(",")})`;
        }
        else if (languagesTableCol.find(e => e == subject)) {
            sqlQuery = `SELECT Languages.${subject}, Countries.CountryName 
                        FROM Countries join Languages join LanguagePerCountry 
                        ON LanguagePerCountry.LanguageId=Languages.Id 
                        AND LanguagePerCountry.CountryId=Countries.Id
                        WHERE LanguagePerCountry.CountryId IN (${randomIdList.join(",")})`;
        }
        else if (subject == "Borders") {
            sqlQuery = "";
            /*
            Borders:
            -----------------
            select from "Border" the "CountryId" and "BorderCountryId"
                --> select with the value of "BorderCountryId" a row with the same "Id" in "Countries" table --> take from row the "CountryName"
                --> select with the value of "CountryId" a row with the same "Id" in "Countries" table --> take from row the "CountryName"
            */
        }


        let resArray = dal.extractDbResult(await dal.runQuery(sqlQuery));
        let query = {
            "query": `what is the ${subject} of ${resArray[0].CountryName}: `,
            "a": resArray[0][subject],
            "b": resArray[1][subject],
            "c": resArray[2][subject],
            "d": resArray[3][subject],
            "correct": "",
        }

        console.log(query, resArray);

        return query;
    }

}

module.exports = { TriviaQueryCreator }