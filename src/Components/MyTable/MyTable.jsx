import { Table, Space, Button } from "antd";
import { EditFilled, PlusCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import {v4 as uuid} from "uuid";
import './MyTable.css';
import EditModal from "../EditModal/EditModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import AddModal from "../AddModal/AddModal";
import { useState } from "react";

const MyTable = ({tableData, setTableData}) => {
    const [newPress, setNewPress] = useState(false);
    const [deletePress, setDeletePress] = useState(false);
    const [editPress, setEditPress] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState('');

    const columns = [
        {
            title: 'UserID',
            dataIndex: 'userId',
            key: 'userId'
        },
        {
            title: 'PostID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body'
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                    <div className="tableBtns">
                        <button onClick={() => deleteRow(record)}><DeleteOutlined style={{color:'red'}} /></button>
                        <button onClick={() => editRow(record)}><EditFilled style={{color:'green'}} /></button>
                    </div>
            )
        },
        {
            title: '#',
            dataIndex: 'num',
            key: 'num'
        }
    ];

    
    const deleteRow = (record) => {
        setDeletePress(true);
        setSelectedRecord(record);
    }
    
    const editRow = (record) => {
        setEditPress(true);
        setSelectedRecord(record);
    };
    
    const addRecord = () => {
        setNewPress(true);
    };

    return (
        <div className="table-container" >
            <div className="addBtn" onClick={addRecord}>
                <span >New Record</span>
                <PlusCircleOutlined style={{ fontSize: '25px', marginLeft: '0.5rem'}} />
            </div>
            <Table bordered key={uuid()} columns={columns} dataSource={tableData} />
            {editPress ? <EditModal  modalVisible={editPress} selectedRecord={selectedRecord} tableData={tableData} setEditPress={setEditPress}/> : null}
            {deletePress ? <DeleteModal  modalVisible={deletePress} selectedRecord={selectedRecord} tableData={tableData} setTableData={setTableData} setDeletePress={setDeletePress}/> : null}
            {newPress ? <AddModal  modalVisible={newPress} tableData={tableData} setTableData={setTableData} setNewPress={setNewPress}/> : null}
        </div>
    )
};

export default MyTable;