import * as yup from 'yup';
import React, { FC } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { Grid, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { alertType, useProfileContext } from 'src/providers/profile';
import axios from 'src/utils/axios';
import { ROUTES } from 'src/api/routes';
type User = {
    name?: string,
    password?: string,
    email?: string,
    ph_no?: string,
    address?: string,
    age?: string,
    gender?: string,
    type?: string
}

const MainBox = styled(Box)(({ theme }) => ({
    margin: 'auto',
    [theme.breakpoints.up('xs')]: {
        width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
        width: '50%'
    }
}));

const initialValues: User = {
    name: '',
    password: '',
    email: '',
    ph_no: '',
    address: '',
    age: '',
    gender: 'Female',
    type: 'Patient'
};

const validationSchema = yup.object({
    email: yup.string().trim().required('Required!'),
    password: yup.string().trim().required('Required!'),
    name: yup.string().trim().required('Required!'),
    ph_no: yup.number().required('Required!'),
    address: yup.string().trim().required('Required!'),
    age: yup.number().required('Required!'),
    // gender: yup.string().oneOf(['Female', 'Male', 'Other'], 'Invalid gender').required('Required!'),
    // type: yup.string().oneOf(['Patient', 'Doctor'], 'Invalid type').required('Required!'),
});

const SignupComponent: FC<unknown> = () => {
    const navigate = useNavigate();
    const { setAlertState } = useProfileContext();
    const formik = useFormik<User>({
        initialValues,
        onSubmit: async (values: User) => {

            try {
                const response = await axios.post(ROUTES.POST.SIGN_UP, values)
                if(response.data.statusCode == 200){
                    setAlertState(response.data.message, alertType.SUCCESS);
                }
                navigate('/');
            } catch (error: any) {
                setAlertState(error.message, alertType.ERROR);
            }

            
        },
        validationSchema
    });

    return (
        <MainBox>
            <form onSubmit={formik.handleSubmit} style={{ height: '800px', overflow: 'auto'}}>
                <Stack spacing={2}>
                    <Typography variant="h4">
                        Sign up
                    </Typography>
                    <TextField
                        label="Name"
                        {...formik.getFieldProps("name")}
                        helperText={formik.touched.name && formik.errors.name}
                        error={formik.touched.name && formik.errors.name ? true : false}
                    />
                    <TextField
                        label="Email"
                        {...formik.getFieldProps("email")}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && formik.errors.email ? true : false}
                    />
                    <TextField
                        label="Phone number"
                        {...formik.getFieldProps("ph_no")}
                        helperText={formik.touched.ph_no && formik.errors.ph_no}
                        error={formik.touched.ph_no && formik.errors.ph_no ? true : false}
                    />

                    <TextField
                        label="Password"
                        {...formik.getFieldProps("password")}
                        helperText={formik.touched.password && formik.errors.password}
                        error={formik.touched.password && formik.errors.password ? true : false}
                    />
                    <TextField
                        label="Address"
                        {...formik.getFieldProps("address")}
                        helperText={formik.touched.address && formik.errors.address}
                        error={formik.touched.address && formik.errors.address ? true : false}
                    />
                    <TextField
                        label="Age"
                        {...formik.getFieldProps("age")}
                        helperText={formik.touched.age && formik.errors.age}
                        error={formik.touched.age && formik.errors.age ? true : false}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    defaultValue="Female"
                                >
                                    <FormControlLabel {...formik.getFieldProps("gender")} value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel {...formik.getFieldProps("gender")} value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel {...formik.getFieldProps("gender")} value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    defaultValue="Patient"
                                >
                                    <FormControlLabel {...formik.getFieldProps("type")} value="Patient" control={<Radio />} label="Patient" />
                                    <FormControlLabel {...formik.getFieldProps("type")} value="Doctor" control={<Radio />} label="Doctor" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>


                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                    >
                        Sign up
                    </Button>
                    <p>Login <Link to="/">{'here'}</Link></p>
                </Stack>
            </form>
        </MainBox>
    );
};

export default SignupComponent;
