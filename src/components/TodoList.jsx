import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from "../App";
import TodoItem from "./TodoItem";
import "./TodoList.css"

const TodoList = () => {

    const { todo }  = useContext(TodoStateContext);

    const [search, setSearch] = useState("");

    const onChangeSearch = (event) => {
        setSearch(event.target.value);
    };
    const sortedTodo = [...todo].sort((a, b) => {
      if (a.isDone === b.isDone) {
        // If both items have the same isDone status, maintain their original order
        return 0;
      }
      // Move checked items to the bottom
      return a.isDone ? 1 : -1;
      });

    const searchResult = () =>{
        return search === "" ? sortedTodo : sortedTodo.filter((item) => item.content.toLowerCase().includes(search.toLowerCase()));    
    };

    const analyzeTodo = useMemo(() => {
      const done = todo.filter((item) => item.isDone).length;
      const notDone = todo.length
      return (notDone - done) ? `아직 할 게 ${notDone - done}개 남았어요!` : "축하해요! 할 일을 마쳤어요🥰"
    }, [todo]);

    const itemwrapperStyle = {
      innerHeight: `${searchResult().length * 60}px`, // Adjust this value based on your item height
      transition: 'all 0.5s ease',
    }
    

    return (
    <div className="todo-list">
      <h2 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white'>할 것들 📝</h2>

       <h4>{analyzeTodo}</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        className="searchbar my-4 float-right clear-both"
        placeholder="검색어를 입력하세여"
      />
      <div className="list-wrapper clear-both" style={itemwrapperStyle}>
        {searchResult().map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
