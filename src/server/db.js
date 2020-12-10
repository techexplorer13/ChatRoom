const db=require('mongoose');

db.connect(process.env.DATABASE_URL,{ useNewUrlParser: true }).
then(()=>console.log('DB connection successful'))

exports.module=db