const {MongoClient} = require("mongodb");
const Db = process.env.MONGODB_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function(callback){
        client.connect(function(err,db){
            // verfiy we got a collection in db
            if(db){
                _db = db.db("users");
                console.log(`✔ Successfully connected to ${process.env.DB_NAME}`);
            }
            return callback(err);
        });
    },

    getDb: function(){
        return _db;
    }
};