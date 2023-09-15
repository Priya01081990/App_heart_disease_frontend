import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { ROUTES } from 'src/api/routes';
import axiosInstance from 'src/utils/axios';
// import { BallTriangle } from 'react-loader-spinner'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
interface IProfileContext {
  //name?:string,
  userDetails?: any,
  showAlert: boolean,
  signOut: () => void,
  alertType: string | undefined,
  alertMessage: string | undefined,
  //signIn: (uName: string, uPassword: string) => string | void,
  fetchUserDetails: () => void
  setAlertState: (message?: string, type?: alertType) => void,
}

type Props = {
  children?: React.ReactNode
}

const ProfileContext = createContext<IProfileContext | null>(null);

const ProfileProvider: FC<Props> = ({ children }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [userDetails, setUserdetails] = useState<any>(undefined);
  const [alertType, setAlertType] = useState<string | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true)
  // const signIn = (uName: string, uPassword: string) => {
  //   // if(uName.toLowerCase() !== 'admin' || uPassword.toLowerCase() !== 'admin') {
  //   //   return 'Invalid credential!';
  //   // }
  //   setName(uName);
  // };

  const signOut = () => {
    localStorage.clear()
    setUserdetails(undefined);
  }

  const setAlertState = (message?: string, type?: alertType) => {
    //if(!alertMessage && !alertType) || (!message && !type)){
    // if( (!message && !type)) {
    //   //setShowAlert(prevState => !prevState);
    //   setShowAlert(false)
    // }else{
    //   setShowAlert(true)
    // }
    setShowAlert((!message && !type) ? false : true)
    setAlertType(type);
    setAlertMessage(message);
  }

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`${ROUTES.GET.USER_DETAILS}`)
      if (response.data.statusCode === 200) {
        setUserdetails(response.data.data)
      }

    } catch (error) {

      signOut()
    } finally {

      setIsLoading(false)
    }
  }

  const value = {
    fetchUserDetails,
    userDetails,
    signOut,
    showAlert,
    alertType,
    alertMessage,
    setAlertState,
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])

  return (
    <ProfileContext.Provider value={value}>
      {/* {isLoading ? <BallTriangle
        height={100}
        width={1000}
        radius={5}
        color="rgb(72, 40, 128)"
        ariaLabel="ball-triangle-loading"
        visible={true}
      /> : children} */}
      {isLoading? <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>: children}
    </ProfileContext.Provider>
  );
};

export enum alertType {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
};

export default ProfileProvider;

export const useProfileContext = () => useContext(ProfileContext) as IProfileContext;