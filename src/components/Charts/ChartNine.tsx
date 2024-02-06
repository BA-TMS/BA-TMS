import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DropdownIconLarge } from '@/assets/SVGs';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartNineState {
  series: { data: number[] }[];
}

// is another bar chart
// should name better when we have our own data
const ChartNine: React.FC = () => {
  const [state, setState] = useState<ChartNineState>({
    series: [
      {
        data: [268, 385, 201, 298, 187, 195, 291],
      },
      {
        data: [345, 160, 291, 187, 195, 298, 201],
      },
    ],
  });

  // Update the state
  const updateState = () => {
    setState((prevState) => ({
      ...prevState,
      // Update the desired properties
    }));
  };
  updateState;

  const options: ApexOptions = {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      type: 'bar',
      height: 250,
      width: '100%',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '35%',
        // endingShape: 'rounded',
        borderRadius: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',

      markers: {
        radius: 99,
      },
    },
    // yaxis: {
    //   title: false,
    // },
    grid: {
      strokeDashArray: 7,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      // y: {
      //   formatter: function (val) {
      //     return val;
      //   },
      // },
    },
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-col gap-2 border-b border-stroke py-5 px-6 dark:border-strokedark sm:flex-row sm:justify-between">
        <div>
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Campaigns
          </h2>
        </div>
        <div className="flex items-center">
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

      <div className="px-6 pt-4">
        <div id="chartNine" className="-ml-5">
          <ApexCharts
            options={options}
            series={state.series}
            type="bar"
            height={options.chart?.height}
            width={options.chart?.width}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartNine;
