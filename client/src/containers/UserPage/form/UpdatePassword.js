import { Button, Form, Input, Row } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React from "react";
import FormWrapper, {
} from "../../shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
import {  Eye } from "react-feather";
import { Link } from "react-router-dom";
const FormComp = ({ form }) => {
    const dispatch = useDispatch();
    const saveLoading = useSelector(selectors.selectSaveLoading);
    let doSubmit = values => {
        dispatch(actions.doUpdatePassword(values));
    };

    let renderForm = () => {
        return (
            <Row
                type="flex"
                align="middle"
                justify="center"
                className="px-3 bg-white"
                style={{ minHeight: "100vh" }}
            >
                <FormWrapper>
                    <Form
                        style={{ maxWidth: "500px" }}
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
                        <Form.Item label="Old Password">
                            {form.getFieldDecorator("oldPassword", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your old Password!",
                                    },
                                    {
                                        min: 6,
                                        message: "At less 6 characters!",
                                    },
                                    {
                                        max: 128,
                                        message:
                                            "Must be 128 characters or less!",
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
                                    placeholder="Old password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="New Password">
                            {form.getFieldDecorator("newPassword", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your new Password!",
                                    },
                                    {
                                        min: 6,
                                        message: "At less 6 characters!",
                                    },
                                    {
                                        max: 128,
                                        message:
                                            "Must be 128 characters or less!",
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
                                    placeholder="New password"
                                />
                            )}
                        </Form.Item>

                        <Form.Item label="Confirm password">
                            {form.getFieldDecorator("confirm", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please confirm your password!",
                                    },
                                    {
                                        validator: (rule, value, callback) => {
                                            if (
                                                value &&
                                                value !==
                                                    form.getFieldValue(
                                                        "newPassword"
                                                    )
                                            ) {
                                                callback(
                                                    "Passwords don't match!"
                                                );
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
                        </Form.Item>
                        <Form.Item className="form-buttons">
                            <Button
                                loading={saveLoading}
                                type="primary"
                                htmlType="submit"
                                icon="save"
                            >
                                Save
                            </Button>
                            <Link to="/">
                                <Button icon="rollback">Back</Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </FormWrapper>
            </Row>
        );
    };

    // if (dataLoading) {
    //     return <Spinner />;
    // }

    // if (isEditing() && !record) {
    //     return <Spinner />;
    // }
    return renderForm();
};

export default Form.create()(FormComp);
