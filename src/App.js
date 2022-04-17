import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyTable from './Components/MyTable';

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function getData() {
      try{
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const newArr = response.data.map((item, index) => {
          item.num = index + 1;
          return item
        })
        setTableData(newArr);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <MyTable tableData={tableData} setTableData={setTableData}/>
    </div>
  );
}

export default App;
