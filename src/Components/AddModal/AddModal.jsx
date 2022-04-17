import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const AddModal = ({modalVisible, tableData, setTableData, setNewPress}) => {
    const [inputValue, setInputValue] = useState('');
    const [textValue, setTextValue] = useState('');
    const [userId, setUserId] = useState('');

    let userIdArr = [];
    let idArr = [];
    tableData.forEach((item) => {
        if(!userIdArr.includes(parseInt(item.userId))) {
            userIdArr.push(item.userId);
        }
        if(!idArr.includes(item.id)) {
            idArr.push(item.id);
        }
    });

    const handleOk = () => {
        if(!userId) {
            alert('please fill all items');
            return;
        }

        let newRecord = {};
        newRecord.userId = userId;
        newRecord.title = inputValue;
        newRecord.body = textValue;
        
        for(let i=1; i <= tableData.length; i++) {
            if (!idArr.includes(i)) {
                newRecord.id = i;
                break;
            }
        }
        if(!newRecord.id) {
            newRecord.id = tableData.length + 1;
        }

        const updatedTable = [...tableData, newRecord];
        const newArr = updatedTable.map((item, index) => {
            item.num = index + 1;
            return item
          })
        setTableData(newArr);


        axios.post(`https://jsonplaceholder.typicode.com/posts`, newRecord)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))

        setInputValue('');
        setTextValue('');
        setUserId('');
        setNewPress(false);
    }

    const handleCancel = () => {
        setNewPress(false);
        setInputValue('');
        setTextValue('');
        setUserId('');
    }

    console.log(userIdArr)
        console.log(idArr)


    return (
        <Modal visible={modalVisible} title="Create New Record" onOk={handleOk} onCancel={handleCancel} >
          <div className="edit-container"> 
            <select onInput={(e) => setUserId(e.target.value)} >
                <option value="" disabled selected>Select your userId</option>
                {
                    userIdArr.map((item) => (
                        <option>{item}</option>
                    ))
                }
            </select>
            <label htmlFor="edit-title">Title</label>
            <input id="rdit-title" value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text"  />
            <label htmlFor="edit-body">Body</label>
            <textarea id="edit-body" value={textValue} onChange={(e) => setTextValue(e.target.value)}></textarea>
        </div>
      </Modal>
    )
}
export default AddModal;