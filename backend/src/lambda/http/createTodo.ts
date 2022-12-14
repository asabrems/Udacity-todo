import { APIGatewayProxyEvent, APIGatewayProxyResult,APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businesslogic/todos'

// TODO: Get all TODO items for a current user
export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("creation event processing", event);
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    // TODO: Implement creating a new TODO item
    const userId = getUserId(event);
    
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const newtodoItem = await createTodo(newTodo, userId);
  
    return{
      statusCode: 201,
      headers:{
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "items": newtodoItem
      }),
    }
  };
