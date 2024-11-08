import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
    switch(action.type){
        case "INCREASE" :
            return state + action.data;
        case "DECREASE" :
            return state - action.data;
        case "RESET" :
            return action.data;
        default :
            return state;
    }
}

const TestComp = () => {
    const [count, dispatch] = useReducer(reducer, 0);

    useEffect(() => {
        console.log(count);
    }, [count]);

    return(
        <div>
            <h3>숫자 세기</h3>
            <b>{count}</b><br/>
            <button onClick={() => dispatch({ type : "INCREASE", data : 1})}>+</button>
            <button onClick={() => dispatch({ type : "DECREASE", data : 1})}>-</button>
            <button onClick={() => dispatch({ type : "RESET", data: 0})}>초기화</button>
        </div>
    );
}

export default TestComp;