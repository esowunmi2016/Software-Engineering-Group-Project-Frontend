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




function Dashboard() {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.fname)

    const [collapsed, setCollapsed] = useState(window.innerWidth >= 768 ? false:true);
    const [nav, setNav] = useState(1)
    const [schedule, setSchedule] = useState('')
    const [profile, setProfile] = useState('none')


    useEffect(() => {

        setUserState()

    })


    const setUserState =()=>{
        var token = jwt_decode(localStorage.getItem('synergyToken'))
        dispatch(setUser(token.data))
    }

    const sider = [
        {
            id: 1,
            name:'Schedule',
            icon: CalendarOutlined,
        },
        {
            id: 2,
            name:'Pay-Slip History',
            icon: HistoryOutlined,
        },
        {
            id: 3,
            name:'Profile',
            icon: UserOutlined,
        },
    ]


    const navHandler =(x)=>{
        if(x.key == '1'){
            setSchedule('')
            setProfile('none')
        }else if(x.key == '2'){
            console.log('Pay Slip History Month')
        }else if (x.key == '3'){
            setProfile('')
            setSchedule('none')
        }
        window.innerWidth >= 576 ? setCollapsed(collapsed):setCollapsed('true')
        
    }


    const { Header, Content, Footer, Sider } = Layout;

  
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
                            <Calendar display={schedule} />
                            <Profile display={profile} />
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