import { NextResponse } from 'next/server';
import { CharacterData } from '@/types';

// importing the funciton that should connect to database
import { query } from '@/../../connection';

type RickandMorty = {
  id: number;
  name: string;
  status: string;
  species: string;
};

// placeholder API for testing out that I know how to make routes
// move to .env and make it a database connection instead
const DATA_SOURCE_URL: string = 'https://rickandmortyapi.com/api/character';
const API_KEY: string = process.env.DATA_API_KEY as string;
const DUMMY_API: string = 'https://dummy.restapiexample.com/api/v1';

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const response = await res.json();

  // destructure to return only needed info
  const filteredResults = response.results.map((item: RickandMorty) => {
    const { name, id, species, status } = item;
    return { name, id, species, status };
  });

  return NextResponse.json(filteredResults);
}

export async function POST(request: Request) {
  const { name, salary, age }: Partial<CharacterData> = await request.json();

  if (!name || !salary || !age)
    return NextResponse.json({
      message: 'Missing required data in post request',
    });

  const res = await fetch(`${DUMMY_API}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json()',
      'API-Key': API_KEY,
    },
    body: JSON.stringify({ name, salary, age }),
  });
  const newCharacter: CharacterData = await res.json();
  console.log(newCharacter);
  return NextResponse.json(newCharacter);
}

export async function DELETE(request: Request) {
  const { id }: Partial<CharacterData> = await request.json();

  if (!id) return NextResponse.json({ message: 'id required' });
  await fetch(`${DUMMY_API}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json()',
      'API-Key': API_KEY,
    },
  });
  return NextResponse.json({ message: `Entry ${id} deleted` });
}

export async function PUT(request: Request) {
  const { id, name, salary, age }: CharacterData = await request.json();

  // if we do not have these things...
  if (!id || !name || !salary || !age)
    return NextResponse.json({
      message: 'Missing required data in PUT request',
    });

  const res = await fetch(`${DUMMY_API}/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json()',
      'API-Key': API_KEY,
    },
    body: JSON.stringify({ id, name, salary, age }),
  });
  const updatedEntry: CharacterData = await res.json();
  console.log(updatedEntry);
  return NextResponse.json(updatedEntry);
}
