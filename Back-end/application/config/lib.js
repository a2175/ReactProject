module.exports = function() {
  global.isset = function isset(variable) {
    return typeof(variable) != "undefined" && variable !== null;
  }
  global.rowsToJson = function rowsToJson(rows) {
     return JSON.parse(JSON.stringify(rows));
  }
}()
