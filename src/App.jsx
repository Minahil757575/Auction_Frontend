import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Dashboard from "./pages/Dashboard";
import AuctionDetail from "./pages/AuctionDetail";
import AuctionItemsPage from "./pages/AuctionItemsPage";

import "./App.css";

const { Header, Content } = Layout;

export default function App() {
  return (
    <BrowserRouter>
      <Layout className="min-h-screen">
        <Header>
          <div className="nav-title">Aura-ction System</div>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/auction/items">View Auctions</Link>
          </div>
          {/* <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item key="dashboard">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
          </Menu> */}
        </Header>
        <Content className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/auction/items" element={<AuctionItemsPage />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}
