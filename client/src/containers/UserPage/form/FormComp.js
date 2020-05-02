import { Button, Form, Input, Row, Col } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React, { useEffect} from "react";
import FormWrapper from "../../shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { User, Mail} from "react-feather";
import UpdateAvatar from "./UpdateAvatar";
import {Link} from 'react-router-dom'
const FormComp = ({ form }) => {
    const dispatch = useDispatch();
    const saveLoading = useSelector(selectors.selectSaveLoading);
    const record = useSelector(selectors.selectRecord);
    let { userId } = useParams();
    let doSubmit = values => {
        dispatch(actions.doUpdate(values));
    };

    useEffect(() => {
        dispatch(actions.doFind(userId));
    }, []);

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
                    <Row type="flex" justify="center">
                        <Col>
                            <UpdateAvatar
                                picture={
                                    record
                                        ? `${process.env.REACT_APP_STATIC_URI}/images/users/${record.picture}`
                                        : null
                                }
                                onSuccess={(picture) =>
                                    dispatch(actions.doChangeAvatar(picture))
                                }
                            />
                        </Col>
                    </Row>
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
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Form.Item
                                style={{
                                    display: "inline-block",
                                    width: "calc(50% - 12px)",
                                }}
                                label="First Name"
                            >
                                {form.getFieldDecorator("firstname", {
                                    initialValue:
                                        record && record.firstname
                                            ? record.firstname
                                            : "",
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Firstname!",
                                        },
                                        {
                                            min: 2,
                                            message: "At less 2 characters!",
                                        },
                                        {
                                            max: 20,
                                            message:
                                                "Must be 20 characters or less!",
                                        },
                                    ],
                                })(
                                    <Input
                                        id="firstname"
                                        prefix={
                                            <User
                                                size={16}
                                                strokeWidth={1}
                                                style={{
                                                    color: "rgba(0,0,0,.25)",
                                                }}
                                            />
                                        }
                                        placeholder="First Name"
                                    />
                                )}
                            </Form.Item>
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "24px",
                                    textAlign: "center",
                                }}
                            ></span>
                            <Form.Item
                                style={{
                                    display: "inline-block",
                                    width: "calc(50% - 12px)",
                                }}
                                label="Last Name"
                            >
                                {form.getFieldDecorator("lastname", {
                                    initialValue:
                                        record && record.lastname
                                            ? record.lastname
                                            : "",
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Please input your Lastname!",
                                        },
                                        {
                                            min: 2,
                                            message: "At less 2 characters!",
                                        },
                                        {
                                            max: 20,
                                            message:
                                                "Must be 20 characters or less!",
                                        },
                                    ],
                                })(
                                    <Input
                                        id="lastname"
                                        prefix={
                                            <User
                                                size={16}
                                                strokeWidth={1}
                                                style={{
                                                    color: "rgba(0,0,0,.25)",
                                                }}
                                            />
                                        }
                                        placeholder="Last Name"
                                    />
                                )}
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Email">
                            {form.getFieldDecorator("email", {
                                initialValue:
                                    record && record.email ? record.email : "",
                                rules: [
                                    {
                                        type: "email",
                                        message:
                                            "The input is not valid E-mail!",
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
