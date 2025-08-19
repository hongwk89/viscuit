// src/pages/_app.tsx
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React from 'react';
import type { AppProps } from 'next/app';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import MenuButton from '@/components/MenuButton';
import 'highlight.js/styles/dark.css';
import axios from "axios";

axios.defaults.withCredentials = true;

interface MainProps {
  sidebar: boolean;
}

const Container = styled.div`
  display: flex;
`;

const Main = styled.main.withConfig({
  shouldForwardProp: (prop) => prop !== 'sidebar', // 'sidebar' 속성이 DOM으로 전달되지 않도록 필터링
})<MainProps>`
  margin-left: ${({ sidebar }) => (sidebar ? '260px' : '0')};
  height: 100%;
  min-height: 100vh;
  flex: 1;
  background: #f5f5f7;
`;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const exceptPath = ['login', 'signUp', 'findPw', 'changePw'];
  const except = !exceptPath.some((path) => pathname.includes(path));

  return (
    <Container>
      {except && <Sidebar />}
      {except && <MenuButton />}
      <Main sidebar={except}>
        <Component {...pageProps} />
      </Main>
    </Container>
  );
};

export default MyApp;
