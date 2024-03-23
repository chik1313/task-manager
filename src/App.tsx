import React from 'react';
import "./App.css"
import {TasksType, Todolist} from "./Todolist";

function App() {

     let tasks:TasksType[] = [
         {id:1 , title:"JS" , isDone:false},
         {id:2 , title:"TS" , isDone:false},
         {id:3 , title:"CSS/HTML" , isDone:false}
     ]

  return (
    <div className='App'>
      <Todolist title={"What to watch"} tasks={tasks}/>

    </div>
  );
}

export default App;
