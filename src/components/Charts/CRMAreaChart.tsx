import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DropdownIconLarge } from '@/assets/SVGs';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CRMAreaChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

const CRMAreaChart: React.FC = () => {
  const [state, setState] = useState<CRMAreaChartState>({
    series: [
      {
        name: 'Received Amount',
        data: [0, 20, 35, 45, 35, 55, 65, 50, 65, 75, 60, 75],
      },
      {
        name: 'Due Amount',
        data: [15, 9, 17, 32, 25, 68, 80, 68, 84, 94, 74, 62],
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

  // options needs to have width and height added or it will error
  // will also error if undefined at time of rendering
  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#C7D2E2'],
    chart: {
      height: 310,
      width: '100%',
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        // enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
            width: '100%',
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
            width: '100%',
          },
        },
      },
    ],
    stroke: {
      curve: 'smooth',
      // width: ['3.5', '3.5'],
    },

    markers: {
      size: 0,
    },
    // labels: {
    //   show: false,
    //   position: 'top',
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function (e) {
            return '';
          },
        },
      },
      marker: {
        show: !1,
      },
    },
    xaxis: {
      type: 'category',
      categories: [
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-title-sm2 font-bold text-black dark:text-white">
            Payments Overview
          </h4>
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
      <div>
        <div id="chartSeven" className="-ml-5">
          <ApexCharts
            options={options}
            series={state.series}
            type="area"
            height={options.chart?.height}
            width={options.chart?.width}
          />
        </div>
      </div>

      <div className="flex flex-col text-center xsm:flex-row">
        <div className="border-stroke py-2 dark:border-strokedark xsm:w-1/2 xsm:border-r">
          <p className="font-medium">Received Amount</p>
          <h4 className="mt-1 text-title-sm font-bold text-black dark:text-white">
            $45,070.00
          </h4>
        </div>
        <div className="py-2 xsm:w-1/2">
          <p className="font-medium">Due Amount</p>
          <h4 className="mt-1 text-title-sm font-bold text-black dark:text-white">
            $32,400.00
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CRMAreaChart;
