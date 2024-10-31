import { Input, Layout } from "antd";
import { AudioOutlined } from "@ant-design/icons";
const { Search } = Input;

const { Header, Footer, Content } = Layout;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

interface Props {
  children?: React.ReactNode;
}

export const PublicLayout = ({
  children,
  ...restProps
}: Props): JSX.Element => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          position: "fixed",
          zIndex: 1,
          width: "100%",
          height: 55,
          padding: 10,
          background: "#fefefe",
          boxShadow: "0px 2px 3px 1px rgba(0,0,0,.1)",
        }}
      >
        <div
          style={{
            minWidth: "180px",
            padding: 20,
            lineHeight: 0,
            fontSize: "20px",
            display: "inline-block",
          }}
        >
          Home
        </div>
        <Search
          style={{ borderRadius: "50px", width: 700 }}
          placeholder="input search text"
          size="middle"
          suffix={suffix}
          {...restProps}
        />
      </Header>
      <Layout>
        <Content style={{ paddingTop: 55, paddingLeft: 200 }}>
          {children}
        </Content>
      </Layout>
      <Footer>
        Copyright: <a href={"https://bit.al"}>bit.al</a>
      </Footer>
    </Layout>
  );
};

export default PublicLayout;
