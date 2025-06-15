import React, { lazy, Suspense } from 'react';
import Cart from './Cart';

// const LazyCart = lazy(() => import('./Cart'));

// const Cart = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
//   <Suspense fallback={null}>
//     <LazyCart {...props} />
//   </Suspense>
// );

export default Cart;
