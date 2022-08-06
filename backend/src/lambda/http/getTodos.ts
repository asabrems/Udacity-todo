import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
//import * as middy from 'middy'
//import { cors } from 'middy/middlewares'

import {getTodosForUser} from '../../helpers/todos'
import { getUserId } from '../utils';

/* // TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const UserId = getUserId(event);
    const todositem = await getTodosForUser(UserId)
    //user identification 
    //todoid 
    //todoitems
    return{
      statusCode: 200,
      headers:{
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "items": todositem
      }),
    }

  })
handler.use(
  cors({
    credentials: true
  })
) */


// TODO: Get all TODO items for a current user
export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const userId = getUserId(event);
    const todositem = await getTodosForUser(userId);
    //user identification 
    //todoid 
    //todoitems
    return{
      statusCode: 200,
      headers:{
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        "items": todositem
      }),
    }
  };
