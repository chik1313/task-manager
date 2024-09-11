import {addTodolistAC, TodolistsDomainType, todolistsReducer} from './todolists-reducer'
import {v1} from 'uuid'


test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistsDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter:"all" , order: 0 , addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter:"all" , order: 1 , addedDate: ''},
    ]

    // 2. Действие
    const action = {
        type: 'REMOVE-TODOLIST' as const,
        payload: {
            todolistId: todolistId1,
        },
    }
    const endState = todolistsReducer(startState, action)

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistsDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter:"all" , order: 0 , addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter:"all" , order: 1 , addedDate: ''},
    ]

    const action = addTodolistAC('New Todolist')
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(action.payload.title)
})
test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistsDomainType[] = [
        {id: todolistId1, title: 'What to learn', filter:"all" , order: 0 , addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter:"all" , order: 1 , addedDate: ''},
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        payload: {
            todolistId: todolistId2,
            title: 'New Todolist',
        },
    }
    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('Wdhat to learn')
    expect(endState[1].title).toBe(action.payload.title)
})
