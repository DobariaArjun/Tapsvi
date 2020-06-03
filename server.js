const express = require('express');
const SendOtp = require('sendotp');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://ArjunDobaria:Pravin143@mantratechnolog-bjxu8.mongodb.net/test?retryWrites=true&w=majority";
const app = express()
const port = process.env.PORT || 2007;

app.use(bodyParser.json())


MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    const dbo = db.db("mydb");
    if (err) throw err;
    else {
        console.log("Database Connected");


        app.get('/', (req, res) => res.send('Hello World!'))


        app.post('/login', (req, res) => {

        })

        app.post('/studentDetails', (req, res) => {

            var myobj = req.body;

            dbo.collection("students").insert(myobj, function (err, data) {
                if (err) throw err;
                res.json({"status" : 0, "message" : "" + data.ops[0]._id});
                db.close();
            });
        })

        app.get('/studentList', (req, res) => {

            var collection = dbo.collection('students');

            collection.find().toArray(function (err, items) {
                if (err) {
                    throw err
                } else {
                    res.json({"status": 0, "message": "" + JSON.stringify(items[0])})
                }

            })
        });
    }
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


// mongodb+srv://ArjunDobaria:<password>@mantratechnolog-bjxu8.mongodb.net/test?retryWrites=true&w=majority
