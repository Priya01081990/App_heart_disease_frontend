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
import { useNavigate } from 'react-router-dom';
export default function ModuleComponent() {
    const navigate = useNavigate();
    const { setAlertState } = useProfileContext()
    const [modules, setModules] = useState([])

    const moduleList = async () => {

        try {
            const { data } = await axiosInstance.get(`${ROUTES.GET.MODULES}`)

            if (data.statusCode === 200) {
                setAlertState(data.message, alertType.SUCCESS)
                setModules(data.data)
            }
        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }

    }

    useEffect(() => {
        moduleList()
    }, [])
    return (
        <>
            
            <TableContainer component={Paper} style={{height: '400px',overflow: 'auto'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>{`Module`.toLocaleUpperCase()}</TableCell>
                            <TableCell align="center">{`Parent module`.toLocaleUpperCase()}</TableCell>
                            <TableCell align="center">{`Action`.toLocaleUpperCase()}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {modules.map((row: any) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name.toLocaleUpperCase()}
                                </TableCell>
                                <TableCell component="th" scope="row" align="center">{row?.parent ? row?.parent?.name.toLocaleUpperCase() : 'N/A'}</TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    <Button

                                        type="submit"
                                        variant="contained"
                                        onClick={()=>{
                                            navigate('/dynamic-attributes-list', {state: {module_id: row.id}})
                                        }}
                                    >
                                        Create custom fields
                                    </Button>
                                </TableCell>
                            
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}