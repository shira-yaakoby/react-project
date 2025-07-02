import React, { FC, useEffect, useState, FormEvent } from 'react';
import './AddProduct.scss';
import '../Products/Products.scss';
import { ProductModel } from '../../models/ProductModel';
import { useCategories } from '../../hooks/useCategories';
import { setMessage } from '../../store/MessageSlice';
import { MessageModel } from '../../models/MessageModel';
import { useDispatch } from 'react-redux';

interface AddProductProps {
  onClose: () => void;
}

const AddProduct: FC<AddProductProps> = (props: AddProductProps) => {
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { categories } = useCategories();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!image.trim()) newErrors.image = 'Image URL is required';
    else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(image)) newErrors.image = 'Invalid image URL';
    if (!category) newErrors.category = 'Category is required';
    if (!price.trim()) newErrors.price = 'Price is required';
    else if (isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Price must be a positive number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct = {
      title,
      description,
      image,
      category,
      price: Number(price),
      buyCount: 0
    };

    console.log('Submitting:', newProduct);


  };

  const addProduct = async () => {
    if (!validate()) return;

    const newProduct = {
      title,
      description,
      image,
      category,
      price: Number(price),
      buyCount: 0,
    };

    try {
      const res = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct),

      });

      if (!res.ok) {

        dispatch(setMessage({ type: 'error', text: 'Failed to add product.' }));
      }

      const savedProduct = await res.json();
      dispatch(setMessage({ type: 'success', text: 'Product added successfully.' }))
      console.log('Product saved:', savedProduct);

      props.onClose(); // סגירת טופס
    } catch (err) {
      dispatch(setMessage({ type: 'error', text: 'Failed to add product.' }));
      console.error(err);
    }
  };

  return (
    <div className="AddProduct">
      <div className="add-review">
        <span onClick={() => { props.onClose() }} style={{ cursor: 'pointer' }}>X</span>
        <h1>Add product</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
          {errors.title && <div className="error">{errors.title}</div>}

          <label htmlFor="description">Description</label>
          <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
          {errors.description && <div className="error">{errors.description}</div>}

          <label htmlFor="image">Image</label>
          <input type="url" id="image" value={image} onChange={e => setImage(e.target.value)} />
          {errors.image && <div className="error">{errors.image}</div>}

          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="" disabled hidden>categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <div className="error">{errors.category}</div>}

          <label htmlFor="price">Price</label>
          <input type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} />
          {errors.price && <div className="error">{errors.price}</div>}

          <br />
          <button type="submit" onClick={addProduct}>Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

