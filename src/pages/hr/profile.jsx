import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile(props) {

    const navigate = useNavigate()
    
    const logout =()=>{
        // localStorage.clear()
        navigate('/')
    }

    const userData = useSelector(state => state.user)

    return ( 
        <div style={{display:props.display}}>
            <div className="container text-center">
                <Avatar size={200} icon={<UserOutlined />} />
                <div className='container py-4'>
                    <div className='h1'>{userData.fname} {userData.lname}</div>
                    <div className='p'>adress: {userData.address}</div>
                </div>
                <div>
                    <Button type='primary' onClick={()=>logout()}>
                        Log Out
                    </Button>
                </div>
            </div>
        </div>
     );
}

export default Profile;