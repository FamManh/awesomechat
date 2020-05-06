import React from "react";
import { Button, Form, Input, Typography, Row } from "antd";
import { Eye } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import selectors from "../selectors";
const FormItem = Form.Item;
const { Text } = Typography;

const Content = styled.div`
    max-width: 400px;
    z-index: 2;
    min-width: 300px;
`;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ChangePassword = ({ form }) => {
    const dispatch = useDispatch();
    const query = useQuery();
    const loading = useSelector(selectors.selectChangePasswordLoading)
    const error = useSelector(selectors.selectChangePasswordError)
    const doSubmit = (userInfo) => {
        const email = query.get("email");
        const resetToken = query.get("resetToken")
        dispatch(actions.doChangePassword({...userInfo, email, resetToken}));
    };

    return (
        <Row
            type="flex"
            align="middle"
            justify="center"
            className="px-3 bg-white"
            style={{ minHeight: "100vh" }}
        >
            <Content>
                <div className="text-center mb-5">
                    <Link to="/signup">
                        <span className="brand mr-0">
                            {/* <Triangle size={32} strokeWidth={1} /> */}
                            <img width="150" src="/logo-chat.png" />
                        </span>
                    </Link>
                    <h5 className="mb-0 mt-3">Change password</h5>
                </div>

                {/* Display errors  */}
                <div className="mb-3">
                    <Text type="danger">{error}</Text>
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
                    <FormItem label="Password">
                        {form.getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                                {
                                    min: 6,
                                    message: "At less 6 characters!",
                                },
                                {
                                    max: 128,
                                    message: "Must be 128 characters or less!",
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

                    <FormItem label="Confirm password">
                        {form.getFieldDecorator("confirm", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                {
                                    validator: (rule, value, callback) => {
                                        if (
                                            value &&
                                            value !==
                                                form.getFieldValue("password")
                                        ) {
                                            callback("Passwords don't match!");
                                        } else {
                                            callback();
                                        }
                                    },
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
                                placeholder="Confirm password"
                            />
                        )}
                    </FormItem>

                    <FormItem>
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            Change password
                        </Button>
                    </FormItem>
                </Form>
            </Content>
        </Row>
    );
};

export default Form.create()(ChangePassword);
