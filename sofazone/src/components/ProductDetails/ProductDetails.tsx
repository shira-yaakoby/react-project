import React, { FC, useEffect, useState } from 'react';
import './ProductDetails.scss';
import Header from '../Header/Header';
import { useParams } from 'react-router';
import { ProductModel } from '../../models/ProductModel';

interface ProductDetailsProps { }

const ProductDetails: FC<ProductDetailsProps> = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductModel | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;
  return (
    <div className="ProductDetails">
      <Header />

      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="300" />
      <p><strong>description:</strong> {product.description}</p>
      <p><strong>category:</strong> {product.category}</p>
      <p><strong>price:</strong> {product.price} $</p>
      {/* <p><strong>buyCount:</strong> {product.buyCount} times</p> */}
      <div>
        <button className='btn'>add to cart</button>
        <br />
        -<label>amount</label>+
        <div>המלצות</div>
      </div>
    </div>
  );
}

export default ProductDetails;
