const dbClient = require('./Connect');

class Model {
    constructor(table) {
        this.table = table;
    }

    async select(columns = '*', whereParams = '') {
        try {
            const sqlQuery = whereParams !== '' ? `SELECT ${columns} FROM ${this.table} WHERE ${whereParams}` : `SELECT ${columns} FROM ${this.table}`;
            console.log(sqlQuery);
            const result = await dbClient.query(sqlQuery);
            return result.rows;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async delete(whereParams = '') {
        try {
            const sqlQuery = whereParams !== '' ? `DELETE FROM ${this.table} WHERE ${whereParams}` : `DELETE FROM ${this.table}`;
            const result = await dbClient.query(sqlQuery);
            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async insert(columns, values) {
        try {
            const sqlQuery = `
            INSERT INTO ${this.table} (${columns})
            VALUES (${values});
            `;
            const result = await dbClient.query(sqlQuery);
            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async update(columns = null, values = null, whereParams = '') {
        try {
            if (columns && values) {
                const sqlQuery = whereParams !== '' ? `UPDATE ${this.table} SET (${columns}) = (${values}) WHERE ${whereParams}` : `UPDATE FROM ${this.table} SET (${columns}) = (${values})`;
                console.log(sqlQuery);
                const result = await dbClient.query(sqlQuery);
                return result;
            }
            throw new Error('Coluna ou Valores de atualização não informados na query');
        } catch (err) {
            console.log(err);
            return err;
        }
    }

}

module.exports = Model;