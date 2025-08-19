import styled from 'styled-components';
import ArrowFirstPrev from '../icons/arrow_firstPrev.svg';
import ArrowLastNext from '../icons/arrow_lastNext.svg';
import ArrowNext from '../icons/arrow_next.svg';
import ArrowPrev from '../icons/arrow_prev.svg';
import React from 'react';
import { Gray, InputDisable, ViscuitColor } from '@/common/colors';

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0 80px;
  div {
    margin: 0 32px;
  }
`;

const PaginationButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive', // 'sidebar' 속성이 DOM으로 전달되지 않도록 필터링
})<{ isActive?: boolean }>`
  padding: 3px;
  width: 24px;
  height: 24px;
  margin: 0 4px;
  border-radius: 5px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? ViscuitColor : Gray)};
  color: ${({ isActive }) => (isActive ? 'white' : InputDisable)};
  cursor: pointer;

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

interface Pagination {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, handlePageChange }: Pagination) => {
  return (
    <PaginationWrapper>
      <ArrowFirstPrev onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
      <ArrowPrev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
      <div>
        {Array.from({ length: totalPages }, (_, idx) => (
          <PaginationButton
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            isActive={currentPage === idx + 1}
          >
            {idx + 1}
          </PaginationButton>
        ))}
      </div>
      <ArrowNext
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <ArrowLastNext
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </PaginationWrapper>
  );
};
export default Pagination;
