import type { FormProps } from 'antd';
import { App, Button, Form, Input } from 'antd';
import { loginAPI } from '../../services/api';
import { useNavigate } from 'react-router';

type FieldType = {
    username: string;
    password: string;
};



const LoginPage = () => {
    const { notification } = App.useApp()
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { password, username } = values

        try {
            const res = await loginAPI(username, password)
            if (res?.data) {
                const accessToken = res.data.accessToken
                localStorage.setItem("accessToken", accessToken)

                navigate("/")
            }
        }
        catch (error: any) {
            const message = error?.response?.data?.message ?? "unknown"

            notification.error({
                message: "Something happened!",
                description: message
            })
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "60px" }}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout='vertical'
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )

};

export default LoginPage;