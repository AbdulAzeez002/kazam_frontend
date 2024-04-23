import React from "react";
type SingleTodoProps = {
  todo: string;
};

const SingleTodo = ({ todo }: SingleTodoProps) => {
  return <div className="p-3 border-solid border-b-2 border-neutral-300">{todo}</div>;
};

export default SingleTodo;
