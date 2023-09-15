import { FC, Fragment, useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FormControl, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";

export const CheckboxComponent: any = (props: {
    field: any,
    updatedField: any
}) => {
    const [checked, setChecked] = useState<boolean>(false);
    //console.log('ui-components, 14', props)

    const handleChange = (e: any) => {
        setChecked(e.target.checked);

        props.field.dynamic_attributes_selected_values[0] = {
            answer: e.target.checked.toString(),
            //dynamic_attribute_id: props.field.id
        }
        props.updatedField(e)
    }
    return (
        <div>
            {<FormGroup>
                <FormControlLabel control={<Checkbox
                    checked={checked}

                    onChange={handleChange}
                />} label={props.field.display_name} />
            </FormGroup>}
        </div>
    )
};

export const TextBoxComponent: any = (props: {
    field: any,
    updatedField: any
}) => {
    const [value, setValue] = useState<string>('');
    //console.log('ui-components, 13',props)

    const handleChange = (e: any) => {
        setValue(e.target.value);

        props.field.dynamic_attributes_selected_values[0] = {
            answer: e.target.value,
            //dynamic_attribute_id: props.field.id
        }
        props.updatedField(e)
    }
    return (
        <div>
            <TextField
                label={props.field.display_name}
                fullWidth
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export const NumberComponent: any = (props: {
    field: any,
    updatedField: any
}) => {
    const [value, setValue] = useState<number>(0);
    //console.log('ui-components, 13',props)

    const handleChange = (e: any) => {
        setValue(e.target.value);

        props.field.dynamic_attributes_selected_values[0] = {
            answer: e.target.value,
            //dynamic_attribute_id: props.field.id
        }
        props.updatedField(e)
    }
    return (
        <div>
            <TextField
                label={props.field.display_name}
                type="number"
                fullWidth
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export const RadioComponent: any = (props: {
    field: any,
    updatedField: any
}) => {
    const [value, setValue] = useState<any>('');

    const handleChange = (event: any) => {

        setValue(event.target.value)
        props.field.dynamic_attributes_selected_values[0] = {
            answer: event.target.value,
            //dynamic_attribute_id: props.field.id
        }
        
        props.updatedField(event)
    };

    return (
        <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">{props.field.display_name}</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >{
                    props.field.dynamic_attributes_field_values.map((ele: any) => (
                        <FormControlLabel value={ele.choices} control={<Radio />} label={ele.choices} />
                    ))
                }
            </RadioGroup>
        </FormControl>
    );
}