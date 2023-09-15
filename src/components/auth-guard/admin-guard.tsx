import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useProfileContext } from 'src/providers/profile';

type Props = {
    to: string,
    children: JSX.Element,
}

const AdminGuard: FC<Props> = ({ children, to }) => {
    const { userDetails } = useProfileContext();

    if(!userDetails) {
        return <Navigate to={to} />;
    }

    if(userDetails && userDetails?.type !== 'Admin') {
        return <Navigate to={to} />;
    }
    
    return children;
};

export default AdminGuard;