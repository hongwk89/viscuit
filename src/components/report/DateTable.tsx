import { ChangeEvent, useEffect, useState } from 'react';
import SelectBox from '../SelectBox';
import styled from 'styled-components';
import { DataItem, DataProps } from '@/pages/dailyReport';
import { Secondary } from '@/common/colors';
import Pagination from '../Pagination';

const SelectBoxWrap = styled.div`
  display: flex;
  justify-content: right;
  div {
    border: none;
    &::before {
      display: none;
    }
  }
`;

const TableWrap = styled.table`
  width: 100%;
  margin-top: 10px;
  th,
  td {
    text-align: center;
    vertical-align: middle;
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7) {
      text-align: right;
    }
  }
  th {
    height: 55px;
    background: #f0f0f3;
    padding: 0 16px;
  }
  tr:nth-child(even) {
    td {
      background: #f7f8fa;
    }
  }
  td {
    height: 66px;
    padding: 0 16px;
    &:nth-child(2),
    &:nth-child(4) {
      text-align: left;
    }
    &:nth-child(1) {
      min-width: 140px;
    }
    &:nth-child(2) {
      min-width: 243px;
    }
    &:nth-child(3) {
      min-width: 160px;
    }
    &:nth-child(4) {
      min-width: 243px;
    }
    &:nth-child(5) {
      min-width: 200px;
    }
    &:nth-child(6) {
      min-width: 160px;
    }
    &:nth-child(7) {
      min-width: 148px;
    }
    &:nth-child(8) {
      min-width: 243px;
    }
    span {
      font-size: 12px;
      color: ${Secondary};
    }
  }
`;

const view_number = [
  { value: '15', label: '15개씩 보기' },
  { value: '30', label: '30개씩 보기' },
  { value: '100', label: '전체 보기' },
];

const DataList: React.FC<{ date: string; data: DataItem }> = ({ date, data }) => {
  const change_date = date.slice(0, 4) + '-' + date.slice(4, 6) + '- ' + date.slice(6, 8);
  const total_price = data.process.price + data.search.price;
  const total_cases = data.process.cases + data.search.cases;
  return (
    <tr>
      <td>{change_date}</td>
      <td>{data.name}</td>
      <td>{data.region}</td>
      <td>{data.bucket}</td>
      <td>
        {data.process.price.toLocaleString()}
        <br />
        <span>({data.process.cases.toLocaleString()} 건)</span>
      </td>
      <td>
        {data.search.price.toLocaleString()}
        <br />
        <span>({data.search.cases.toLocaleString()} 건)</span>
      </td>
      <td>
        {total_price.toLocaleString()}
        <br />
        <span>({total_cases.toLocaleString()} 건)</span>
      </td>
      <td>{data.error}</td>
    </tr>
  );
};

const DateTable = ({ data }: DataProps) => {
  const mergeData = Object.values(data).reduce((acc, monthData) => ({ ...acc, ...monthData }));
  const [viewNumber, setViewNumber] = useState('15');
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(Object.keys(mergeData).length / parseInt(viewNumber));

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SelectBoxWrap>
        <SelectBox
          options={view_number}
          width="150px"
          value={viewNumber}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => setViewNumber(event.target.value)}
        />
      </SelectBoxWrap>
      <TableWrap>
        <thead>
          <tr>
            <th>날짜</th>
            <th>프로젝트명</th>
            <th>리전</th>
            <th>버킷명</th>
            <th>Processed Products</th>
            <th>Search Request</th>
            <th>총비용</th>
            <th>Last Error</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(mergeData)
            .reverse()
            .slice((currentPage - 1) * parseInt(viewNumber), currentPage * parseInt(viewNumber))
            .map((key: string) => (
              <DataList key={key} date={key} data={mergeData[Number(key)]} />
            ))}
        </tbody>
      </TableWrap>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default DateTable;
