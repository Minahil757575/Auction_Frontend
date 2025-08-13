import "./AuctionForm.css";
import { Form, Input, InputNumber, Button, Card, message } from "antd";
import { createItem } from "../services/api";
import { ThunderboltOutlined } from "@ant-design/icons";

export default function AuctionForm({ onItemCreated }) {
  const onFinish = async (values) => {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        startingPrice: values.startingPrice,
        durationInHours: Math.floor(values.durationInHours),
      };

      const res = await createItem(payload);
      message.success("Item created successfully!");
      if (onItemCreated) onItemCreated(res.data);
    } catch (err) {
      if (err.response) {
        const backendMsg = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(", ")
          : err.response.data.message;
        message.error(`Error: ${backendMsg}`);
      } else {
        message.error("Unexpected error");
      }
    }
  };

  return (
    <div className="auction-page">
      {/* Left Column - Intro */}
      <div className="auction-intro">
        <ThunderboltOutlined className="auction-icon" />
        <h2>Welcome to the Aura-ction System</h2>
        <p>
        Discover, bid, and win! Our online auction platform connects you with rare collectibles, exclusive deals, 
        and one-of-a-kind treasures from sellers worldwide. Join the excitement, place your bids in real-time, 
        and experience the thrill of winning your next prized possession. <br/><br/>
        <strong>Start bidding today — your next big win is just a click away!</strong>
    </p>
      </div>

      {/* Right Column - Form */}
      <div className="auction-form-container">
        <Card title="Create Auction Item">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input placeholder="Enter item name" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} placeholder="Enter description" />
            </Form.Item>
            <Form.Item
              name="startingPrice"
              label="Starting Price"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="durationInHours"
              label="Duration (hours)"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} step={1} style={{ width: "100%" }} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Create Item
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
