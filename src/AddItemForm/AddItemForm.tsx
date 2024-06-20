import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";
import {useAddItemForm} from "./hook/useAddItemForm";

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormType) => {
    const { newTaskTitle,
        error,
        onNewTitleChangeHandler,
        AddTaskOnKeyPressEvent,
        addTaskOnClick} = useAddItemForm(props.addItem)
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
});

export default AddItemForm;
