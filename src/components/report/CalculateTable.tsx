import { ChangeEvent, useEffect, useState } from 'react';
import SelectBox from '../SelectBox';
import styled from 'styled-components';
import { Secondary } from '@/common/colors';
import Pagination from '../Pagination';
import { CalculateData, CalculateDataItem } from '@/pages/calculateReport';
import axios from 'axios';

const SelectBoxWrap = styled.div`
  display: flex;
  justify-content: right;
  padding: 10px 0;
  div {
    border: none;
    &::before {
      display: none;
    }
  }
`;

const TableWrap = styled.table`
  width: 100%;
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

interface TestData {
  [key: string]: {
    name: string;
    region: string;
    bucket: string;
    process: { price: number; cases: number };
    search: { price: number; cases: number };
  };
}

const TEST_DATA: TestData = {
  202403: {
    name: '프로젝트명',
    region: 'Southeast Asia',
    bucket: 'aisum-bucket',
    process: { price: 374677, cases: 2342343 },
    search: { price: 789098, cases: 2342343 },
  },
  202404: {
    name: '프로젝트명',
    region: 'Southeast Asia',
    bucket: 'aisum-bucket',
    process: { price: 345634, cases: 2342343 },
    search: { price: 345345, cases: 2342343 },
  },
  202405: {
    name: '프로젝트명',
    region: 'Southeast Asia',
    bucket: 'aisum-bucket',
    process: { price: 365654, cases: 2342343 },
    search: { price: 799876, cases: 2342343 },
  },
  202406: {
    name: '프로젝트명',
    region: 'Southeast Asia',
    bucket: 'aisum-bucket',
    process: { price: 567654, cases: 2342343 },
    search: { price: 367856, cases: 2342343 },
  },
  202407: {
    name: '프로젝트명',
    region: 'Southeast Asia',
    bucket: 'aisum-bucket',
    process: { price: 976855, cases: 2342343 },
    search: { price: 787765, cases: 2342343 },
  },
  202408: {
    name: '프로젝트명',
    region: 'Southeast Asia',
    bucket: 'aisum-bucket',
    process: { price: 123234, cases: 2342343 },
    search: { price: 453434, cases: 2342343 },
  },
  202409: {
    name: '프로젝트명',
    region: 'Southeast Asia',
    bucket: 'aisum-bucket',
    process: { price: 574313, cases: 2342343 },
    search: { price: 523543, cases: 2342343 },
  },
};

const view_number = [
  { value: '12', label: '12개씩 보기' },
  { value: '50', label: '50개씩 보기' },
  { value: '100', label: '100개씩 보기' },
];

const DataList: React.FC<{ date: string; data: CalculateDataItem }> = ({ date, data }) => {
  const change_date = date.slice(0, 4) + '-' + date.slice(4, 6);
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
    </tr>
  );
};

const CalculateTable = () => {
  const [viewNumber, setViewNumber] = useState('12');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (newPage: number) => {
    get_data(12, newPage);
    setCurrentPage(newPage);
  };

  const get_data = async (count: number, page: number) => {
    await axios
      .get('https://viscuitapi.aedi.ai/get_calculate_table', {
        params: {
          count,
          page,
        },
      })
      .then((res) => {
        if (res.data.status === 'S') {
          setTotalPages(100);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    get_data(12, 1);
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {Object.keys(TEST_DATA)
            .reverse()
            .map((key) => (
              <DataList key={key} date={key} data={TEST_DATA[key]} />
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

export default CalculateTable;
