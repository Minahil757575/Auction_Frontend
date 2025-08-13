import { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import AuctionForm from "../components/AuctionForm";
import AuctionCard from "../components/AuctionCard";
import { getActiveItemsPaginated } from "../services/api";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const res = await getActiveItemsPaginated();
      setItems(res.data.data);
    } catch {
      message.error("Failed to load items");
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000", 
        minHeight: "100vh", 
        padding: "24px",
        color: "#fff", 
      }}
    >
      <AuctionForm onItemCreated={loadItems} />
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            {/* <AuctionCard item={item} /> */}
          </Col>
        ))}
      </Row>
    </div>
  );
}
