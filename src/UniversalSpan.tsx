import React, {ChangeEvent, useState} from 'react';

type UniversalSpanType = {
    title: string
    changeTaskTitleHandler: (newTitle: string) => void
}
const UniversalSpan = (props: UniversalSpanType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const ActivateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const DeactivateEditMode = () => {
        setEditMode(false)
        props.changeTaskTitleHandler(title)
    }

    return editMode
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={DeactivateEditMode} autoFocus/>
        : <span onDoubleClick={ActivateEditMode}>{props.title}</span>
};

export default UniversalSpan;
