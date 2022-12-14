import * as AWS from 'aws-sdk'

import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Types } from 'aws-sdk/clients/s3';
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';



// TODO: Implement the dataLayer logic

//this file creates the various tables for the database

export class TodosAccess{
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        //private readonly todoIndex = process.env.TODOS_CREATED_AT_INDEX,
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
        private readonly client: Types = new AWS.S3({ signatureVersion: 'v4' }),
    ){
    }

    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
        console.log("Creating todo");
        const params ={
            TableName: this.todosTable,
            Item: todoItem,
        }

        const output = await this.docClient.put(params).promise();
        console.log(output);
        return todoItem as TodoItem;
    }

    async deleteTodo(TodoId: string, UserId:string) {
        console.log("Deleting todo");
        const params =
        {
            TableName: this.todosTable,
            Key: {
                userId: UserId,
                todoId: TodoId
            }
        }
            const output = await this.docClient.delete(params).promise();
            console.log(output)
            return "" as string
        }

    


        async getUploadUrl(todoId: string): Promise<string>{
             console.log('Generating URL');
              //const bucketName = process.env.IMAGES_S3_BUCKET  
              const genUrl =  this.client.getSignedUrl('putObject', {
                  Bucket: this.bucketName,
                  Key: todoId,
                  Expires: 3000,
                });
              console.log(genUrl);

            return genUrl as string;
        
        }


        async updateTodo(todoUpdate: TodoUpdate,TodoId: string,UserId: string): Promise<TodoUpdate> {
            console.log("updated todo");
            const params =
            {
                TableName: this.todosTable,
                Key: {
                    userId: UserId,
                    todoId: TodoId
                },
                
                UpdateExpression: "set #n = :n, #dd = :dd, #d = :d",
                ExpressionAttributeNames: {
                    "#n": "name",
                    "#dd": "dueDate",
                    "#d": "done"
                },
                ExpressionAttributeValues: {
                    ":n": todoUpdate['name'],
                    ":dd": todoUpdate['dueDate'],
                    ":d": todoUpdate['done']
                },
                ReturnValues: "ALL_NEW"
            }; 
            
            const results = await this.docClient.update(params).promise();
            console.log(results)
            return results.Attributes as TodoUpdate;
        }

    async getTodo(UserId: string): Promise<TodoItem[]> {
        console.log('get all todos');
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
        console.log(result)
        const items = result.Items;
        return items as TodoItem[];

    }


    

    
   
}
