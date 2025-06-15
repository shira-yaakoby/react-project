import React, { FC, useEffect, useState } from 'react';
import './ProductDetails.scss';
import Header from '../Header/Header';
import { useParams } from 'react-router';
import { Product } from '../../models/Product';

interface ProductDetailsProps { }

const ProductDetails: FC<ProductDetailsProps> = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>טוען...</p>;
  return (
    <div className="ProductDetails">
      <Header />

      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="300" />
      <p><strong>תיאור:</strong> {product.description}</p>
      <p><strong>קטגוריה:</strong> {product.category}</p>
      <p><strong>מחיר:</strong> {product.price} ₪</p>
      <p><strong>נמכר:</strong> {product.buyCount} פעמים</p>
    </div>
  );
}

export default ProductDetails;
