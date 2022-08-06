import * as AWS from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

import { Types } from 'aws-sdk/clients/s3';





// TODO: Implement the dataLayer logic

//this file creates the various tables for the database

export class TodosAccess{
    constructor(
        private readonly docClient = new DocumentClient(),
        //private readonly todoIndex = process.env.TODOS_CREATED_AT_INDEX,
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
        private readonly s3: Types = new AWS.S3({
            signatureVersion: 'v4'
          })
    ){

    }

    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
        const params ={
            TableName: this.todosTable,
            Item: todoItem
        }

        await this.docClient.put(params).promise();
        return todoItem as TodoItem
    }

    async deleteTodo(TodoId: string, UserId:string) {
        const params =
        {
            TableName: this.todosTable,
            Key: {
                userId: UserId,
                todoId: TodoId
            }
        }
            await this.docClient.delete(params).promise();
            return "" as string
        }

    


        async getUploadUrl(todoId: string): Promise<string>{
             console.log('Generating YRL');
              //const bucketName = process.env.IMAGES_S3_BUCKET  
              const genUrl =  this.s3.getSignedUrl('putObject', {
                  Bucket: this.bucketName,
                  Key: todoId,
                  Expires: 3000,
                });
              console.log(genUrl);

            return genUrl as string;
        
        }


        async updateTodo(TodoId: string,UserId: string,todoUpdate: TodoUpdate): Promise<TodoUpdate> {
        
            const params =
            {
                TableName: this.todosTable,
                Key: {
                    userId: UserId,
                    todoId: TodoId
                },
                
                UpdateExpression: "set #Name = :Name, #DueDate = :DueDate, #Done = :Done",
                ExpressionAttributeNames: {
                    '#Name': 'name',
                    '#DueDate': 'dueDate',
                    '#Done': 'done'
                },
                ExpressionAttributeValues: {
                    ':Name': todoUpdate['name'],
                    ':DueDate': todoUpdate['dueDate'],
                    ':Done': todoUpdate['done']
                },
                ReturnValues: "ALL_NEW"
            }; 
            
            const results = await this.docClient.update(params).promise();
            return results.Attributes as TodoUpdate;
        }

    async getTodo(UserId: string): Promise<TodoItem[]> {
        const params = {
            TableName: this.todosTable,
            KeyConditionExpression: "#userId = :userId",
            ExpressionAttributeNames: {
                "#userId": "userId"
            },
            ExpressionAttributeValues: {
                ":userId": UserId
            }
          

        }
        const result =  await this.docClient.query(params).promise();
        return result.Items as TodoItem[];

    }


    

    
   
}
