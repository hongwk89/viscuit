import { CalculateData } from '@/pages/calculateReport';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CircleChart = ({ data }: { data: CalculateData }) => {
  const previousMonth = Object.values(data)[0];

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: '정산 요약',
        data: [
          {
            name: 'Processed Products',
            y: previousMonth.process.price,
          },
          {
            name: 'Search Request',
            y: previousMonth.search.price,
          },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CircleChart;
