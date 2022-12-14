import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler ,APIGatewayProxyResult } from 'aws-lambda'
import { updateTodo } from '../../businesslogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'

export const handler:APIGatewayProxyHandler =  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("update event processing", event);
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event);
    
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const todoUpdates = await updateTodo(updatedTodo,todoId,userId)
    
    return{
      statusCode: 200,
      headers:{
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "item": todoUpdates
      }),
    }
  }
    