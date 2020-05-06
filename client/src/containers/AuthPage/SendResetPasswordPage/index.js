import React from "react";
import { Button, Form, Input, Row } from "antd";
import { Mail} from "react-feather";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from '../actions'
import selectors from "../selectors";
import Text from "antd/lib/typography/Text";
const FormItem = Form.Item;

const Content = styled.div`
    max-width: 400px;
    z-index: 2;
    min-width: 300px;
`;

const SendResetPassword = ({ form }) => {
    const dispatch = useDispatch();
    const loading = useSelector(selectors.selectSendResetPasswordLoading)
    const error = useSelector(selectors.selectSendResetPasswordError)
    const sendResetPassword = (data) => {
        dispatch(actions.doSendResetPassword(data));
    }
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
                    <Link to="/forgot">
                        <span className="brand mr-0">
                            <img width="150" src="/logo-chat.png" />
                        </span>
                    </Link>
                    <h5 className="mb-0 mt-3">Reset your password</h5>
                </div>
                <p className="text-muted">
                    Enter your user account's verified email address and we will
                    send you a password reset link.
                </p>
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
                                // Message.success(
                                //   'Reset email sent. Please check your inbox!'
                                // ).then(() => Router.push('/signin'));
                                sendResetPassword(values);
                            }
                        });
                    }}
                >
                    <FormItem label="Email">
                        {form.getFieldDecorator("email", {
                            rules: [
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
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
                                type="email"
                                placeholder="Email"
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
                            Reset password
                        </Button>
                    </FormItem>

                    <div className="text-center">
                        <small className="text-muted text-center">
                            <span>Don't have an account yet?</span>
                            <Link to="/signup">
                                <span>&nbsp;Create one now!</span>
                            </Link>
                        </small>
                    </div>
                </Form>
            </Content>
        </Row>
    );
};

export default Form.create()(SendResetPassword);
