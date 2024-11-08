import "./TodoEditor.css"
import { useState, useRef } from "react";

const TodoEditor = ({onCreate}) => {
    const [content, setContent] = useState("");
    // const inputRef = useRef();

    const onChangeContent = (event) => {
        setContent(event.target.value);
    };

    const onKeyDown = (e) =>{
        if (e.keyCode === 13){
            onSubmit();
        }
    };

    const onSubmit = () => {
        if (!content){ // 일단 focus() 내버려둠 ㅠㅠ
            // inputRef.current.focus();
            alert('내용을 입력해주세요.');
            return;
        }
        onCreate(content);
        setContent('');
    };

    return (
        <div className="TodoEditor">
            <h4 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">새로운 Todo 작성하기</h4>
            <div className="editor-wrapper">
                <input value={content} onKeyDown={onKeyDown} onChange={onChangeContent} placeholder="새로운 Todo" required/>
                <button onClick={onSubmit} className="btn-gradient mini cyan">추가</button>
            </div>
        </div>
    );
}

export default TodoEditor;