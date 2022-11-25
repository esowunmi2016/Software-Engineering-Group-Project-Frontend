import { UserOutlined, HistoryOutlined, CalendarOutlined } from '@ant-design/icons';
import { Layout, Menu, Progress, Card } from 'antd';
import {WeeklyCalendar} from 'antd-weekly-calendar';  
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import { setUser } from '../../redux/user';
import Calendar from '../../components/calender';
import Profile from './profile';
import EmployeeTable from './employeeTable';
import { useNavigate } from 'react-router-dom';




function Dashboard() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.fname);

    const [collapsed, setCollapsed] = useState(window.innerWidth >= 768 ? false:true);
    // const [nav, setNav] = useState(1);
    const [epmloyees, setEmployees] = useState('');
    const [profile, setProfile] = useState('none');

    const [employeeData, setEmployeeData] = useState([])





    const setUserState =()=>{
        var token = jwt_decode(localStorage.getItem('synergyToken'))
        console.log(token.data)
        dispatch(setUser(token.data))
    }

    const fetchPayments =()=>{
        fetch(
            'http://localhost:8080/hrEmployees', 
            //    `https://swe-backend.azurewebsites.net/hrEmployees`, 
            //    `https://swe-backend-2.azurewebsites.net/hrEmployees`, 
            {
                headers:{
                    'token':localStorage.getItem('synergyToken')
                }
            }
        )
        .then(res => res.json())
        .then( res => {
            if(res.name === 'TokenExpiredError'){
                navigate('/')
            }else{
                setEmployeeData(res)
            }
        })
    }

    const sider = [
        {
            id: 1,
            name:'Employees',
            icon: CalendarOutlined,
        },
        {
            id: 2,
            name:'Profile',
            icon: UserOutlined,
        },
    ]


    const navHandler =(x)=>{
        if(x.key == 1){
            setEmployees('')
            setProfile('none')
        }else if(x.key == 2){
            setEmployees('none')
            setProfile('')
        }
        window.innerWidth >= 576 ? setCollapsed(collapsed):setCollapsed('true')
        
    }


    const { Header, Content, Footer, Sider } = Layout;

    useEffect(() => {
        console.log('first')
        fetchPayments()
        setUserState()
    }, [userData])

  
    return ( 
        <>
           <Layout style={{height:'100vh', maxWidth:'100vw', maxHeight:'100vh'}}>
                <Sider
                    style={{
                        height:'100vh',
                        borderRadius:'3px'
                    }}
                    breakpoint={window.innerWidth < 576 ? 'sm':'lg'}
                    collapsedWidth={window.innerWidth < 576 ? '0':'80'}
                    collapsible
                    collapsed={collapsed} onCollapse={value => setCollapsed(value)}
                    // onBreakpoint={broken => {
                    //     console.log(broken);
                    // }}
                    // onCollapse={(collapsed, type) => {
                    //     console.log(collapsed, type);
                    // }}
                >
                    <div className="logo" 
                        style={{
                            height:'32px',
                            margin:'16px',
                            background:'rgba(255, 255, 255, 0.2)',
                        }}
                    />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={sider.map(
                            (x) => ({
                                key: x.id,
                                icon: React.createElement(x.icon),
                                label: x.name,
                            }),
                        )}
                        onClick={navHandler}
                        // items={[CalendarOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                        //     (icon, index) => ({
                        //         key: String(index + 1),
                        //         icon: React.createElement(icon),
                        //         label: `nav ${index + 1}`,
                        //     }),
                        // )}
                    />
                </Sider>

                <Layout>
                    {/* <Header 
                        className="site-layout-sub-header-background" 
                        style={{ 
                            padding: 0, 
                            background:'#fff', 
                            width:'98%', 
                            marginLeft:'1%', 
                            marginTop:'1%',
                        }} 
                    /> */}
                    <Content style={{ margin: '24px 16px 0px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height:'90vh' , background:'blue', borderRadius:'10px' }}>
                            <Profile display={profile} />
                            <EmployeeTable display={epmloyees} data={employeeData} />
                        </div>
                        
                    <Footer 
                        style={{ 
                            textAlign: 'center', 
                            background:'#ff',
                            display: window.innerWidth >= 576 ? '' : collapsed ? '':'none'
                            // marginTop:'10%'
                        }}>
                            Ant Design ©2018 Created and designed by <a href='https://www.linkedin.com/in/emmanuel-sowunmi-505706174/' target={'_blank'}>Emmanuel Sowunmi</a>
                    </Footer>
                    </Content>

                </Layout>
            </Layout>
        </>
     );
}

export default Dashboard;