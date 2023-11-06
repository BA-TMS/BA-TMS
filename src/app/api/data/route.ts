import { NextResponse } from 'next/server';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// placeholder API for testing out that I know how to make routes
const DATA_SOURCE_URL: string = 'https://jsonplaceholder.typicode.com/todos';
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const todos: Todo[] = await res.json();

  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();

  if (!id) return NextResponse.json({ message: 'Todo id required' });
  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json()',
      'API-Key': API_KEY,
    },
  });
  return NextResponse.json({ message: `Todo ${id} deleted` });
}

// not sure if response is returning everything
// could have something to do with the API
export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json();

  if (!userId || !title)
    return NextResponse.json({
      message: 'Missing required data in post request',
    });

  const res = await fetch(DATA_SOURCE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json()',
      'API-Key': API_KEY,
    },
    body: JSON.stringify({ userId, title, completed: false }),
  });
  const newTodo: Todo = await res.json();
  console.log(newTodo);
  return NextResponse.json(newTodo);
  // returns only the id???
}

export async function PUT(request: Request) {
  const { userId, id, title, completed }: Todo = await request.json();

  // if we do not have these things...
  if (!userId || !id || !title || typeof completed !== 'boolean')
    return NextResponse.json({
      message: 'Missing required data in put request',
    });

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json()',
      'API-Key': API_KEY,
    },
    body: JSON.stringify({ userId, title, completed }),
  });
  const updatedTodo: Todo = await res.json();
  console.log(updatedTodo);
  return NextResponse.json(updatedTodo);
  // also just returns the id apparently
}
