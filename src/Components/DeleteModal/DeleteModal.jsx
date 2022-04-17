import { Modal } from "antd";
import axios from "axios";

const DeleteModal = ({modalVisible, selectedRecord, tableData, setTableData, setDeletePress}) => {

    const handleOk = () => {
        const action = tableData.filter( item => item.id !== selectedRecord.id);
        const newArr = action.map((item, index) => {
            item.num = index + 1;
            return item
          })
        setTableData(newArr);

        axios.delete(`https://jsonplaceholder.typicode.com/posts/${selectedRecord.id}`)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))

        setDeletePress(false);
}

    const handleCancel = () => {
        setDeletePress(false);
    }


    return (
        <Modal visible={modalVisible} title="Delete Record" onOk={handleOk} onCancel={handleCancel}>
            Do you want to delete this record?
        </Modal>
    )
}
export default DeleteModal;