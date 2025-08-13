
import React from "react";
import { Card, Tag, Button } from "antd";
import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router-dom";
import "./AuctionCard.css"; // Import the CSS file

export default function AuctionCard({ item }) {
  if (!item) return null;

  return (
    <Card title={item.name} className="auction-card">
      <p className="auction-description">{item.description}</p>

      <p className="auction-price">
        Starting Price: <b>${item.startingPrice}</b>
      </p>

      <p className="auction-price">
        Highest Bid: <b>${item.currentHighestBid ?? item.startingPrice}</b>
      </p>

      <CountdownTimer endTime={item.endTime} />

      <Tag
        color={item.isActive ? "green" : "red"}
        className="auction-status"
      >
        {item.isActive ? "Active" : "Ended"}
      </Tag>

      <div className="auction-btn-container">
        <Link to={`/auction/${item.id}`}>
          <Button type="primary" className="auction-btn">
            View Bids
          </Button>
        </Link>
      </div>
    </Card>
  );
}
