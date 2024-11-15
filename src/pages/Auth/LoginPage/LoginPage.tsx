import { FC, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { message } from "antd";
import { LoginUserInput } from "../../../types/user";
import classes from "./Login.module.css";
import useFMcore from "../../../hooks/useFMcore";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAuthService from "../../../services/AuthService";

// import { useStore } from "../../../hooks/useStore";
// import useStoreService from "../../../services/StoreService";
// import { useTranslate } from "../../../hooks/useTranslate";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const { FMcore } = useFMcore();
  // const { login } = useAuthService();
  const { isAuthenticated } = useAuth();
  // const { lang } = useTranslate();
  const navigate = useNavigate();
  // const { _, handleLanguageChange } = useTranslate();
  // const { getDomainConfigs } = useStoreService();

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/troubleshoot");
  //   if (isAuthenticated)
  //     localStorage.lastLocation ? navigate(`${localStorage.lastLocation}`) : navigate(`/troubleshoot`);
  //   getDomainConfigs();
  //   handleLanguageChange(lang);
  // }, []);
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, []);

  const onFinish = async (values: LoginUserInput) => {
    const { username, password } = values;
    try {
      const res = await FMcore.login(username, password);
      console.log("res :>> ", res);
      if (res && res.data.token) {
        // res.data => {token: string, user: { ...domainConfigs}}
        /* TODO:  should store token, user data */
        // navigate("/dashboard");
      }
    } catch (error) {
      message.error("Failed to login!");
    }
  };

  return (
    <div className={classes.container}>
      <Form
        style={{ width: 480 }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="username"
          name="username"
          rules={[
            {
              required: true,
              message: "please_input_your_username",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "please_input_your_password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            bt_sign_in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
