module.exports = {
  dbSet : {
            host: 'localhost',
            port: '3307',
            user: 'root',
            password: '000000',
            database: 'mydb',
            multipleStatements: true
         },

  toJSON : function(rows) {
     return JSON.parse(JSON.stringify(rows));
  }
}
