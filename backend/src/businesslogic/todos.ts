import { TodosAccess} from '../dataloader/todosAcess'

import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

import { TodoUpdate } from '../models/TodoUpdate';
import { parseUserId } from '../auth/utils'

// TODO: Implement businessLogic

const todosAccess = new TodosAccess();
const uuid_v = require('uuid/v4');

//createTodo see how we call this function
export function createTodo(createTodoRequest: CreateTodoRequest,token: string): Promise<TodoItem> {
    const todoId = uuid_v();
    const userId = parseUserId(token);
    const bucketName = process.env.ATTACHMENT_S3_BUCKET;

    return todosAccess.createTodo({
            userId: userId,
            todoId: todoId,
            attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`,
            createdAt: new Date().getTime().toString(),
            done: false,
            ...createTodoRequest,
        });
}

//deleteTodo
export function deleteTodo(TodoId: string,token: string){
    const userId = parseUserId(token)
    return todosAccess.deleteTodo(TodoId,userId);
}



//generateUploadUrl
export function generateUploadUrl(todoId: string): Promise<string>{
   
    return todosAccess.getUploadUrl(todoId);
}

//getTodos
export async function getTodosForUser(token: string): Promise<TodoItem[]>{
    const userId = parseUserId(token)
    return todosAccess.getTodo(userId);
}

//updateTodo
export function updateTodo(updateTodoRequest: UpdateTodoRequest,TodoId: string,token: string): Promise<TodoUpdate>{
    const userId = parseUserId(token)
    return todosAccess.updateTodo(updateTodoRequest,TodoId, userId);
}