import * as yup from 'yup';
import React, { FC } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { alertType, useProfileContext } from 'src/providers/profile';
import axios from 'src/utils/axios';
import { ROUTES } from 'src/api/routes';

type User = {
    email?: string,
    password?: string,
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
    email: '',
    password: ''
};

const validationSchema = yup.object({
    email: yup.string().trim().required('Required!'),
    password: yup.string().trim().required('Required!')
});

const LoginComponent: FC<unknown> = () => {
    const navigate = useNavigate();
    const { fetchUserDetails, setAlertState } = useProfileContext();
    //console.log(useProfileContext())
    const formik = useFormik<User>({
        initialValues,
        onSubmit: async (values: User) => {
            
            try {
                const response = await axios.post(ROUTES.POST.LOGIN, values)
                const { data } = response.data
                if(response.data.statusCode == 200){
                    setAlertState(response.data.message, alertType.SUCCESS);
                }
                localStorage.setItem('token', data.token)
                await fetchUserDetails()
                if(response.data.data.user.type === 'Patient'){
                    navigate('/home');
                }else if(response.data.data.user.type === 'Admin'){
                    navigate('/admin-dashboard');
                }
                
            } catch (error: any) {
                setAlertState(error.message, alertType.ERROR);
            }
            
        },
        validationSchema
    });

    return (
        <MainBox>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <Typography variant="h4">
                        Login
                    </Typography>
                    <TextField
                        label="Email"
                        {...formik.getFieldProps("email")}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && formik.errors.email ? true : false}
                    />
                    <TextField
                        label="Password"
                        {...formik.getFieldProps("password")}
                        helperText={formik.touched.password && formik.errors.password}
                        error={formik.touched.password && formik.errors.password ? true : false}
                    />
                    

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                    >
                        sign in
                    </Button>
                    <p>Don't have an account? Please register <Link to="/signup">{'here'}</Link></p>
                </Stack>
            </form>
        </MainBox>
    );
};

export default LoginComponent;
