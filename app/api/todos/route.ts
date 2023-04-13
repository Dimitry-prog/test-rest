import { BASE_TODO_URL } from "@/app/utils/contants";
import { ITodo } from "@/app/types";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await fetch(BASE_TODO_URL);
  const todos: ITodo[] = await res.json();

  return NextResponse.json(todos);
}

export const POST = async (request: Request) => {
  const { userId, title }: Partial<ITodo> = await request.json();

  if (!userId || !title) {
    return NextResponse.json({message: "Missing required data"});
  }

  const res = await fetch(BASE_TODO_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-KEY': process.env.DATA_API_KEY
    },
    body: JSON.stringify({
      userId,
      title,
      completed: false,
    })
  });

  const newTodo = await res.json();

  return NextResponse.json(newTodo);
}

export const PUT = async (request: Request) => {
  const { userId, title, id, completed }: ITodo = await request.json();

  if (!userId || !title || !id || typeof(completed) !== 'boolean' ) {
    return NextResponse.json({message: "Missing required data"});
  }

  const res = await fetch(`${BASE_TODO_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'API-KEY': process.env.DATA_API_KEY
    },
    body: JSON.stringify({
      userId,
      title,
      completed,
    })
  });

  const updatedTodo = await res.json();

  return NextResponse.json(updatedTodo);
}

export const DELETE = async (request: Request) => {
  const { id }: Partial<ITodo> = await request.json();

  if (!id) {
    return NextResponse.json({message: "Todo id is required"});
  }

  await fetch(`${BASE_TODO_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'API-KEY': process.env.DATA_API_KEY
    }
  });

  return NextResponse.json({message: "Todo deleted"});
}
