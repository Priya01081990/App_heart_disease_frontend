import React, { FC } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeComponent from '../home';
import SymptomsComponent from '../symptoms/index';
import AboutComponent from '../about';
import AlertComponent from '../alert';
import AuthGuard from '../auth-guard';
import FooterComponent from '../footer';
import HeaderComponent from '../header';
import NotFoundComponent from '../not-found';
import LoginComponent from '../authentication/login';
import SignupComponent from '../authentication/signup';
import ProfileProvider from 'src/providers/profile';

// import FormComponent from '../form';
// import NeurologyComponent from '../neurology';
// import OrthopedicsComponent from '../orthopedics';
// import OthersComponent from '../others';
import GuestGuard from '../auth-guard/guest-guard';
import UserSymptomsData from '../symptoms/previousData';
import AdminGuard from '../auth-guard/admin-guard';
import ModuleComponent from '../admin/modules';
import DynamicAttributeList from '../admin/dynamic-attributes/list';
import UserList from '../admin/user/list';
import CreateDynamicAttribute from '../admin/dynamic-attributes/create';
import Questionnaires from '../questions/questionaries';
import QuestionAnswerList from '../questions/list';
import AdminDashboard from '../admin/dashboard';
import EditDynamicAttribute from '../admin/dynamic-attributes/edit';
export const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#673ab7',
        },
        secondary: {
            main: '#00e5ff',
        },
        text: {
            primary: '#000000',
        },
    },
};

const theme = createTheme(themeOptions);

const Main = styled('main')(() => ({
    //margin: 'auto 2em',
    marginTop: '2em',
    marginBottom: '2em',    
}))

const AppFeature: FC<unknown> = () => (
    <ProfileProvider>
        <ThemeProvider theme={theme}>
            <Router>
                <HeaderComponent />
                    <Main>
                        <Routes>
                            <Route path="/" element={<GuestGuard to ='/home'><LoginComponent /></GuestGuard>}/>
                            <Route path="/signup" element={<GuestGuard to ='/home'><SignupComponent /></GuestGuard>}/>

                            <Route path="/home" element={<AuthGuard to='/'><HomeComponent /></AuthGuard>}/>
                            <Route path="/about" element={<AuthGuard to='/'><AboutComponent /></AuthGuard>}/>
                            <Route path="/symptoms" element={<AuthGuard to='/'><SymptomsComponent /></AuthGuard>}/>
                            <Route path="/symptoms-wise-data" element={<AuthGuard to ='/'><UserSymptomsData /></AuthGuard>} />
                            <Route path="/question-answer" element={<AuthGuard to ='/'><Questionnaires /></AuthGuard>} />
                            <Route path="/question-list" element={<AuthGuard to ='/'><QuestionAnswerList /></AuthGuard>} />

                            <Route path="/modules" element={<AdminGuard to ='/'><ModuleComponent /></AdminGuard>} />
                            <Route path="/dynamic-attributes-list" element={<AdminGuard to ='/'><DynamicAttributeList /></AdminGuard>} />
                            <Route path="/users" element={<AdminGuard to ='/'><UserList /></AdminGuard>} />
                            <Route path="/create-dynamic-attributes" element={<AdminGuard to ='/'><CreateDynamicAttribute /></AdminGuard>} />
                            <Route path="/edit-dynamic-attribute" element={<AdminGuard to ='/'><EditDynamicAttribute /></AdminGuard>} />
                            <Route path="/admin-dashboard" element={<AdminGuard to ='/'><AdminDashboard /></AdminGuard>} />

                            <Route path="*" element={<NotFoundComponent />}/>
                        </Routes>
                    </Main>
                {/* <FooterComponent /> */}
                <AlertComponent />
            </Router>
        </ThemeProvider>
    </ProfileProvider>
);

export default AppFeature;