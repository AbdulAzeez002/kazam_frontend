import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import SingleTodo from "./SingleTodo";
import { baseUrl, getAllTodos } from "../services/todo.servies";

const Todos = () => {
  const [sockets, setSockets] = useState<Socket | null>(null);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const socket = socketIOClient(baseUrl);
    setSockets(socket);
    socket.connect();
    getTodos();

    return () => {
      sockets?.disconnect();
    };
  }, []);

  const addTodo = () => {
    if (todo?.trim()?.length == 0) {
      return;
    }

    try {
      sockets?.emit("addTodo", { data: todo });
      setTodos((prev) => [todo, ...prev]);
    } catch (error) {
      console.log(error, "error while adding todo");
    }
    setTodo("");
  };

  const getTodos = async () => {
    try {
      const response: { todos: string[] } = await getAllTodos();
      setTodos(response?.todos);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="p-4 rounded-lg  sm:min-w-80 w-60 shadow-xl">
      <div className="flex pb-2 items-center">
        <div>
          <img src="notes-icon.png" alt="" height={40} width={40} />
        </div>
        <p className="font-bold text-xl">Note App</p>
      </div>
      <div className="flex ">
        <input
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="New Todo ..."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />

        <button
          className="bg-amber-800 flex items-center rounded-lg p-2 text-white ms-2"
          onClick={addTodo}
        >
          <span className="sm:mr-2 mr-1">
            <img src="plus-icon.png" alt="" height={45} width={45} />
          </span>
          Add
        </button>
      </div>

      <div className="">
        <p className="p-3 font-bold border-solid border-b-2 border-neutral-300">
          Notes
        </p>
        <div className="h-52 overflow-y-scroll">
          {todos?.length === 0 ? (
            <div className="h-52 flex items-center justify-center ">
              <div>No Todos Found</div>
            </div>
          ) : (
            <div>
              {todos?.map((todo) => (
                <SingleTodo todo={todo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
