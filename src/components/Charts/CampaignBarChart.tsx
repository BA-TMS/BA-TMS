import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { RedArrowIcon } from '@/assets/SVGs';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CampaignBarState {
  series: { data: number[] }[];
}

const CampaignBar: React.FC = () => {
  const [state, setState] = useState<CampaignBarState>({
    series: [
      {
        data: [168, 385, 201, 298, 187, 195, 291],
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
    colors: ['#3C50E0'],
    chart: {
      type: 'bar',
      height: 350,
      width: '100%',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '25%',
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
      show: true,
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
    <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="flex justify-between border-b border-stroke py-5 px-6 dark:border-strokedark">
        <div>
          <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">
            Campaign Visitors
          </h2>
          <p className="text-sm font-medium">Last Campaign Performance</p>
        </div>
        <div>
          <h3 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">
            784k
          </h3>
          <p className="flex items-center justify-end gap-1 text-right">
            {RedArrowIcon}
            <span className="text-sm font-medium text-red">-1.5%</span>
          </p>
        </div>
      </div>

      <div className="py-7.5 px-6">
        <div id="chartFive" className="-ml-5">
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

export default CampaignBar;
