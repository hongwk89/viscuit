import { Cancel } from '@/common/colors';
import { MainSection, SubSection } from '@/components/MainSection';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import Calender from '../icons/calender.svg';
import Button from '@/components/ButtonComponent';
import LineChart from '@/components/report/LineChart';
import DateTable from '@/components/report/DateTable';
import axios from 'axios';
import useToken from '@/hooks/zustand/useToken';

const DateSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 30px;
  .date {
    position: relative;
    width: 235px;
    height: 48px;
    > svg {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
      z-index: 5;
    }
    input {
      width: 235px;
      height: 48px;
      border-radius: 5px;
      border: 1px solid ${Cancel};
      padding-left: 48px;
      font-size: 14px;
      font-family: 'Pretendard';
    }
  }
  button {
    margin-left: 14px;
  }
`;

const ChartArea = styled.div`
  padding: 40px 50px;
  .highcharts-credits {
    display: none;
  }
`;

const TableArea = styled.div``;

const TESTDATA = {
  data: {
    202409: {
      20240924: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 374677, cases: 2342343 },
        search: { price: 789098, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
      20240925: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 345634, cases: 2342343 },
        search: { price: 345345, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
      20240926: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 365654, cases: 2342343 },
        search: { price: 799876, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
      20240927: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 567654, cases: 2342343 },
        search: { price: 367856, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
      20240928: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 976855, cases: 2342343 },
        search: { price: 787765, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
      20240929: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 123234, cases: 2342343 },
        search: { price: 453434, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
      20240930: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 574313, cases: 2342343 },
        search: { price: 523543, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
    },
    202410: {
      20241001: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 567345, cases: 2342343 },
        search: { price: 234534, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
      20241002: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 234234, cases: 2342343 },
        search: { price: 676345, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
      20241003: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 679679, cases: 2342343 },
        search: { price: 790767, cases: 2342343 },
        error: 'Invalid DB URL Data format',
      },
    },
  },
};

interface Value {
  price: number;
  cases: number;
}

export interface DataItem {
  name: string;
  region: string;
  bucket: string;
  process: Value;
  search: Value;
  error: string;
}

export interface DataProps {
  data: { [key: string]: { [key: string]: DataItem } };
}

const DailyReport = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const { token } = useToken();

  useEffect(() => {
    if (!date) return;
    const new_date = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

    axios
      .get('https://viscuitapi.aedi.ai/get_daily_report', {
        params: {
          date: new_date,
        },
      })
      .then((res) => {
        if (res.data.status === 'S') {
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  }, [date]);

  return (
    <>
      <MainSection title="일자별 보고서">
        <DateSearch>
          <div className="date">
            <Calender />
            <DatePicker
              selected={date}
              dateFormat="yyyy-MM"
              showMonthYearPicker
              onChange={(date) => setDate(date)}
            />
          </div>
          <Button label="Search" height="48px" />
        </DateSearch>
      </MainSection>
      <SubSection>
        <ChartArea>
          <LineChart data={TESTDATA.data} />
        </ChartArea>
        <TableArea>
          <DateTable data={TESTDATA.data} />
        </TableArea>
      </SubSection>
    </>
  );
};

export default DailyReport;
