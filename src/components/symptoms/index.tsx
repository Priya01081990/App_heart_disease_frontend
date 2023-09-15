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
import SymptomsAddEdit from './addEditSymptoms';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';
import Back from '../back';
export default function SymptomsComponent() {
    const navigate = useNavigate();
    const { setAlertState } = useProfileContext()
    const [symptomsModule, setSynptomsModules] = useState([])
    const [open, setOpen] = useState<boolean>(false)
    const [symptoms, setSymptoms] = useState(null)

    const handleOpen = () => setOpen(true)

    const handleClose = () => {
        setOpen(false)
        symptomsModuleList()
        setSymptoms(null)
    }

    const symptomsModuleList = async () => {

        try {
            const { data } = await axiosInstance.get(`${ROUTES.GET.SYMTOMPS_MODULES}`)

            if (data.statusCode === 200) {
                setAlertState(data.message, alertType.SUCCESS)
                setSynptomsModules(data.data)
            }
        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }

    }

    useEffect(() => {
        symptomsModuleList()
    }, [])
    return (
        <>
            <SymptomsAddEdit open={open} symptoms={symptoms} close={handleClose} />
            <Back />
            <Card>
                <TableContainer component={Paper} style={{ height: '400px', overflow: 'auto' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>{`Subjects`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Number of symptoms for the subjects`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Action`.toLocaleUpperCase()}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {symptomsModule.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name.toLocaleUpperCase()}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">{row._count.dynamic_attributes}</TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Button

                                            type="submit"
                                            variant="contained"
                                            onClick={() => {
                                                setSymptoms(row)
                                                if (row._count.dynamic_attributes) {
                                                    handleOpen()
                                                } else {
                                                    setAlertState('No symptoms data found', alertType.ERROR)
                                                }

                                            }
                                            }
                                        >
                                            Select symptoms
                                        </Button>&nbsp;&nbsp;
                                        <Button

                                            type="submit"
                                            variant="contained"
                                            onClick={() => {
                                                navigate('/symptoms-wise-data', { state: { module_id: row.id } })
                                            }}
                                        >
                                            Previous Data
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