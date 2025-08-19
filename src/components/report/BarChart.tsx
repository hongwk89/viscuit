import { TotalPriceData } from '@/pages/calculateReport';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = ({ data }: { data: TotalPriceData }) => {
  const months = [...Object.keys(data.report), ...Object.keys(data.expect)];
  const monthsData = months.reverse().map((val, idx) => {
    const month = parseInt(val.slice(4, 6));

    if (idx < Object.keys(data.expect).length) {
      return month + '월 예상';
    }

    return month + '월';
  });
  const price = [
    ...Object.values(data.report).map((val) => val.process.price + val.search.price),
    ...Object.values(data.expect),
  ].reverse();

  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: '',
    },
    xAxis: {
      title: {
        text: null,
      },
      categories: monthsData,
      gridLineWidth: 0,
      lineWidth: 0,
    },
    yAxis: {
      title: {
        text: null,
      },
      gridLineWidth: 1,
    },
    plotOptions: {
      bar: {
        borderRadius: '5px',
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
      series: {
        colorByPoint: true,
      },
    },
    legend: {
      enabled: false, // 범례 숨기기
    },
    series: [
      {
        name: '총비용',
        data: price.slice(0, 6).map((val, idx) => ({
          y: val,
          color: idx === 0 || idx === 1 ? '#FBFCFF' : null,
          borderColor: idx === 0 || idx === 1 ? '#E4E7EA' : null,
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
