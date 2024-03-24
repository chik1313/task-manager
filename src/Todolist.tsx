import React from "react";

export type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
}

type PropsType = {
    title:string,
    tasks:Array<TasksType>
    removeTask: (id:number) => void
}
export const Todolist = (props:PropsType) => {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input type="text"/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    return <li><input type="checkbox"
                                      checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>{
                            props.removeTask(t.id)}}>-</button>
                    </li>
                })
            }


        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}
