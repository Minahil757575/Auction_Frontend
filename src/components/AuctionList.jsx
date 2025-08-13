import { useEffect, useState } from "react";
import { Row, Col, Pagination, Spin, message } from "antd";
import AuctionCard from "./AuctionCard";
import { getItemsPaginated } from "../services/api";

export default function AuctionList() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadItems = async (pageNum) => {
    try {
      setLoading(true);
      const res = await getItemsPaginated(pageNum);
      setItems(res.data.data);
      setMeta(res.data.meta);
    } catch {
      message.error("Failed to load auction items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems(page);
  }, [page]);

  if (loading) return <Spin tip="Loading auctions..." />;

  return (
    <>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <AuctionCard item={item} />
          </Col>
        ))}
      </Row>
      <div className="mt-4 flex justify-center">
        <Pagination
          current={meta.currentPage || 1}
          total={meta.totalRecords || 0}
          pageSize={5}
          onChange={(p) => setPage(p)}
        />
      </div>
    </>
  );
}
