import { FC, useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axios';
import { ROUTES } from 'src/api/routes';
import { RenderField } from '../dynamic-attributes/render-field';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { alertType, useProfileContext } from 'src/providers/profile';
import { useLocation, useNavigate } from 'react-router-dom';
import AddToWatch from './addToWatch';

const Questionnaires = () => {
    const { userDetails, setAlertState } = useProfileContext();
    const [dynamicAttributes, setDynamicAttributes] = useState<any>([])
    const location = useLocation()
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)
    const [responseNo, setResponseNo] = useState<number>(0)
    //console.log(location)
    const handleOpen = () => setOpen(true)

    const handleClose = () => {
        setOpen(false)
        navigate('/home')
    }
    const getDynamicAttributes = async () => {
        try {
            const response = await axiosInstance.get(`${ROUTES.GET.DYNAMIC_ATTRIBUTES_LIST}?module_id=${location.state.module_id}`)

            const formatData = response.data.data.map((item: any) => {
                if(item.attribute_type.name === 'checkbox'){
                    item.dynamic_attributes_selected_values[0] = {
                        answer: 'false',
                        //dynamic_attribute_id: item.id
                    }
                }else if(item.attribute_type.name === 'number'){
                    item.dynamic_attributes_selected_values[0] = {
                        answer: '0',
                        //dynamic_attribute_id: item.id
                    }
                }else {
                    item.dynamic_attributes_selected_values[0] = {
                        answer: 'No response',
                        //dynamic_attribute_id: item.id
                    }
                }
                
                return item
            })

            setDynamicAttributes(formatData)

        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }
    }

    const updatedfield = () => {

        setDynamicAttributes((dynamicAttributes: any) => {

            return [...dynamicAttributes]
        })
    }

    const onSubmit = async () => {

        try {
            // const data = dynamicAttributes.filter((item: any) => {
            //     if (item.dynamic_attributes_selected_values[0].answer || item.dynamic_attributes_selected_values[0].answer === 'false') {
            //         return item
            //     }

            // })
            const create = await axiosInstance.post(ROUTES.POST.DYNAMIC_ATTRIBUTES_ADD_EDIT_MODULE_WISE, { module_id: location.state.module_id, dynamic_attributes: dynamicAttributes })
            setResponseNo(create.data.data.responseNo)
            //console.log(create)
            handleOpen()
            //navigate('/home')
        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }


    }

    useEffect(() => {
        getDynamicAttributes()
    }, [])


    return (
        <>
            <AddToWatch open={open} module_id={location.state.module_id} response_no={responseNo} close={handleClose}/>
            <h1>Answer the questions</h1><br />

            <Grid container spacing={3} style={{ margin: '10px' }}>

                {dynamicAttributes.map((item: any, index: any) => (
                    <Grid item xs={6} sm={6} md={2}>
                        <RenderField field={item} updatedField={() => updatedfield()} />
                    </Grid>

                ))}

                <Button
                    type="submit"
                    size='large'
                    variant="contained"
                    onClick={onSubmit}
                >Submit</Button>
            </Grid>
        </>

    )
}

export default Questionnaires