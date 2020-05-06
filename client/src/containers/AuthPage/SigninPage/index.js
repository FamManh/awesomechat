import React, { useEffect } from "react";
import { Button, Form, Input, Typography, Row, Spin } from "antd";
import { Eye, Mail } from "react-feather";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from '../actions';
import selectors from '../selectors';
const FormItem = Form.Item;
const { Text } = Typography;
const Content = styled.div`
    max-width: 400px;
    z-index: 2;
    min-width: 300px;
`;

const Signin = ({ form }) => {
    const dispatch = useDispatch();

    const signinLoading = useSelector(selectors.selectSigninLoading);
    const initLoading = useSelector(selectors.selectInitLoading)

    const doSubmit = (userInfo) => {
        dispatch(actions.doSignin(userInfo));
    };

    useEffect(() => {
        dispatch(actions.doInitLoadingDone());
    },[])
    return (
        <Spin spinning={initLoading}>
            <Row
                type="flex"
                align="middle"
                justify="center"
                className="px-3 bg-white mh-page"
                style={{ minHeight: "100vh" }}
            >
                <Content>
                    <div className="text-center mb-5">
                        <Link to="/signin">
                            <span className="brand mr-0">
                                {/* <Triangle size={32} strokeWidth={1} /> */}
                                <img width="150" src="/logo-chat.png" />
                            </span>
                        </Link>
                        <h5 className="mb-0 mt-3">Sign in</h5>

                        <p className="text-muted">
                            get started with our service
                        </p>
                    </div>

                    {/* Display errors  */}
                    <div className="mb-3">
                        <Text type="danger">
                            {useSelector(selectors.selectSigninError)}
                        </Text>
                    </div>
                    <Form
                        layout="vertical"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.validateFields((err, values) => {
                                if (!err) {
                                    doSubmit(values);
                                }
                            });
                        }}
                    >
                        <FormItem label="Email">
                            {form.getFieldDecorator("email", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your E-mail!",
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Mail
                                            size={16}
                                            strokeWidth={1}
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="text"
                                    placeholder="Email"
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label={
                                <span>
                                    <span>Password</span>
                                    <span style={{ float: "right" }}>
                                        <Link
                                            tabIndex={1000}
                                            to="/password-reset"
                                        >
                                            <span>Forgot password?</span>
                                        </Link>
                                    </span>
                                </span>
                            }
                        >
                            {form.getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Eye
                                            size={16}
                                            strokeWidth={1}
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </FormItem>

                        <FormItem>
                            <Button
                                loading={signinLoading}
                                type="primary"
                                htmlType="submit"
                                block
                                className="mt-3"
                            >
                                Login
                            </Button>
                        </FormItem>

                        <div className="text-center">
                            <small className="text-muted">
                                <span>Don't have an account yet?</span>{" "}
                                <Link to="/signup">
                                    <span>&nbsp; Create one now!</span>
                                </Link>
                            </small>
                        </div>
                    </Form>
                </Content>
            </Row>
        </Spin>
    );
};

export default Form.create()(Signin);
