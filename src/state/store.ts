import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {thunk} from "redux-thunk";


const rootReducer = combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStojjjjre(rootReducer, applyMiddleware(thunk) )

// @ts-ignore
window.store = store;
