import React, { lazy, Suspense } from 'react';
import About from './About';

// const LazyAbout = lazy(() => import('./About'));

// const About = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
//   <Suspense fallback={null}>
//     <LazyAbout {...props} />
//   </Suspense>
// );

export default About;
