import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../App/api/todolists-api";
import {TasksType} from "../AppWithRedux";

test('correct task should be deleted from correct array', () => {
    const startState: TasksType = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            }
        ]
    }

    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)


    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            }
        ]
    })
    test('correct task should be added to correct array', () => {
        const startState: TasksType = {
            'todolistId1': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ],
            'todolistId2': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ]
        }

        const action = addTaskAC('juce', 'todolistId2')

        const endState = tasksReducer(startState, action)

        expect(endState['todolistId1'].length).toBe(3)
        expect(endState['todolistId2'].length).toBe(4)
        expect(endState['todolistId2'][0].id).toBeDefined()
        expect(endState['todolistId2'][0].title).toBe('juce')
        expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
    })
    test('status of specified task should be changed', () => {
        const startState: TasksType = {
            'todolistId1': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ],
            'todolistId2': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ]
        }

        const action = changeTaskStatusAC('2', false, 'todolistId2')

        const endState = tasksReducer(startState, action)

        expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)

    })
    test('title of specified task should be changed', () => {
        const startState: TasksType = {
            'todolistId1': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ],
            'todolistId2': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ]
        }

        const action = changeTaskTitleAC('2', 'Beer', 'todolistId2')
        const endState = tasksReducer(startState, action)

        expect(endState['todolistId2'][1].title).toBe('Beer')
        expect(endState['todolistId2'][1].title.length).toBe(4)
    })
    test('new array should be added when new todolist is added', () => {
        const startState: TasksType = {
            'todolistId1': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ],
            'todolistId2': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ]
        }

        const action = addTodolistAC('new todolist')

        const endState = tasksReducer(startState, action)


        const keys = Object.keys(endState)
        const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
        if (!newKey) {
            throw Error('new key should be added')
        }

        expect(keys.length).toBe(3)
        expect(endState[newKey]).toEqual([])
    })
    test('property with todolistId should be deleted', () => {
        const startState: TasksType = {
            'todolistId1': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId1",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ],
            'todolistId2': [
                {
                    id: '1',
                    title: 'CSS',
                    status: TaskStatuses.New,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '2',
                    title: 'JS',
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                },
                {
                    id: '3',
                    title: 'React',
                    status: TaskStatuses.New,
                    todoListId: "todolistId2",
                    addedDate: '',
                    order: 0,
                    startDate: '',
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low
                }
            ]
        }

        const action = removeTodolistAC('todolisjtId2')

        const endState = tasksReducer(startState, action)


        const keys = Object.keys(endState)

        expect(keys.length).toBe(1)
        expect(endState['todolistId2']).not.toBeDefined()
    })
})