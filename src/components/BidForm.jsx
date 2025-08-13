import { useState } from "react";
import { InputNumber, Button, message } from "antd";
import { placeBid } from "../services/api";

export default function BidForm({ itemId, currentHighestBid, onBidPlaced }) {
  const [amount, setAmount] = useState(currentHighestBid + 1);
  const [loading, setLoading] = useState(false);

  const handlePlaceBid = async () => {
    if (amount <= currentHighestBid) {
      message.error("Bid must be higher than current highest bid");
      return;
    }
    setLoading(true);
    try {
      await placeBid(itemId, {
        userId: "f6769116-ba6b-4389-94f4-95da5e6a9f24", // test user
        amount
      });
      message.success("Bid placed successfully!");
      onBidPlaced();
    } catch {
      message.error("Failed to place bid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <InputNumber
        min={currentHighestBid + 1}
        value={amount}
        onChange={(val) => setAmount(val)}
      />
      <Button
        type="primary"
        onClick={handlePlaceBid}
        loading={loading}
      >
        Place Bid
      </Button>
    </div>
  );
}
