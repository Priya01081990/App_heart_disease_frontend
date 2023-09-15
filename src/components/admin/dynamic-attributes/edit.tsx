import { Autocomplete, FormControl, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { ROUTES } from "src/api/routes"
import axiosInstance from "src/utils/axios"

const EditDynamicAttribute = () => {
    const location = useLocation()
    const [attrData, setAttrData] = useState({
        name: '',
        display_name: '',
        attribute_type: null,
        field_values: []
    })
    const [attributeTypes, setAttributeTypes] = useState<any>([])

    const attributeTypeList = async () => {
        const res = await axiosInstance.get(ROUTES.GET.ATTRIBUTE_LIST)
        const { data } = res.data
        setAttributeTypes(data)
    }

    const viewAttribute = async () => {
        const res = await axiosInstance.get(`${ROUTES.GET.DYNAMIC_ATTRIBUTE_VIEW}?id=${location.state.attr_id}`)
        const { data } = res.data
        setAttrData(data)
    }

    const handleChange = (name: string) => (value: any) => {
        console.log(name, value)
        setAttrData({
            ...attrData,
            [name]: value
        })
    }

    useEffect(()=> {
        if(location.state?.attr_id){
            attributeTypeList()
            viewAttribute()
        }
    }, [location.state?.attr_id])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Display name"
                        fullWidth
                        value={attrData.display_name}
                        onChange={(e) => handleChange('display_name')(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Abbreviation"
                        fullWidth
                        value={attrData.name}
                        onChange={(e) => handleChange('name')(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={attributeTypes}
                            getOptionLabel={(option: any) => option.name}
                            value={attrData.attribute_type || null}
                            onChange={(e, value) => handleChange('attribute_type')(value)}
                            renderInput={(params) =>
                                <div ref={params.InputProps.ref}>
                                    <TextField {...params} label='Type' required />
                                </div>
                            }
                        />
                    </FormControl>

                </Grid>

            </Grid>
        </>
    )
}

export default EditDynamicAttribute