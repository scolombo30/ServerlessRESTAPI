# Serverless REST API
## These two files are used to create a serverless REST API using AWS Cloudformation

The index.js file is the code that the Lambda will execute when the endpoints defined in the API Gateaway are called.  

The template.json file contains all the aws resources and their configuration, that will be generated once the stack is created. The template specifies:  
- A dynamo table
- A lambda
- An execution role for the lambda to grant read and write acces to it
- A REST API
- 3 Resources(Users, user, friendship)
- 5 http methods
- A deployment
- A stage

To create this project:  
1. Download the index.js file and zip it.
(If you're using Powershell use the following command to zip)
```
Compress-Archive .\index.js index.zip
```
2. Create an S3Bucket.
```
aws s3api create-bucket --bucket <bucket-name>
```
and upload the zip file.
```
aws s3 cp <path-to-file> s3://<bucket-name>
```
3. Open the template.json and where there is the Code property in the lambda resource, sobstitutes the bucket name and the key name with the one you used in the previous step.
```
"Code":{
	"S3Bucket":"YOUR BUCKET NAME",
	"S3Key":"YOUR ZIP FILE NAME"
},
```
4. Go to Cloudformation, create a stack with new resources, and upload the template file.
5. Give the stack a name and continue 'till the end of the setup.
6. Wait untill aws has created all the resources.
7. Enjoy! You may now call the endpoints of the APIs
