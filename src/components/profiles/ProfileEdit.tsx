import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
}

const ProfileEdit = (props: Props) => {
    const location: any = useLocation();
    const navigate = useNavigate();
    const { profileName } = location.state;

    if((profileName === undefined)|| (profileName === null)) {
        navigate('/profiles/manage');
    }

    console.log(profileName)

  return (
    <div>ProfileEdit</div>
  )
}

export default ProfileEdit;