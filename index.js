const AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


exports.handler = async (event) => {
 console.info(event)
 console.info(event.httpMethod)
 
 let method = event.httpMethod
 let resource = event.resource
 let res
 
 if(resource=='/users' && method=='GET') {
  
  var params = {
     TableName: 'usersprova'
    }
  res = await dynamodb.scan(params).promise()
  res = res.Items
 }
 
 if(resource=='/users' && method=='POST'){
  let parsedBody = JSON.parse(event.body)
  var params = {
   Item: {
   "userId": {
     "N": parsedBody.userId
    }, 
   "name": {
     "S": parsedBody.name
    }, 
   "yearOfBirth": {
     "N": parsedBody.yearOfBirth
    }
  }, 
  TableName: 'usersprova'
  }
  await dynamodb.putItem(params).promise()
  res = "User succesfully added"
 }
 
if(resource=='/users/{userId}' && method=='GET'){
  let id = event.pathParameters.userId
  var params = {
  ExpressionAttributeValues: {
   ":key": { "N": id }
  }, 
  KeyConditionExpression: "userId = :key", 
  TableName: "usersprova"
 }
 let data = await dynamodb.query(params).promise()
 res = data.Items[0]
  console.info(data)
 }
 
 if(resource=='/users/{userId}' && method=='DELETE'){
  let id = event.pathParameters.userId
  var params = {
    TableName: "usersprova", 
    Key : {
        "userId": {
            "N" : id
         }
    }
}
   await dynamodb.deleteItem(params).promise()
   res = "User succesfully deleted"
}
if(resource=="/calculatefriendship"&& method=="GET"){
  let id1 = event.queryStringParameters.id1
  let id2 = event.queryStringParameters.id2
  
  var paramId1 = {
  ExpressionAttributeValues: {
   ":key": { "N": id1 }
  }, 
  KeyConditionExpression: "userId = :key", 
  TableName: "usersprova"
 }
 var paramId2 = {
  ExpressionAttributeValues: {
   ":key": { "N": id2 }
  }, 
  KeyConditionExpression: "userId = :key", 
  TableName: "usersprova"
 }
  let user1 = await dynamodb.query(paramId1).promise()
  console.info(user1)
  user1 = user1.Items[0]
  console.info(user1)
  
  let user2 = await dynamodb.query(paramId2).promise()
  console.info(user2)
  user2 = user2.Items[0]
  console.info(user2)

res = user1.name==user2.name
  
}
 
 console.info(res)
 
  const response = {
  statusCode: 200,
  body: JSON.stringify(res)
  } 
 return response
 }
 