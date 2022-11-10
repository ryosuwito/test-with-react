import logo from './logo.svg';
import './App.css';
import { React, useState, useEffect } from "react";

import Table from "./component/table"
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from "axios";

function App() {
    
  const url = 'http://localhost:8000/api/issues';
  
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axios.get(url).then(json => {
        console.log("AXIOS", json.data.result)
        setFilteredItems(json.data.result)
    })
  }, [])
  return (
    <div className="App">
      <Table data={filteredItems}/>
    </div>
  );
}

export default App;
