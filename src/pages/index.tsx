import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/project');
  }, [router]);

  return null;
};

export default HomePage;

// // import React, { ReactNode } from 'react';

// // const HomePage: React.FC = (): ReactNode  => {
// //   return (
// //     <div>
// //       <h1>Home Page</h1>
// //       <p>Welcome to the home page!</p>
// //     </div>
// //   );
// // };

// export default HomePage;
