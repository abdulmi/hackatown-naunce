var AWS = require("aws-sdk");
var settings = require("../settings.js")
var app = require("express")()

var port = process.env.PORT || 3030;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// routes will go here


AWS.config.update({
  region: settings.AWS_REGION,
  endpoint: settings.DB_ENDPOINT
});


var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();

// var params = {
//     TableName : "Products"
// };
//
// dynamodb.deleteTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });
//
//
//

// var params = {
//     TableName : "Products",
//     KeySchema: [
//         { AttributeName: "type", KeyType: "HASH"},  //Partition key
//     ],
//     AttributeDefinitions: [
//         { AttributeName: "type", AttributeType: "S" }
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 1,
//         WriteCapacityUnits: 1
//     }
// };
//
// dynamodb.createTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });


app.get('/api/items',function(req,res){
  //sample grabbing data from table
  var params = {
    TableName: "Products",
  };

  console.log("Scanning Products table.");
  docClient.scan(params, function onScan(err, data) {
      if (err) {
          console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          // print all the movies
          console.log("Scan succeeded.");
          console.log(data)
          res.send(data)

          // continue scanning if we have more movies, because
          // scan can retrieve a maximum of 1MB of data
          if (typeof data.LastEvaluatedKey != "undefined") {
              console.log("Scanning for more...");
              params.ExclusiveStartKey = data.LastEvaluatedKey;
              docClient.scan(params, onScan);
          }
      }
  })
})



// POST http://localhost:8080/api/users
// parameters sent with
app.post('/api/item', function(req, res) {
    //sample putting data into table
    console.log(req.body.type)
    var params = {
        TableName:"Products",
        Item:{
            "type": req.body.type,
            "freq": 0
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(data));
        }
    });
});

//increment counter
app.post('/api/item/increment', function(req,res) {
  var params = {
      TableName:"Products",
      Key:{
          "type": req.body.type
      },
      UpdateExpression: "set freq = freq + :val",
      ExpressionAttributeValues:{
          ":val":req.body.bought
      },
      ReturnValues:"UPDATED_NEW"
  };

  docClient.update(params, function(err, data) {
      if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          res.send(data)
      }
  });
})

//decrement counter
app.post('/api/item/decrement', function(req,res) {
  var params = {
      TableName:"Products",
      Key:{
          "type": req.body.type
      },
      UpdateExpression: "set freq = freq + :val",
      ConditionExpression: ":val <= :num",
      ExpressionAttributeValues:{
          ":num":0,
          ":val":req.body.bought
      },
      ReturnValues:"UPDATED_NEW"
  };

  console.log("Attempting a conditional update...");
  docClient.update(params, function(err, data) {
      if (err) {
          console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
          res.send(data)
      }
  });
})

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
