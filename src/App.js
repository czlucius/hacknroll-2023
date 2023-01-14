import logo from './logo.svg';
import './App.css';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import Chooser from "./Chooser";

function App() {
    const intervalStateList = useState(10*60)
    const breaksStateList = useState(10)

    return (

        <div style={{margin: "20px"}}>
            <Chooser title="Interval" options={[
                {value: 10*60, display: "10 min"},
                {value: 20*60, display: "20 min"},
                {value: 30*60, display: "30 min"}
            ]} loadState={intervalStateList}/>

            <Chooser title="Breaks" options={[
                {value: 10, display: "10s"},
                {value: 20, display: "20s"},
                {value: 30, display: "30s"}
            ]} loadState={breaksStateList}/>

        </div>
    )


}

export default App;
