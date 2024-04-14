import React, {ChangeEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormType) => {
    const [error, setError] = useState<string>('')
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
        setError('')
    }
    const AddTaskOnKeyPressEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }
    const addTaskOnClick = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <TextField value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={AddTaskOnKeyPressEvent}
                       error={!!error}
                       variant={'outlined'}
                       label={'Type Value'}
                       helperText={error}
            />
            <IconButton color={'primary'} onClick={addTaskOnClick}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;
