import React, { lazy, Suspense } from 'react';
import HomePage from './HomePage';

// const LazyHomePage = lazy(() => import('./HomePage'));

// const HomePage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
//   <Suspense fallback={null}>
//     <LazyHomePage {...props} />
//   </Suspense>
// );

export default HomePage;
