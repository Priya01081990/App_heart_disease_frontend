import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axiosInstance from 'src/utils/axios';
import { ROUTES } from 'src/api/routes';
import { RenderField } from '../dynamic-attributes/render-field';
import { alertType, useProfileContext } from "src/providers/profile";
import { useNavigate } from 'react-router-dom';
import { Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddToWatch: any = (props: any) => {

    const [predictionStatus, setPredictionStatus] = React.useState<any>({
        status: 0,
        message: ''
    })
    const [activityPredicyionInput, setActivityPredictionInput] = React.useState({
        rate: '',
        activity: ''
    })
    const { setAlertState, userDetails } = useProfileContext()
    const navigate = useNavigate()

    const getDynamicAttributesMLSupport = async () => {
        const response = await axiosInstance.get(`${ROUTES.GET.DYNAMIC_ATTRIBUTES_LIST_ML_SUPPORT}?module_id=${props.module_id}&no_of_time_response=${props.response_no}`)
        
        setPredictionStatus({
            status: response.data.data.prediction,
            message: response.data.message
        })
        //setPredictionStatus(response.data.message)
    }

    const handleChange = (name: string) => (value: any) => {
        setActivityPredictionInput({
            ...activityPredicyionInput,
            [name]: value
        })
    }

    const handleSubmit = () => {
        
        axiosInstance.post(ROUTES.POST.HEART_ACTIVITY, activityPredicyionInput)
        navigate('/home');
    }

    React.useEffect(() => {
        if (props.response_no) {
            getDynamicAttributesMLSupport()
        }

    }, [props.response_no])
    return (
        <div>
            <Modal
                sx={{ maxWidth: '100%' }}
                open={props.open}
                onClose={props.close}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ color: "#673ab7" }}>
                        <h2>
                            {predictionStatus.message}
                        </h2>

                    </Typography>
                    {/* {JSON.stringify(activityPredicyionInput)} */}


                    {predictionStatus.status ?
                        <>
                            <div>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        //defaultValue="Female"
                                        onChange={(e, value: any) => handleChange('rate')(value)}
                                    >
                                        <FormControlLabel value="increase" control={<Radio />} label="Increase" />
                                        <FormControlLabel value="decrease" control={<Radio />} label="Decrease" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={['Lying', 'Sitting', 'Self Pace walk', 'Running 3 METs', 'Running 5 METs', 'Running 7 METs']}
                                        getOptionLabel={(option: any) => option}
                                        value={activityPredicyionInput.activity || null}
                                        onChange={(e, value: any) => handleChange('activity')(value)}
                                        renderInput={(params: any) => <div ref={params.InputProps.ref}>
                                            <TextField {...params} label='Type' required />
                                        </div>} />
                                </FormControl>
                            </div>
                            <div style={{ margin: '1em' }}>
                                <Button

                                    type="submit"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Smart watch monitor simulator
                                </Button>

                                <Button
                                    style={{ float: 'right' }}
                                    color='error'
                                    type="submit"
                                    variant="contained"
                                    onClick={() => {
                                        navigate('/home');
                                    }}
                                >
                                    cancel
                                </Button>
                            </div>
                        </> : <Button
                            style={{ float: 'right' }}
                            color='primary'
                            type="submit"
                            variant="contained"
                            onClick={() => {
                                navigate('/home');
                            }}
                        >
                            Back to homr
                        </Button>}

                </Box>
            </Modal>
        </div>
    );
}

export default AddToWatch