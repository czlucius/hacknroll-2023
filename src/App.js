import logo from './logo.svg';
import './App.css';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

function App() {
    const [interval, setInterval] = useState(10)
    const handleChange = (event) => {
        const newVal = event.target.value
        setInterval(newVal)
    }
    return (
        <div>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Interval</InputLabel>
                <Select
                    labelId="duration-select-label"
                    id="duration-select"
                    value={interval}
                    label="Interval"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

        </div>
    );

}

export default App;
