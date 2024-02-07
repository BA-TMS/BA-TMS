import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DropdownIconLarge } from '@/assets/SVGs';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DonutChartState {
  series: number[];
}

const DonutChart: React.FC = () => {
  const [state, setState] = useState<DonutChartState>({
    series: [70, 20, 10],
  });

  // Update the state
  const updateState = () => {
    setState((prevState) => ({
      ...prevState,
      // Update the desired properties
    }));
  };
  updateState;

  // options needs to have width and height added or it will error
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#0FADCF', '#80CAEE', '#3C50E0'],
    labels: ['Desktop', 'Tablet', 'Mobile'],
    legend: {
      show: false,
      position: 'bottom',
    },

    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
            height: 'auto',
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 250,
            height: 'auto',
          },
        },
      },
    ],
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-title-sm2 font-bold text-black dark:text-white">
            Used Devices
          </h4>
        </div>
        <div className="mt-2 flex items-center sm:mt-0">
          <p className="font-medium uppercase text-black dark:text-white">
            Sort by:
          </p>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 font-medium outline-none"
            >
              <option value="">Monthly</option>
              <option value="">Weekly</option>
            </select>
            <span className="absolute top-1/2 right-1 z-10 -translate-y-1/2">
              {DropdownIconLarge}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div id="chartEight" className="mx-auto flex justify-center">
          <ApexCharts
            options={options}
            series={state.series}
            type="donut"
            width={options.chart?.width}
            height={options.chart?.height}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full border-4 border-primary"></span>
            <span className="font-medium text-black-2 dark:text-white">
              Mobile
            </span>
          </div>

          <span className="inline-block rounded-md bg-primary py-0.5 px-1.5 text-xs font-medium text-white">
            10%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full border-4 border-secondary"></span>
            <span className="font-medium text-black-2 dark:text-white">
              Tablet
            </span>
          </div>

          <span className="inline-block rounded-md bg-secondary py-0.5 px-1.5 text-xs font-medium text-white">
            20%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="block h-4 w-4 rounded-full border-4 border-meta-10"></span>
            <span className="font-medium text-black-2 dark:text-white">
              Desktop
            </span>
          </div>

          <span className="inline-block rounded-md bg-meta-10 py-0.5 px-1.5 text-xs font-medium text-white">
            70%
          </span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
