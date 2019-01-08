const dal = require('./../00_DAL/index');


const { Country } = { ...require('./tabels/country') };
const { Border } = { ...require('./tabels/border') };
const { Currency } = { ...require('./tabels/currency') };
const { CurrencyPerCountry } = { ...require('./tabels/currencyPerCountry') };
const { Language } = { ...require('./tabels/language') };
const { LanguagePerCountry } = { ...require('./tabels/languagePerCountry') };
const { QueryStatistic } = { ...require('./tabels/queryStatistic') };
const { QueryPerUser } = { ...require('./tabels/queryPerUser') };
const { User } = { ...require('./tabels/user') };

class DbHandler {

    static async getTableCols(tableName) {
        let res = await dal.runQuery(`SELECT COLUMN_NAME 
                             FROM INFORMATION_SCHEMA.COLUMNS 
                             WHERE table_name = '${tableName}' AND table_schema = 'game';`);

        return dal.extractDbResult(res).map(e => e.COLUMN_NAME);
    }

    static createDatabase() {
        return new Promise(
            (resolve, reject) => {
                dal.createDB()
                    .then(DbHandler.createAllTables)
                    .then(DbHandler.insertAllTables)
                    .then(resolve)
                    .catch(reject)
            });

    }

    static createAllTables() {
        return Promise.all([
            Currency.createTable(),
            Language.createTable(),
            Country.createTable(),
            LanguagePerCountry.createTable(),
            CurrencyPerCountry.createTable(),
            Border.createTable(),
            User.createTable(),
            QueryStatistic.createTable(),
            QueryPerUser.createTable()
        ]);

    }

    static dropAllTables() {
        return dal.connect()
            .then(() => dal.runQuery('SET FOREIGN_KEY_CHECKS = 0'))
            .then(
                () =>
                    Promise.all([
                        Currency.dropTable(),
                        Language.dropTable(),
                        Country.dropTable(),
                        LanguagePerCountry.dropTable(),
                        CurrencyPerCountry.dropTable(),
                        Border.dropTable(),
                        User.dropTable(),
                        QueryStatistic.dropTable(),
                        QueryPerUser.dropTable()
                    ])
            )
            .then(() => dal.runQuery('SET FOREIGN_KEY_CHECKS = 1'))
    }

    static insertAllTables() {
        return Country.insertTable()
            .then(Language.insertTable)
            .then(Currency.insertTable)
            .then(LanguagePerCountry.insertTable)
            .then(CurrencyPerCountry.insertTable)
            .then(Border.insertTable);
    }
}


module.exports = { DbHandler };