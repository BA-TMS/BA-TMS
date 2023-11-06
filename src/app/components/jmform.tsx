'use client';

import { FormEvent } from "react";

type InputProps = {
  label: string,
  name: string,
  placeholder: string
}

function newTodo(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.target;
  alert(form.title.value);
}

function Input({ label, name, placeholder }: InputProps) {
  return (
    <div>
      {label}<input name={name} placeholder={placeholder}></input>
    </div>
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