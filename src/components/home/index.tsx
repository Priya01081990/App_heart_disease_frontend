import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { data } from 'src/data/dummy-report';
import { alertType, useProfileContext } from 'src/providers/profile';
import Questionnaires from '../questions/questionaries';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axiosInstance from 'src/utils/axios';
import { ROUTES } from 'src/api/routes';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import PieChartWithCustomizedLabel from './charts/pie-chart-custom';
import SimplePieChart from './charts/simple-pie-chart';
import PieChartPaddingAngel from './charts/pie-chart-padding-angle';
import SimpleBarChart from './charts/simple-bar-chart';
type Record = {
    bs?: string,
    bp?: string,
    month: string,
}

const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column'
}));

const MessageBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    justifyContent: 'center',
    '.MuiTypography-root': {
        fontSize: '2em',
        [theme.breakpoints.up('sm')]: {
            fontSize: '3em',
        }
    },
    [theme.breakpoints.down('sm')]: {
        padding: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        justifyContent: 'flex-start',
    }
}));

const DetailBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row'
    },
    '.MuiBox-root': {
        width: '100%',
        padding: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            padding: 0,
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        }
    }
}));

const initialValues: Record = {
    bs: '',
    bp: '',
    month: new Date().toLocaleString('en-US', { month: 'short' })
};

const validationSchema = yup.object({
    bs: yup.number().required('Required!').min(0),
    bp: yup.number().required('Required!').min(0)
});

const GridContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    minWidth: 1000
}));

const CardContainer = styled(Box)(({ theme }) => ({
    width: 1200
}));
const HomeComponent: FC<unknown> = () => {
    const [records, setRecords] = useState(data);
    const [predictionMsg, setPredictionMsg] = useState('')
    const { userDetails, setAlertState } = useProfileContext();
    const navigate = useNavigate()
    const [dynamicAttrRes, setDynamicAttrRes] = useState<any>([])
    const [module, setModule] = useState({
        id: Number,
        name: String
    })
    const getDynamicAttributes = async () => {
        try {
            const getModule = await axiosInstance.get(`${ROUTES.GET.MODULE}`)

            if (getModule.data.statusCode == 200) {

                setModule(getModule.data.data)

                const response = await axiosInstance.get(`${ROUTES.GET.DYNAMIC_ATTRIBUTES_LIST}?module_id=${getModule.data.data.id}&user_id=${userDetails.id}&visit=${true}`)

                // const formatData = response.data.data.map((item: any) => {
                //     item.dynamic_attributes_selected_values[0] = {
                //         answer: null,
                //         //dynamic_attribute_id: item.id
                //     }
                //     return item
                // })

                setDynamicAttrRes(response.data.data)
            }

        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }
    }

    const predictionStatus = async() => {
        try {
            const res = await axiosInstance.get(`${ROUTES.GET.HEART_PREDICTION_STATUS}`)
            // console.log(res.data.message)
            setPredictionMsg(res.data.message)
        } catch (error: any) {
            setAlertState(error.message, alertType.ERROR)
        }
    }
    const formik = useFormik<Record>({
        initialValues,
        onSubmit: (values: Record) => {
            const newRecords = records.map(record => {
                if (record.month === values.month) {
                    return {
                        bs: +values.bs!,
                        bp: +values.bp!,
                        month: values.month,
                    }
                };
                return record;
            });
            setRecords(newRecords);
            setAlertState(`Successfully updated record for month ${values.month}`, alertType.SUCCESS);
        },
        validationSchema,
    });

    useEffect(() => {
        getDynamicAttributes()
        predictionStatus()
    }, [])

    return (
        <MainBox>
            <MessageBox>
                <Button
                    variant="contained"
                    size="large"
                    style={{ marginRight: '2em' }}
                    onClick={() => {
                        navigate('/question-answer', {
                            state: {
                                module_id: module.id
                            }
                        })
                    }}>
                    Response to some questions
                </Button>
                <Typography sx={{ color: "#673ab7" }}>
                    {predictionMsg}
                    {/* Hello, {(userDetails ? userDetails.name : 'user').toLocaleUpperCase()}. Your current status: Healthy */}
                </Typography>
            </MessageBox>
            <DetailBox>
                {/* <Questionnaires /> */}
                <GridContainer>
                    <Grid container spacing={2}>
                        {dynamicAttrRes.map((item: any) => (
                            <Grid item xs={12} md={4}>
                                <CardContainer>
                                    <Card>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Visit Number: {item.no_of_time_response}
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Visit Time: {moment(new Date(item.created_at)).utc().format('LLLL')}
                                            </Typography>

                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => {
                                                navigate('/question-list', {
                                                    state: {
                                                        response_no: item.no_of_time_response,
                                                        module_id: module.id
                                                    }
                                                })
                                            }}>Learn More</Button>
                                        </CardActions>
                                        {/* <PieChartWithCustomizedLabel /> */}
                                    </Card>

                                </CardContainer>


                            </Grid>
                        ))

                        }


                    </Grid>

                    <Card variant='outlined' style={{ display: 'flex', flexDirection: 'row' }}>
                        <SimplePieChart />
                        <PieChartPaddingAngel />
                        <SimpleBarChart />
                    </Card>






                </GridContainer>




                {/* <Box>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <Typography variant="h4">
                                Questionnaires
                            </Typography>
                            <TextField
                                label="Q1. Blood Sugar count?"
                                {...formik.getFieldProps("bs")}
                                helperText={formik.touched.bs && formik.errors.bs}
                                error={formik.touched.bs && formik.errors.bs ? true : false}
                            />
                            <TextField
                                label="Q2. Blood Pressure count?"
                                {...formik.getFieldProps("bp")}
                                helperText={formik.touched.bp && formik.errors.bp}
                                error={formik.touched.bp && formik.errors.bp ? true : false}
                            />
                            <Select 
                                label="Month"
                                {...formik.getFieldProps("month")}
                            >
                                <MenuItem value="Jan">January</MenuItem>
                                <MenuItem value="Feb">Feburuary</MenuItem>
                                <MenuItem value="Mar">March</MenuItem>
                                <MenuItem value="Apr">April</MenuItem>
                                <MenuItem value="May">May</MenuItem>
                                <MenuItem value="Jun">June</MenuItem>
                                <MenuItem value="Jul">July</MenuItem>
                                <MenuItem value="Aug">August</MenuItem>
                                <MenuItem value="Sep">September</MenuItem>
                                <MenuItem value="Oct">October</MenuItem>
                                <MenuItem value="Nov">November</MenuItem>
                                <MenuItem value="Dec">December</MenuItem>
                            </Select>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                            >
                                submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
                <Box>
                    <Typography variant="h4" sx={{ padding: { sm: "0 0 0 1.5em" } }}>
                        Report Chart
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={records} margin={{ top: 16 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="bs" fill="#f44336" />
                            <Bar dataKey="bp" fill="#ff9100" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box> */}
            </DetailBox>
        </MainBox>
    );
};

export default HomeComponent;