import {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Chooser = ({title, loadState, options, ...props}) => {
    const [state, setState] = loadState
    const handleChange = (event) => {
        const newVal = event.target.value
        setState(newVal)
    }
    return (
        <div style={{
            margin: "20px"
        }}>



            <FormControl fullWidth style={{margin: "8px"}}>
                <InputLabel id="demo-simple-select-label">{title}</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    value={state}
                    label={title}
                    onChange={handleChange}
                >
                    {options.map(option => {
                        return <MenuItem value={option.value}>{option.display}</MenuItem>
                    })}
                </Select>
            </FormControl>

        </div>
    );
}

export default Chooser