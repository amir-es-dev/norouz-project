import { Modal } from "antd";
import { useState } from "react";
import axios from "axios";
import './EditModal.css'

const EditModal = ({modalVisible, selectedRecord, tableData, setEditPress}) => {
    const [inputValue, setInputValue] = useState(selectedRecord.title);
    const [textValue, setTextValue] = useState(selectedRecord.body);

    const handleOk = () => {
        const item = tableData.find(obj => obj.id === selectedRecord.id);
        item.title = inputValue;
        item.body = textValue;

        axios.put(`https://jsonplaceholder.typicode.com/posts/${selectedRecord.id}`, item)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))

        setInputValue('');
        setTextValue('');
        setEditPress(false);
    }

    const handleCancel = () => {
        setEditPress(false);
        setInputValue('');
        setTextValue('');
    }

    return(
        <Modal visible={modalVisible} title="Edit Record" onOk={handleOk} onCancel={handleCancel}>
            <div className="edit-container"> 
                <h2>UserID : {selectedRecord.userId}</h2>
                <label htmlFor="edit-title">Title</label>
                <input id="rdit-title" value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text"  />
                <label htmlFor="edit-body">Body</label>
                <textarea id="edit-body" value={textValue} onChange={(e) => setTextValue(e.target.value)}></textarea>
            </div>
        </Modal>
    )
}

export default EditModal;