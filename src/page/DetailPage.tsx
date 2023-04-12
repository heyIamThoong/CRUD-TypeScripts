import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tproduct } from "../types/product";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";

type props = {
  product: Tproduct[];
};

const DetailPage = (props: props) => {
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
    
  });
  useEffect(() => {
    const data = props.product.find((item) => item._id == id);
    setProduct(data);
  }, [props.product]);
  console.log(product);

  return (
    <Row style={{marginLeft : 580}} gutter={[16, 16]}>
      <Col span={6}>
        <Card
          style={{ width: 280 }}
          cover={<img src={product.image} />}
        >
          <Meta
            title={product.name}
            description={product.price?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          />
          <p>{product.description}</p>
        </Card>
      </Col>
    </Row>
  );
};

export default DetailPage;
