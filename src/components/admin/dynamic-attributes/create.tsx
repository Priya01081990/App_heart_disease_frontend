import { Autocomplete, Button, FormControl, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { ROUTES } from "src/api/routes"
import axiosInstance from "src/utils/axios"
import { alertType, useProfileContext } from "src/providers/profile";
import { useLocation, useNavigate } from "react-router-dom";
import Back from "src/components/back";

const CreateDynamicAttribute = () => {
    const [attrData, setAttrData] = useState<any>([{
        display_name: '',
        name: '',
        type: null,
        field_values: []
    }])
    const [attributeTypes, setAttributeTypes] = useState<any>([])
    //const [modules, setModules] = useState<any>([])
    const { setAlertState } = useProfileContext()
    const location = useLocation()
    const navigate = useNavigate()
    const addField = () => {

        setAttrData([...attrData, {
            display_name: '',
            name: '',
            type: null,
            field_values: []
        }])
    }

    const handleDelete = (index: number) => {
        if(attrData.length > 1){
            const afterDelData = [...attrData]
            afterDelData.splice(index, 1)
            setAttrData(afterDelData)
        }else{
            setAlertState('Atleast 1 value should add', alertType.ERROR)
        }
    }

    const attributeTypeList = async () => {
        const res = await axiosInstance.get(ROUTES.GET.ATTRIBUTE_LIST)
        const { data } = res.data
        setAttributeTypes(data)
    }

    // const moduleList = async () => {
    //     const res = await axiosInstance.get(ROUTES.GET.MODULES)
    //     const { data } = res.data
    //     setModules(data)
    // }

    const handleChange = (name: string) => (value: any, index: any) => {
        console.log(name, value)
        const array = [...attrData]

        if (name === 'type') {
            array[index]['field_values'] = []
        }

        array[index][name] = value
        setAttrData(array)
    }

    const handleSubmit = async () => {

        const payload: any = []

        attrData.map((item: any) => {

            const fieldValues = item.field_values.map((value: any) => {

                return {
                    choices: value
                }
            })

            payload.push({
                display_name: item.display_name,
                name: item.name,
                attribute_type_id: item.type?.id,
                module_id: location.state.module_id,
                field_values: fieldValues
            })
        })

        try {
            const { data } = await axiosInstance.post(ROUTES.POST.CREATE_DYNAMIC_ATTRIBUTES, { dynamic_attributes: payload })
            setAlertState(data.message, alertType.SUCCESS)

            navigate('/dynamic-attributes-list', { state: { module_id: location.state.module_id } })
        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }
    }

    useEffect(() => {
        attributeTypeList()
        //moduleList()
    }, [])

    return (
        <>
            <Grid container spacing={3}>

                <Grid item xs={12}>

                    <Button variant="contained" size="large" style={{ margin: '2em' }} onClick={addField}>
                        Add field
                    </Button>
                    <Back />
                    <Button variant="contained" size="large" style={{ float: 'right', margin: '2em' }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
                
                <Grid item xs={12} style={{ minHeight: '200em', overflow: 'auto', margin: '2em' }}>
                    {attrData.map((item: any, index: any) => (
                        <>
                            <Grid container spacing={1} style={{ margin: '2em' }}>
                            <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="text"
                                        label="Display name"
                                        fullWidth
                                        value={item.display_name}
                                        onChange={(e) => handleChange('display_name')(e.target.value, index)}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="text"
                                        label="Abbreviation"
                                        fullWidth
                                        value={item.name}
                                        onChange={(e) => handleChange('name')(e.target.value, index)}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={attributeTypes}
                                            getOptionLabel={(option: any) => option.name}
                                            value={item.type || null}
                                            onChange={(e, value) => handleChange('type')(value, index)}
                                            renderInput={(params) =>
                                                <div ref={params.InputProps.ref}>
                                                    <TextField {...params} label='Type' required />
                                                </div>
                                            }
                                        />
                                    </FormControl>

                                </Grid>


                                {(item.type?.name === 'dropdown' || item.type?.name === 'radio') &&
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                disablePortal
                                                multiple
                                                id="combo-box-demo"
                                                options={[]}
                                                getOptionLabel={(option: any) => option}
                                                value={item.field_values || null}
                                                freeSolo
                                                limitTags={4}
                                                onChange={(e, value: any) => handleChange('field_values')(value, index)}
                                                renderInput={(params) =>
                                                    <div ref={params.InputProps.ref}>
                                                        <TextField {...params} label='Field values' required />
                                                    </div>
                                                }
                                            />
                                        </FormControl>

                                    </Grid>
                                }

                                <Grid item xs={12} sm={6}>
                                    <Button 
                                    variant="contained" 
                                    size="large" 
                                    color="error"
                                    onClick={()=> handleDelete(index)}>
                                        Remove
                                    </Button>

                                </Grid>

                            </Grid>

                        </>
                    ))}

                </Grid>

            </Grid>
        </>
    )
}

export default CreateDynamicAttribute