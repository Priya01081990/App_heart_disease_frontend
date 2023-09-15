import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axiosInstance from "src/utils/axios";
import { ROUTES } from "src/api/routes";
import { alertType, useProfileContext } from "src/providers/profile";
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import Back from 'src/components/back';


export default function DynamicAttributeList() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAlertState } = useProfileContext()
    const [dynamicAttributeList, setDynamicAttributeList] = useState([])

    const dynamicAttributes = async () => {

        try {
            const { data } = await axiosInstance.get(`${ROUTES.GET.DYNAMIC_ATTRIBUTES_LIST}?module_id=${location.state.module_id}`)

            if (data.statusCode === 200) {
                setAlertState(data.message, alertType.SUCCESS)
                setDynamicAttributeList(data.data)
            }
        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }

    }

    useEffect(() => {
        dynamicAttributes()
    }, [])
    return (
        <>

            <Card>
                <Button type="submit"
                    style={{margin: '2em'}}
                    variant="contained" onClick={()=>{
                        navigate('/create-dynamic-attributes', {state:{
                            module_id: location.state.module_id
                        }})
                    }}>Create</Button>
                    <Back />
                <TableContainer component={Paper} style={{height: '400px',overflow: 'auto'}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>{`Attribute display name`.toLocaleUpperCase()}</TableCell>
                                <TableCell>{`Attribute Abbreviation`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`attribute type`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Action`.toLocaleUpperCase()}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dynamicAttributeList.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.display_name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">{row?.attribute_type ? row?.attribute_type?.name : 'N/A'}</TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Button

                                            type="submit"
                                            variant="contained"
                                        onClick={()=>{
                                            navigate('/edit-dynamic-attribute', {state: {attr_id: row.id}})
                                        }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </>

    );
}