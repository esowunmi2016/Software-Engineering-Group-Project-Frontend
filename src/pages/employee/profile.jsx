import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import {useSelector} from 'react-redux';


function Profile(props) {

    const userData = useSelector(state => state.user)

    return ( 
        <div style={{display:props.display}}>
            <div className="container text-center">
                <Avatar size={200} icon={<UserOutlined />} />
                <div className='container' >
                    <div className='h1'>{userData.fname}  {userData.lname}  </div>
                </div>
            </div>
        </div>
     );
}

export default Profile;