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
import { Card } from '@mui/material';
import moment from 'moment';


export default function UserList() {
    
    const { setAlertState } = useProfileContext()
    const [users, setUsers] = useState([])

    const userList = async () => {

        try {
            const { data } = await axiosInstance.get(`${ROUTES.GET.ALARM_LIST}`)
            console.log(data)
            if (data.statusCode === 200) {
                setAlertState(data.message, alertType.SUCCESS)
                setUsers(data.data)
            }
        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }

    }

    useEffect(() => {
        userList()
    }, [])
    return (
        <>

            <Card>
                {/* <Button type="submit"
                    style={{margin: '2em'}}
                    variant="contained">Create</Button> */}
                <TableContainer component={Paper} style={{height: '400px',overflow: 'auto'}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>{`Name`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Type`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Email`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Phone number`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Age`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Address`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Gender`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Action`.toLocaleUpperCase()}</TableCell> */}
                                <TableCell>{`Name`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Heart rate`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Alarm`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Alarm time`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Latitude`.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{`Longitude`.toLocaleUpperCase()}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.user.name.toLocaleUpperCase()}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{row.heart_rate}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{row.alarm ? 'Alarm is set' : 'Alarm is not set'}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{moment(new Date(row.alarm_set_date_time)).local().format('LLLL')}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{row.lat}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{row.long}</TableCell>
                                    {/* <TableCell component="th" scope="row" align="center">{row.age}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{row.address}</TableCell>
                                    <TableCell component="th" scope="row" align="center">{row.gender}</TableCell> */}
                                    {/* <TableCell component="th" scope="row" align="center">
                                        <Button

                                            type="submit"
                                            variant="contained"
                                        // onClick={()=>{
                                        //     navigate('/symptoms-wise-data', {state: {module_id: row.id}})
                                        // }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell> */}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </>

    );
}