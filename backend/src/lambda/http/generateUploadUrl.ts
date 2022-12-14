import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler,APIGatewayProxyResult } from 'aws-lambda'

import { generateUploadUrl } from '../../businesslogic/todos'

export const handler:APIGatewayProxyHandler= async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("url event processing", event);
    const todoId = event.pathParameters.todoId;
    //const userId = getUserId(event)
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const todosurl = await generateUploadUrl(todoId);

    return{
      statusCode: 202,
      headers:{
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "items": todosurl
      }),
    }
  }

