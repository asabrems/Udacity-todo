import 'source-map-support/register'

import { APIGatewayProxyEvent,APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
//import * as middy from 'middy'
//import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../businesslogic/todos'
import { getUserId } from '../utils'

export const handler:APIGatewayProxyHandler =  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    const userId = getUserId(event)
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const deletetodos = await deleteTodo(todoId,userId)

    return{
      statusCode: 200,
      headers:{
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "items": deletetodos
      }),
    }
  }
