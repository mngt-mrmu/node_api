const mongoose = require('mongoose');

const mongo_db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-klhvj.mongodb.net/sideshop?retryWrites=true&w=majority`;
// const mongo_db_url = 'mongodb://localhost:27017/testdb';

function mongodb_connect() {
  mongoose.connect(
    mongo_db_url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('mongodb connected successfully')
  );
}

function postgresql_connect() {
  console.log('posgresql connection');
}

function mysql_connect() {
  console.log('mysql connection');
}

module.exports = { mongodb_connect, postgresql_connect, mysql_connect };
