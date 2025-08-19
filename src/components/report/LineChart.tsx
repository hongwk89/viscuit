import { DataProps } from '@/pages/dailyReport';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = ({ data }: DataProps) => {
  const previousMonth = Object.keys(data)[0].slice(4, 6);
  const currentMonth = Object.keys(data)[1].slice(4, 6);
  const previousMonthData = Object.values(data)[0];
  const currentMonthData = Object.values(data)[1];
  const days = Object.keys(previousMonthData).map((key) => key.slice(6, 8));
  const previousMonthTotalPrice = Object.values(previousMonthData).map(
    (val) => val.process.price + val.search.price
  );
  const currentMonthTotalPrice = Object.values(currentMonthData).map(
    (val) => val.process.price + val.search.price
  );

  const options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: days,
    },
    yAxis: {
      title: {
        text: '총비용',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
    },
    series: [
      {
        name: parseInt(previousMonth) + '월 일별 총 비용',
        data: previousMonthTotalPrice,
      },
      {
        name: parseInt(currentMonth) + '월 일별 총 비용',
        data: currentMonthTotalPrice,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;
