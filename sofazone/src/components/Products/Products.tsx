import React, { FC, useEffect, useState } from 'react';
import './Products.scss';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from '../../models/ProductModel';

const Products: FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('default');
  const productsNavigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = Array.from(new Set(data.map((p: ProductModel) => p.category))) as string[];
        setCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (category !== 'all') {
      updated = updated.filter(p => p.category === category);
    }

    if (sortOrder === 'asc') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'bestseller') {
    updated.sort((a, b) => b.buyCount - a.buyCount);
  }


    setFilteredProducts(updated);
  }, [category, sortOrder, products]);

  const handleClick = (id: string) => {
    productsNavigate(`/products/${id}`);
  };

  return <div className="Products">
      <Header />
      <div className="products-header">
        <div className="filters">
          <select onChange={e => setCategory(e.target.value)} value={category}>
            <option value="all">all</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select onChange={e => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="default">ללא מיון</option>
            <option value="asc">מהזול ליקר</option>
            <option value="desc">מהיקר לזול</option>
            <option value="bestseller">מומלצים</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleClick(product.id.toString())}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price} ₪</p>
          </div>
        ))}
      </div>
    </div>
  
};

export default Products;
