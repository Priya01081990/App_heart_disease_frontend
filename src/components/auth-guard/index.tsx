import { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useProfileContext } from 'src/providers/profile';

type Props = {
    to: string,
    children: JSX.Element,
}

const AuthGuard: FC<Props> = ({ children, to }) => {
    const { userDetails } = useProfileContext();
    //console.log(!userDetails || userDetails?.type !== 'Patient', 13, 'auth-guard', userDetails)

    if(!userDetails){
        return <Navigate to={to} />;
    }
    return children;
};

export default AuthGuard;