import React, {ChangeEvent, useState} from 'react';

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
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={AddTaskOnKeyPressEvent}
                   className={error ? 'error' : ""}
            />
            <button onClick={addTaskOnClick}>+</button>
            {
                error &&
                <div className='error-message'>{error}</div>
            }
        </div>
    );
};

export default AddItemForm;
