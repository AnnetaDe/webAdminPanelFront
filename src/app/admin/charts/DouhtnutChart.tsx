import { Loader } from '@/components/ui/loader/Loader';
import statisticsService from '@/services/statistics.service'; // Assuming this has your fetch function
import { useQuery } from '@tanstack/react-query';
import {
  ArcElement,
  ChartData,
  ChartOptions,
  Legend,
  Tooltip,
  Chart,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const doughnutOptions: ChartOptions<'doughnut'> = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
  },
};

export const DoughnutChart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['doughnut-chart'],
    queryFn: () => statisticsService.getCountByCountry(),
    select({ data }): ChartData<'doughnut'> {
      return {
        labels: data.map(item => item.country),
        datasets: [
          {
            label: 'Number of users',
            data: data.map(item => item.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching data.</div>;
  if (!data) return <div>No data available.</div>;

  return <Doughnut data={data} options={doughnutOptions} />;
};
