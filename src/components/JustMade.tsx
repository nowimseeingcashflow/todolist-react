import React from "react";
import { useState } from "react";

const JustMade  : React.FC = () => {
    interface Type{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
    }

  const [justMade, setJustMade] = useState<Type[] | undefined>();
  if (justMade !== undefined){
    return (
    <div>
      <h1>Just Made</h1>
      <ul>
        {justMade.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price}</p>
          </li> 
        ))}
      </ul>
    </div>
  );}
  
};

export default JustMade;