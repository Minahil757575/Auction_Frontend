// src/pages/AuctionItemsPage.jsx
import { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import AuctionCard from "../components/AuctionCard";
import { getActiveItemsPaginated } from "../services/api";

export default function AuctionItemsPage() {
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
      className="min-h-screen p-8"
      style={{
        backgroundColor: "#000", // solid black background
        color: "#fff", // default white text
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#00FF7F", // green heading
          marginBottom: "2rem",
          textAlign: "center",
          textShadow: "0 0 15px rgba(0,255,127,0.1)", // glowing effect
        }}
      >
        Active Auctions
      </h1>

      <Row gutter={[24, 24]} justify="center">
        {items.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <div
              style={{
                background: "#111", // card background slightly lighter than black
                border: "1px solid rgba(0,255,127,0.2)", // subtle green border
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 4px 20px rgba(0, 255, 127, 0.1)", // green glow
                height: "100%",
              }}
            >
              <AuctionCard item={item} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
