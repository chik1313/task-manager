import React, {ChangeEvent, useState} from "react";

export const useAddItemForm = (onAddItem:(title: string) => void) => {
    const [error, setError] = useState<string>('')
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const AddTaskOnKeyPressEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!error !== null) {
            setError('')
        }
        if (event.charCode === 13) {
            onAddItem(newTaskTitle.trim())
            setNewTaskTitle('ыыы')
        }
    }
    const addTaskOnClick = () => {
        if (newTaskTitle.trim() !== '') {
            onAddItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    return {
        newTaskTitle,
        error,
        onNewTitleChangeHandler,
        AddTaskOnKeyPressEvent,
        addTaskOnClick
    }
}
