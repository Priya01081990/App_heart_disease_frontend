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
import { useLocation } from 'react-router-dom';
import Back from '../back';

const QuestionAnswerList = () => {
    const location = useLocation()

    const { setAlertState, userDetails } = useProfileContext()
    const [dynamicAttributes, setDynamicAttributes] = useState([])

    const getDynamicAttributes = async () => {

        const response = await axiosInstance.get(`${ROUTES.GET.DYNAMIC_ATTRIBUTES_LIST}?module_id=${location.state.module_id}&user_id=${userDetails.id}&no_of_time_response=${location.state.response_no}`)

        const formatData = response.data.data.map((item: any) => {
            if(item.attribute_type.name === 'checkbox'){
                item.result = item.dynamic_attributes_selected_values[0]?.answer === 'true' ? `${item.display_name} present` : `${item.display_name} not present`
            }else{
                item.result = item.dynamic_attributes_selected_values[0]?.answer 
            }
            return item
        })
        // console.log(37, formatData)
        setDynamicAttributes(formatData)
        setAlertState(formatData.length ?'Answers fetched successfully' : 'No answer found', formatData.length ? alertType.SUCCESS : alertType.ERROR)
    }

    useEffect(() => {
        getDynamicAttributes()
    }, [])
    return (
        <>
        <Back />
            {dynamicAttributes.length ? <TableContainer component={Paper} style={{ height: '400px', overflow: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>{`Answer`.toLocaleUpperCase()}</TableCell>
                            <TableCell align="center">{`Year`.toLocaleUpperCase()}</TableCell>
                            <TableCell align="center">{`Month`.toLocaleUpperCase()}</TableCell>
                            <TableCell align="center">{`Result`.toLocaleUpperCase()}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dynamicAttributes.map((row: any) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name.toLocaleUpperCase()}
                                </TableCell>
                                <TableCell component="th" scope="row" align="center">{row.year}</TableCell>
                                <TableCell component="th" scope="row" align="center">{row.month}</TableCell>
                                <TableCell component="th" scope="row" align="center">{row.result}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <h1>No symptoms details found</h1>}
        </>

    );
}

export default QuestionAnswerList