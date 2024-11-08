import FireworkAnimation from "./components/FireworkAnimation";
import { FireworksOfStars } from "./components/FireworkofStars";
import Fireworks from "./components/Fireworks";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import { useRef, useReducer } from "react";

const mockTodo = [
  {
    id: 1,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "저녁 먹기",
    createdDate: new Date().getTime(),
  },
  {
    id: 3,
    isDone: false,
    content: "싸강 듣기",
    createdDate: new Date().getTime(),
  },
];

const reducer = (state, action) => {
  switch (action.type){
    case "CREATE":
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map((item) => 
        item.id === action.targetId ? {...item, isDone: !item.isDone} : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);

    default:
      return state;
    }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(4);
  const onCreate = (content) => {
    // const newItem = {
    //   id: idRef.current,
    //   isDone: false,
    //   content,
    //   createdDate: new Date().getTime(),
    // };
    // setTodo([newItem, ...todo]);
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        isDone: false,
        content,
        createdDate: new Date().getTime(),
      }
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {
    // setTodo(
    //   todo.map((item) => {
    //     if (item.id === targetId) {
    //       return {...item, isDone: !item.isDone};
    //     } else {
    //       return item;
    //     }
    //   })
    // );
    dispatch({
      type: "UPDATE",
      targetId,
    });
  };

  const onDelete = (targetId) =>{
    // setTodo(todo.filter((item) => item.id !== targetId));
    dispatch({
      type: "DELETE",
      targetId,
    });
  }
  return (
    <div className="App mx-auto w-full max-w-[500px] p-5 border border-gray-400 text-center flex flex-col gap-8">
      <Header/>
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
