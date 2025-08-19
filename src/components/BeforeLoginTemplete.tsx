import React, { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 70px 0;
  h2 {
    font-size: 40px;
    margin-bottom: 70px;
    text-align: center;
  }
  .content {
    position: relative;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
    padding: 60px;
  }
`;

const BeforeLoginTemplete = ({ children }: { children: ReactNode }) => {
  return (
    <ContentWrap>
      <h2>
        <Link href="/">VISCUIT</Link>
      </h2>
      <div className="content">{children}</div>
    </ContentWrap>
  );
};
export default BeforeLoginTemplete;
