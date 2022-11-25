import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../redux/user';
import { Table, Tag, Button, Space, Modal, Form, Input, Popconfirm, Radio, message } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import user from "../../redux/user";

function EmployeeTable(props) {

  
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.fname)

  const navigate = useNavigate()
  
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState(3);
  const [postRoute, setPostRoute] = useState()
  const [id, setId] = useState()
  const [manager, setManager] = useState('')
  // const [radio, setRadio] = useState(true)

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const addEmployee =(data)=>{
    // console.log(data)
    fetch(
        'http://localhost:8080/hrAddEmployee', 
        //    `https://swe-backend.azurewebsites.net/hrAddEmployee`, 
            // `https://swe-backend-2.azurewebsites.net/hrAddEmployee`, 
        {
          body: JSON.stringify(data),
          method:'POST',
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              'token':localStorage.getItem('synergyToken')
          }
      }
    )
    .then(res => res.json())
    .then( res => {
        if(res.name === 'TokenExpiredError'){
            navigate('/')
        }else{
          console.log(res)
          if(res.notification == 1){
            message.success(res.message)
          }else{
            message.error(res.message)
          }
          setVisible(false)
          dispatch(setUser(userData))
        }
    })
  }

  const udpdateEmployee =(data)=>{
    fetch(
        'http://localhost:8080/hrUpdateEmployee', 
          //  `https://swe-backend-2.azurewebsites.net/hrUpdateEmployee`, 
        {
            headers:{
              'token':localStorage.getItem('synergyToken'),
              "Content-type": "application/json; charset=UTF-8",
            },
            method:'POST',
            body: JSON.stringify(data)
        }
    )
    .then(res => res.json())
    .then( res => {
        if(res.name === 'TokenExpiredError'){
            navigate('/')
        }else{
          console.log(res)
          setVisible(false)
          if(res.notification == 1){
            message.success(res.message)
          }else{
            message.error(res.message)
          }
          dispatch(setUser(userData))
        }
    })
  }

  const deleteEmployee =(x)=>{
    fetch(
        'http://localhost:8080/hrDeleteEmployee', 
        //    `https://swe-backend.azurewebsites.net/employee`, 
          //  `https://swe-backend-2.azurewebsites.net/hrDeleteEmployee`, 
        {
            headers:{
              "Content-type": "application/json; charset=UTF-8",
              'token':localStorage.getItem('synergyToken'),
            },
            body:JSON.stringify({
              id: x
            }),
            method:'POST'
        }
    )
    .then(res => res.json())
    .then( res => {
        if(res.name === 'TokenExpiredError'){
            navigate('/')
        }else{
          console.log(res)
          message.success(res.message)
          dispatch(setUser(userData))
        }
    })
  }

  const updateRoute =(x)=>{
    setId(x, setPostRoute('update', setVisible(!visible, console.log(postRoute))))
    // setPostRoute('update', setVisible(!visible, console.log(visible)))
  }
  
  const addRoute =()=>{
    setPostRoute('add', setVisible(!visible, console.log(postRoute)))
  }
 
  const deleteRoute =(x)=>{
    deleteEmployee(x)
    console.log('delete', x)
  }

  
  const onFinish = (values) => {
    
    console.log(values)
    if(values.role == 3 && value.manage == undefined){
      values.manage = 'no manager'
    }
    
    if(postRoute == 'add'){
      addEmployee(values)
      // console.log(values)
    }else if(postRoute == 'update'){
      values.id = id
      udpdateEmployee(values)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      // width:'10%',
      // width:window.innerWidth < 576 ? '10%':'15%',
      render: (text, name) => <p>{name.first} {name.last}</p>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      // width:window.innerWidth < 576 ? '10%':'',
    //   render: x=>(new Date(x).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      // width:window.innerWidth < 576 ? '10%':'',
      render:x=>(<>
        {
            x === 3 ? (<Tag color="geekblue">Epmloyee</Tag>):(<Tag color="green">Manager</Tag>)
        }
      </> )
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      // width:window.innerWidth < 576 ? '':'10%',
      render:x=>(
        <>
          <Button type="pirmary" onClick={()=>updateRoute(x)}> Update </Button>
          <Popconfirm onConfirm={()=>deleteRoute(x)} title="Are you sure you want to delete this employee" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
            <Button type="danger"> Delete </Button>
          </Popconfirm>
        </>
        )
    },
  ];

  useEffect(() => {
    console.log('first')
  },[visible])
  
  
    return (
      <>
        <div style={{display:props.display}}>
            <Space style={{ marginBottom: 16 }}>
              <Button onClick={()=>addRoute()}>Add Employee</Button>
            </Space>
            <Table dataSource={props.data} columns={columns} size="small" scroll={{ x:window.innerWidth < 576 ? 500:'' , y:400 }} />  
        </div>

        {/* FORM MODAL */}
        <Modal
          visible={visible}
          onCancel={()=>setVisible(false)}
          footer={null}
          centered
          destroyOnClose
        >
          <Form
            name="hr"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="small"
            style={{paddingTop:'10%'}}
          >
            <Form.Item
              label="First Name"
              name="first"
              rules={[{ required: true, message: 'Please input employee first name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last"
              rules={[{ required: true, message: 'Please input employee last name!' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Please input employee role!' }]}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={3}>Employee</Radio>
                <Radio value={2}>Manager</Radio>
                <Radio value={1}>HR</Radio>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input employee email!' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              label="Address"
              name="address"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Required' }]}
              initialValue
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              label="Manager email"
              name="manage"
              // rules={[{ required: true, message: 'Please input employee managers email!' }]}
              hidden = {value == 3 ? false:true}
              // initialValue={manager}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
     );
}

export default EmployeeTable;