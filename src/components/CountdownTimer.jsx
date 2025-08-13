import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function CountdownTimer({ endTime }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = dayjs(endTime).diff(dayjs(), "second");
      if (diff <= 0) {
        setTimeLeft("Auction Ended");
        clearInterval(timer);
      } else {
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return <p>Time Left: {timeLeft}</p>;
}
