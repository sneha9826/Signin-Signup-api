var MongoClient = require('mongodb').MongoClient;
const a = MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("salon-managment-system");
  dbo.createCollection("signUp", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});