import { BASE_TODO_URL } from "@/app/utils/contants";
import { ITodo } from "@/app/types";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const id = request.url.slice(request.url.lastIndexOf('/') + 1);
  const res = await fetch(`${BASE_TODO_URL}/${id}`);
  const todo: ITodo = await res.json();

  if (!todo.id) {
    return NextResponse.json({message: "Todo not found"});
  }

  return NextResponse.json(todo);
}