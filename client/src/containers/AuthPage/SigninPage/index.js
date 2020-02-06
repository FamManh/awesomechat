import React from "react";
import { Button, Form, Input, Typography, Row } from "antd";
import { Eye, Mail, Triangle } from "react-feather";
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

    const doSubmit = ({ username, password }) => {
        dispatch(actions.doSignin(username, password));
    };
    return (
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
                            <Triangle size={32} strokeWidth={1} />
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
                        {/* {useSelector(selectors.selectErrorMessage)} */}
                    </Text>
                </div>
                <Form
                    layout="vertical"
                    onSubmit={e => {
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
                                    message: "Please input your E-mail!"
                                }
                            ]
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

                    <FormItem label="Password">
                        {form.getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Password!"
                                }
                            ]
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
                            // loading={useSelector(selectors.selectLoading)}
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
                            <span>
                                Don't have an account yet?
                            </span>{" "}
                            <Link to="/signup">
                                <span>
                                    &nbsp;{" "}
                                    Create one now!
                                </span>
                            </Link>
                        </small>
                    </div>
                </Form>
            </Content>
        </Row>
    );
};

export default Form.create()(Signin);
