import React, {useContext}from "react";
import { TodoDispatchContext } from "../App";
import "./TodoItem.css"

const TodoItem = ({id, isDone, content, createdDate}) => {
    const {onUpdate, onDelete} = useContext(TodoDispatchContext);
    const onChangeCB = () => {
        onUpdate(id);
    };

    const onDeleteBtn = () =>{
        onDelete(id);
    };

    const itemStyle = {
        backgroundColor: isDone ? "lightgray" : "transparent",
        textDecoration: isDone ? "line-through" : "none",
    }

    return (
        <div className="todo-item align-middle hover:shadow-md flex flex-row items-center justify-center gap-5 translate-y-0 transition-all duration-300 ease-in-out bg-transparent" style={itemStyle}>
            <div className="checkbox_col w-5">
                <input type="checkbox" checked={isDone} onChange={onChangeCB} id="" />
            </div>
            <div className="title_col flex-1">{content}</div>
            <div className="date_col">{new Date(createdDate).toLocaleDateString()}</div>
            <button onClick={onDeleteBtn} className="btn_col btn-gradient cyan mini">
                삭제
            </button>
        </div>
    );
}

export default React.memo(TodoItem);