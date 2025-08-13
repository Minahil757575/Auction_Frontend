import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActiveItems, placeBid, getBidsForItem } from "../services/api";
import { Card, InputNumber, Button, List, message, Spin } from "antd";
import CountdownTimer from "../components/CountdownTimer";
import "./AuctionDetail.css";

export default function AuctionDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [bids, setBids] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getActiveItems();
      console.log("Active items API response:", res.data);

      const itemsArray =
        res.data.items || res.data.data || res.data.content || res.data || [];

      const found = Array.isArray(itemsArray)
        ? itemsArray.find((i) => String(i.id) === String(id))
        : null;

      if (!found) {
        message.error("Item not found");
        setItem(null);
        return;
      }

      setItem(found);

      const bidsRes = await getBidsForItem(id);
      setBids(bidsRes.data || []);
    } catch (err) {
      console.error(err);
      message.error("Error loading auction");
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async () => {
    if (!item) return;

    // Validation: bid must be higher
    if (amount <= item.currentHighestBid) {
      message.error("Bid must be higher than current highest bid");
      return;
    }

    try {
      const userId = localStorage.getItem("userId") || "7dcac0c8-cc76-42e2-87c1-2eaa89ac1690";

      await placeBid(id, {
        userId,
        amount, // sending the actual bid amount
      });

      message.success("Bid placed successfully!");
      loadData();
    } catch (err) {
      console.error(err);
      message.error("Error placing bid");
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="auction-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!item) {
    return <p className="auction-not-found">Auction item not found.</p>;
  }

  return (
    <div className="auction-detail-page">
      <Card title={item.name} className="auction-detail-card mb-4">
        <p>{item.description}</p>
        <p>Starting Price: ${item.startingPrice}</p>
        <p>Highest Bid: ${item.currentHighestBid}</p>
        <CountdownTimer endTime={item.endTime} />
        <div className="bid-input-section">
          <InputNumber
            min={item.currentHighestBid + 1}
            value={amount}
            onChange={setAmount}
            className="bid-input"
          />
          <Button
            type="primary"
            onClick={handleBid}
            className="place-bid-btn"
          >
            Place Bid
          </Button>
        </div>
      </Card>

      <Card title="Bids" className="auction-bids-card">
        {bids.length > 0 ? (
          <List
            dataSource={bids}
            renderItem={(bid) => (
              <List.Item key={bid.id || bid.userId + bid.amount}>
                User: {bid.userId} — Amount: ${bid.amount}
              </List.Item>
            )}
          />
        ) : (
          <p>No bids yet.</p>
        )}
      </Card>
    </div>
  );
}
