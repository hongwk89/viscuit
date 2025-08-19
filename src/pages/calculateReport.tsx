import { MainSection, SubSection } from '@/components/MainSection';
import Calender from '../icons/calender.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Cancel } from '@/common/colors';
import { useEffect, useState } from 'react';
import ButtonComponent from '@/components/ButtonComponent';
import CircleChart from '@/components/report/CircleChart';
import BarChart from '@/components/report/BarChart';
import CalculateTable from '@/components/report/CalculateTable';
import axios from 'axios';

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

const SubSectionWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin: -102px 50px 134px 50px;
  > div {
    width: calc(50% - 16px);
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 25px 0px #0000001a;
    padding: 30px;
    &:last-child {
      width: 100%;
      padding: 0;
    }
    .highcharts-credits {
      display: none;
    }
  }
`;

const TESTDATA = {
  data: {
    expect: {
      202411: 300000,
      202412: 280000,
    },
    report: {
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
      202410: {
        name: '프로젝트명',
        region: 'Southeast Asia',
        bucket: 'aisum-bucket',
        process: { price: 574313, cases: 2342343 },
        search: { price: 523543, cases: 2342343 },
      },
    },
  },
  pagination: {
    page: 1,
    count: 12,
    total: 50,
  },
};

export interface CalculateDataItem {
  name: string;
  region: string;
  bucket: string;
  process: { price: number; cases: number };
  search: { price: number; cases: number };
  error?: string; // error가 있을 수 있으므로 선택적으로 설정
}

export interface CalculateData {
  [key: string]: CalculateDataItem;
}

export interface TotalPriceData {
  expect: { [key: string]: number };
  report: CalculateData;
}

const CalculateReport = () => {
  const currentDate = new Date(); // 현재 날짜
  const currentMonth = currentDate.getMonth(); // 현재 월 (0이 1월)
  const previousMonth = new Date(currentDate.setMonth(currentMonth - 1));
  const [date, setDate] = useState<Date | null>(previousMonth);

  useEffect(() => {
    if (!date) return;
    const new_date = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

    axios
      .get('https://viscuitapi.aedi.ai/get_calculate_report', {
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
          <ButtonComponent label="Search" height="48px" />
        </DateSearch>
      </MainSection>
      <SubSectionWrap>
        <div>
          <h3>{previousMonth.getMonth() + 1}월 정산 요약</h3>
          <CircleChart data={TESTDATA.data.report} />
        </div>
        <div>
          <h3>월 별 총비용</h3>
          <BarChart data={TESTDATA.data} />
        </div>
        <div>
          <CalculateTable />
        </div>
      </SubSectionWrap>
    </>
  );
};
export default CalculateReport;
