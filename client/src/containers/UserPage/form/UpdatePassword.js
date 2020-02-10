import { Button, Form, Input, Row, Icon, Upload, message, Col } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React, { useEffect, useState } from "react";
import Spinner from "../../shared/Spinner";
import FormWrapper, {
    tailFormItemLayout,
    formItemLayout
} from "../../shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { User, Mail, Eye } from "react-feather";
import UpdateAvatar from "./UpdateAvatar";
const FormComp = ({ match, form }) => {
    const dispatch = useDispatch();
    const saveLoading = useSelector(selectors.selectSaveLoading);
    const dataLoading = useSelector(selectors.selectDataLoading);
    let { userId } = useParams();
    let doSubmit = values => {
        dispatch(actions.doUpdate(values));
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
                        onSubmit={e => {
                            e.preventDefault();
                            form.validateFields((err, values) => {
                                if (!err) {
                                    doSubmit(values);
                                }
                            });
                        }}
                    >
                        <Form.Item label="Password">
                            {form.getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Password!"
                                    },
                                    {
                                        min: 6,
                                        message: "At less 6 characters!"
                                    },
                                    {
                                        max: 128,
                                        message:
                                            "Must be 128 characters or less!"
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
                        </Form.Item>

                        <Form.Item label="Confirm password">
                            {form.getFieldDecorator("confirm", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please confirm your password!"
                                    },
                                    {
                                        validator: (rule, value, callback) => {
                                            if (
                                                value &&
                                                value !==
                                                    form.getFieldValue(
                                                        "password"
                                                    )
                                            ) {
                                                callback(
                                                    "Passwords don't match!"
                                                );
                                            } else {
                                                callback();
                                            }
                                        }
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
                                    placeholder="Confirm password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item className="form-buttons">
                            <Button
                                // loading={saveLoading}
                                type="primary"
                                htmlType="submit"
                                icon="save"
                            >
                                Save
                            </Button>
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
