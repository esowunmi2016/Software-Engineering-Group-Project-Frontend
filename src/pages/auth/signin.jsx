
import { login } from "../../functions/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import
 { 
    Form,
    Input,
    Button,
    message,
    Result,
 } from "antd";
import { setUser } from "../../redux/user";


 
 
 function Signin() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [loading, setloading] = useState(false)

    const navigate = useNavigate()

    const info = (x) => {
       if(x == 1 | x == 2 | x == 3){
            navigate(`/dashboard${x}`)
       }else{
            message.error(x);
       }
       
   };
   
    const onFinish = (values) => {
        setloading(true)
        fetch(
           'http://localhost:8080/login', 
           // 'https://swe-backend.azurewebsites.net/', 
           {
               method:'POST',
               body: JSON.stringify(values),
               headers: {
                   "Content-type": "application/json; charset=UTF-8"
               }
           }
        )
        .then(res => res.json())
        .then((res) => {
                // console.log(escape(res))
                console.log(res)
                if(res.error == "wrongPassword"){
                    info('Wrong Password')
                }else if(res.error == 'wrongEmail'){
                    info('Email Not Found')
                }else{
                    localStorage.setItem('synergyToken' , res.token)
                    info(res.id)
                }
            setloading(false)
        })
        .catch(error => console.log(error)) 
    };
   
   const onFinishFailed = (errorInfo) => {
       console.log('Failed:', errorInfo);
   };


    return ( 
        <>
            <div style={{height:'100vh', width:'100%'}}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-4 d-flex justify-content-center align-items-center h-100 text-center">
                        <div 
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                background:'grey',
                                height:'60%',
                                width:'80%',
                                borderRadius:'3%'
                            }}>
                                <Form
                                    name="babo"
                                    layout="vertical"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="email"
                                        name="email"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                        Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Signin;