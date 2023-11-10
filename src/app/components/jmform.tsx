'use client';

import { FormEvent } from "react";
import mysql from 'mysql2/promise';

type InputProps = {
  label: string,
  name: string,
  placeholder: string
}

async function addTodo(title: string) {
  const queryString = `INSERT INTO todos (userid, title) VALUES (1, ${title}`;

  // const conn = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'a2ztms'
  // });
  
  // const [results] = await conn.execute(queryString);
  // return results;
}

function newTodo(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.target;
  alert(form.title.value); 
}

function Input({ label, name, placeholder }: InputProps) {
  return (
    <span>
      <label htmlFor={name}>{label}:</label>
      <input className="text-black" name={name} placeholder={placeholder}></input>
    </span>
  );
}

export default function AddForm() {
  return (
    <form onSubmit={newTodo}>
      <Input label="Title" name="title" placeholder="Describe new task" />
      <input type="submit" />
    </form>
  );
}