var util = require('util');
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
require('colors');

var _ = require('lodash');
var yahooFinance = require('yahoo-finance');

var SYMBOLS = [
  'AAPL',
  'AMZN',
  'GOOGL',
  'YHOO'
];

yahooFinance.historical({
  symbols: SYMBOLS,
  from: '2014-01-01',
  to: '2014-12-31',
  period: 'd'
}, function (err, result) {
  if (err) { throw err; }
  _.each(result, function (quotes, symbol) {
    console.log(util.format(
      '=== %s (%d) ===',
      symbol,
      quotes.length
    ).cyan);
    if (quotes[0]) {
      

oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
    for (var i = 0;i<quotes.length;i++){
    console.log(JSON.stringify(quotes[i], null, 2));
     connection.execute(
      "begin insert into stk_warehouse_datas(warehouse_data_id,val_stk_name_stkwd,jsn_saved_data_stkwd) values (stk_warehouse_data_seq.nextval,:1,:2); commit; end;",
      [symbol,JSON.stringify(quotes[i], null, 2)],
      function(err, result)
      {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        //console.log(result);
      }); // end connection
    } // end loop
    doRelease(connection);
  });

function doRelease(connection)
{
  connection.release(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}
      
    } //end if 
    
    else {
      console.log('N/A');
    }
  });
});
