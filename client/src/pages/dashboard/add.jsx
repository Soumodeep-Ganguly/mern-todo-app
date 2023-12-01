import React, { useEffect, useState } from 'react';
import Modal from '../../component/modal';
import Text from '../../component/inputs/text';
import TextArea from '../../component/inputs/textarea';
import Button from '../../component/button';
import Toast from '../../component/toast';
import axios from 'axios';

const Add = (props) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(props.selected) {
            setTitle(props.selected?.title)
            setDescription(props.selected?.description)
        }
    }, [props.selected])

    const onSave = async () => {
        if(title.trim() === "") return Toast.fire({ icon: 'error', title: "Task title required." })
        if(description.trim() === "") return Toast.fire({ icon: 'error', title: "Task description required." })
        
        setLoading(true)
        let uri = '/api/tasks'
        let method = "post"
        if(props.selected) {
            uri += `/${props.selected?._id}`
            method = "put" 
        }
        
        try {
            await axios({
                url: uri,
                method,
                data: { title, description }
            })
            setLoading(false)
            props.onSave()
            handleClose()
        } catch(err) {
            setLoading(false)
            Toast.fire({ icon: 'error', title: err.response?.data?.error || `Unable to ${props.selected?"update":"create"} expense.` })
        }
    }

    const handleClose = () => {
        setTitle("")
        setDescription("")
        props.onClose()
    }

    return (
        <Modal isOpen={props.isModalOpen} onClose={() => handleClose()} title={`${props.selected?"Edit":"Add New"} Task`}>
            <Text
                label="Task Title"
                variant={`${props.dark?"dark":""}`}
                value={title}
                onChange={setTitle}
                style={{ marginTop: 30 }}
            />
            <TextArea
                label="Task Description"
                variant={`${props.dark?"dark":""}`}
                value={description}
                onChange={setDescription}
                style={{ marginTop: 30 }}
            />
            <Button 
                variant={`${props.dark?"primary":"dark"}`}
                text={props.selected?"Save":"Add"}
                loading={loading}
                onClick={() => onSave()}
                style={{ marginTop: 15, marginBottom: 15 }}
            />
        </Modal>
    );
}

export default Add;
