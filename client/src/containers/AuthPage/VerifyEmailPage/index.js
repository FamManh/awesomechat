import React from "react";
import { Button, Form, Input, Row, Typography } from "antd";
import { Mail, Triangle } from "react-feather";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FormItem = Form.Item;
const { Text } = Typography;

const Content = styled.div`
    max-width: 400px;
    z-index: 2;
    min-width: 300px;
`;

const SendVerificationEmail = ({ form }) => {

    const doSubmit = ({ email }) => {
        // dispatch(actions.verifyEmail(email));
    };
    return (
        <Row
            type="flex"
            align="middle"
            justify="center"
            className="px-3 bg-white"
            style={{
                minHeight: "100vh"
            }}
        >
            <Content>
                <div className="text-center mb-5">
                    <Link to="/forgot">
                        <a className="brand mr-0">
                            <Triangle size={32} strokeWidth={1} />
                        </a>
                    </Link>
                    <h5 className="mb-0 mt-3">Resend verification email</h5>

                    {/* <p className="text-muted">
                        receive password reset instructions.
                    </p> */}
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
                                    type: "email",
                                    message: "The input is not valid E-mail!"
                                },
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
                                        style={{
                                            color: "rgba(0,0,0,.25)"
                                        }}
                                    />
                                }
                                type="email"
                                placeholder="Email"
                            />
                        )}
                    </FormItem>

                    <FormItem>
                        <Button
                            // loading={useSelector(
                            //     selectors.loadingEmailConfirmation
                            // )}
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            Resend verification email
                        </Button>
                    </FormItem>

                    <div className="text-center">
                        <small className="text-muted">
                            <span>Don't have an account yet</span>{" "}
                            <Link to="/signup">
                                <span>&nbsp; Create one now</span>
                            </Link>
                        </small>
                    </div>
                </Form>
            </Content>
        </Row>
    );
};

export default Form.create()(SendVerificationEmail);
