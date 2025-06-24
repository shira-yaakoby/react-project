import React, { lazy, Suspense } from 'react';
import AddProduct from './AddProduct';

// const LazyAddProduct = lazy(() => import('./AddProduct'));

// const AddProduct = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
//   <Suspense fallback={null}>
//     <LazyAddProduct {...props} />
//   </Suspense>
// );

export default AddProduct;
