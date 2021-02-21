import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../store/appReducer";
import {Redirect} from 'react-router-dom'
import styled from 'styled-components';

import {Form, Input, Button, Checkbox, Divider} from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Login = () => {

    let dispatch = useDispatch();
    let auth = useSelector(state => state.app.auth);
    let validationMessage = useSelector(state => state.app.auth.message);
    let captcha = useSelector(state => state.app.captcha);

    const onFinish = (values) => {
        const {email, password, rememberMe, captcha} = values;
        dispatch(login(email, password, rememberMe, null, captcha))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>{!auth.isAuth
            ? (
                <>
                    <Divider>It's Login Page</Divider>

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input/>
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
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...tailLayout} name="rememberMe" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <ValidationMessage>
                            {validationMessage && <span>{validationMessage}</span>}
                        </ValidationMessage>
                        {captcha && (
                            <div style={{display: "flex", flexDirection: "column", margin: "20px 0 0 0"}}>
                                <img src={captcha} alt="captcha"/>
                                <Form.Item
                                    label="Captcha"
                                    name="captcha"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input captcha!',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            </div>
                        )}
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )
            : (
                <Redirect to="/pokemons"/>
            )
        }

        </>
    )
};

export default Login;

const ValidationMessage = styled.div`
  text-align: center;
  margin: 10px 0;
`