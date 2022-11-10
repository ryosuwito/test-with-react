import DataTable from 'react-data-table-component';
import { useMemo, useState, useEffect } from "react";
const columns = [
    {
        name: 'Employee Id',
        selector: row => row.employee_id,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Objective',
        selector: row => row.objective,
    },
    {
        name: 'Risk',
        selector: row => row.risk,
    },
    {
        name: 'Score',
        sortable: true,
        selector: row => row.score,
    },
    {
        name: 'Indicators',
        cell: (row, index) => { return getIndicators(row, index) },
    },
    {
        name: 'Mitigation Plan',
        cell: (row, index) => { return getSolutions(row, index) },
    },
];
function getIndicators(row, index){
    let indicator = ""
    row.indicators.forEach(element => {
        indicator += element.name + " <br/> "
    });
    return <div key={"i"+index}>
    <p dangerouslySetInnerHTML={{__html: indicator}}>
    </p>
    </div>
}
function getSolutions(row, index){
    let solution = ""
    row.solutions.forEach(element => {
        solution += element.name + " <br/> "
    });
    return <div key={"i"+index}>
    <p dangerouslySetInnerHTML={{__html: solution}}>
    </p>
</div>
}
function Table(props) {
    const [filterText, setFilterText] = useState([]);
    const [minscore, setMinScore] = useState(0);
    const [maxscore, setMaxScore] = useState(0);
    const [filteredItems, setFilteredItems] = useState([]);
    const custom_sort = (val) => {
        console.log(val)
        let newItems = [...filteredItems]
        if(val == "asc"){
            newItems.sort((a,b)=>{
                return a.score - b.score
            })
            setFilteredItems(newItems)
        } else {
            newItems.sort((a,b)=>{
                return a.score - b.score
            })
            setFilteredItems(newItems.reverse())
        }
        console.log(filteredItems)
        console.log(newItems)
    }    
    useEffect(()=>{
        setFilteredItems(props.data)
    },[props.data])
    const searchByRange = () => {
        console.log(minscore)
        console.log(maxscore)
        let newItems = []
        filteredItems.forEach(el => {
            if (el.score >= minscore && el.score <= maxscore) newItems.push(el)
        });
        console.log(newItems)
        setFilteredItems(newItems)
        console.log(filteredItems)
    }
    const searchByName = () => {
        console.log(minscore)
        console.log(maxscore)
        let newItems = []
        filteredItems.forEach(el => {
            if (el.name.includes(filterText)) newItems.push(el)
        });
        console.log(newItems)
        setFilteredItems(newItems)
        console.log(filteredItems)
    }
	function subHeaderComponentMemo() {
        return <div key={"filterText"} className={"container"}>
                <div className={"row csubheader"}>
                    <div className={"col-lg-6"}>
                        <label style={{float:"left"}}>Search Employee</label>
                        <input value={filterText} onChange={(event)=>{setFilterText(event.target.value)}} style={{float:"left"}} type={"text"}></input>
                    </div>
                    <div className={"col-lg-1"}>
                        <button onClick={()=>{
                            searchByName()
                        }}>Go!</button>
                    </div>
                </div>
                <div className={"row csubheader"}>
                    <div className={"col-lg-12"}>
                        <label style={{float:"left"}}>Search By Risk Score Range</label>
                    </div>
                    <div className={"col-lg-3"}>
                        <input onChange={(event)=>{setMinScore(event.target.value)}} value={minscore} style={{float:"left"}} type={"text"} placeholder={"min"}></input>
                    </div>
                    <div className={"col-lg-3"}>
                        <input onChange={(event)=>{setMaxScore(event.target.value)}} value={maxscore} style={{float:"left"}} type={"text"} placeholder={"max"}></input>
                    </div>
                    <div className={"col-lg-1"}>
                        <button onClick={()=>{
                            searchByRange()
                        }}>Go!</button>
                    </div>
                    <div className={"col-lg-5"}>
                        <select style={{float:"right"}} onChange={(event)=>{
                            custom_sort(event.target.value)
                            }}>
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>
                    </div>
                </div>
            </div>
    }
    return (
        <div>
            <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        subHeader
                        fixedHeader
                        fixedHeaderScrollHeight={"600px"}
                        subHeaderComponent={subHeaderComponentMemo()}
                    />
        </div>
    );
};

export default Table