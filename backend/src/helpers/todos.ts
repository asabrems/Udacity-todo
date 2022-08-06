import { TodosAccess } from './todosAcess'
//import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
//import { createLogger } from '../utils/logger'
//import * as uuid from 'uuid'
//import * as createError from 'http-errors'
import { TodoUpdate } from '../models/TodoUpdate';
import { parseUserId } from '../auth/utils'

// TODO: Implement businessLogic

const todosAccess = new TodosAccess();
const uuid = require('uuid/v4');

//createTodo see how we call this function
export function createTodo(createTodoRequest: CreateTodoRequest,Token: string): Promise<TodoItem>{
    const todoId = uuid()
    const userId = parseUserId(Token)
    const bucket = process.env.ATTACHMENT_S3_BUCKET;
    return todosAccess.createTodo({
            userId: userId,
            todoId: todoId,
            createdAt: new Date().getTime().toString(),
            done: false,
            attachmentUrl: `https://${bucket}.s3.amazonaws.com/${todoId}`,
            ...createTodoRequest,
        })
}

//deleteTodo
export function deleteTodo(TodoId: string,UserId: string){
   
    return todosAccess.deleteTodo(TodoId,parseUserId(UserId))
}



//generateUploadUrl
export function generateUploadUrl(todoId: string): Promise<string>{
   
    return todosAccess.getUploadUrl(todoId)
}

//getTodos
export async function getTodosForUser(UserId: string): Promise<TodoItem[]>{
   
    return todosAccess.getTodo(parseUserId(UserId))
}

//updateTodo
export function updateTodo(TodoId: string,UserId: string,todoUpdate: UpdateTodoRequest): Promise<TodoUpdate>{
   
    return todosAccess.updateTodo(TodoId, parseUserId(UserId), todoUpdate)
}