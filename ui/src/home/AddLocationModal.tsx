import React, { useState } from "react";
import { Modal, Button, Form, Input, InputNumber } from "antd";
import { Location } from "../types/locationTypes";
interface AddLocationModalProps {
    onSubmit: (location: Location) => void;
}

export const AddLocationModal = ({ onSubmit }: AddLocationModalProps) => {
    const [visible, setVisible] = useState(false);

    const onCreate = (values: any) => {
        console.log("Received values of form: ", values);
        onSubmit(values as Location)
        setVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Add Location
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

interface AddLocationFormProps {
    visible: boolean;
    onCreate: (values: Location) => void;
    onCancel: () => void;
}

const CollectionCreateForm = ({
    visible,
    onCreate,
    onCancel
}: AddLocationFormProps) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Add a new Location"
            okText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: "public" }}
            >
                <Form.Item
                    name="name"
                    label="Location Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of the location!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="populationSize"
                    label="Current Estimated Population"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Current Estimated Population!"
                        }
                    ]}
                >
                    <InputNumber style={{width: '100%'}} min="0"/>
                </Form.Item>

                <Form.Item
                    name="apiEndpoint"
                    label="API Endpoint"
                    rules={[
                        {
                            required: true,
                            message: "Please input a valid URL! (e.g. https://www.google.com)",
                            type: 'url'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="resourceURL"
                    label="URL of Resource"
                    rules={[
                        {
                            required: true,
                            message: "Please input a valid URL! (e.g. https://www.google.com)",
                            type: 'url'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

