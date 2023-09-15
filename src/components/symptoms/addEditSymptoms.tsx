import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axiosInstance from 'src/utils/axios';
import { ROUTES } from 'src/api/routes';
import { RenderField } from '../dynamic-attributes/render-field';
import { alertType, useProfileContext } from "src/providers/profile";

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

const SymptomsAddEdit: any = (props: any) => {

    const [dynamicAttributes, setDynamicAttributes] = React.useState<any>([])
    const { setAlertState } = useProfileContext()
    const getDynamicAttributes = async () => {
        //const module_id = props.symptoms.id
        const response = await axiosInstance.get(`${ROUTES.GET.DYNAMIC_ATTRIBUTES_LIST}?module_id=${props.symptoms.id}`)

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
    }

    React.useEffect(() => {
        if (props.symptoms) {
            getDynamicAttributes()
        }
    }, [props.symptoms])

    const updatedfield = (index: any) => {

        setDynamicAttributes((dynamicAttributes: any) => {

            return [...dynamicAttributes]
        })
    }

    const onSubmit = async () => {
        
        try {
            // const data = dynamicAttributes.filter((item: any) => {
            //     if(item.dynamic_attributes_selected_values[0].answer || item.dynamic_attributes_selected_values[0].answer ==='false'){
            //         return item
            //     }
                
            // })
            await axiosInstance.post(ROUTES.POST.DYNAMIC_ATTRIBUTES_ADD_EDIT_MODULE_WISE, { module_id: props.symptoms.id, dynamic_attributes: dynamicAttributes })

            props.close()
        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }


    }

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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {dynamicAttributes.map((item: any, index: any) => (
                            <RenderField field={item} updatedField={() => updatedfield(index)} />
                        ))}
                    </Typography>
                    <Button

                        type="submit"
                        variant="contained"
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default SymptomsAddEdit