import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
// import DropdownDefault from "../Dropdowns/DropdownDefault";
import dynamic from 'next/dynamic';
import { GreenArrowIcon } from '@/assets/SVGs';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CampaignAreaState {
  series: {
    name: string;
    data: number[];
  }[];
}

const CampaignAreaChart: React.FC = () => {
  const [state, setState] = useState<CampaignAreaState>({
    series: [
      {
        name: 'Product One',
        data: [168, 285, 131, 248, 187, 295, 191, 269, 201, 185, 252, 151],
      },

      {
        name: 'Product Two',
        data: [268, 185, 251, 198, 287, 205, 281, 199, 259, 185, 150, 111],
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
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#13C296', '#3C50E0'],
    chart: {
      height: 200,
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
      width: [2, 2],
      curve: 'smooth',
    },

    markers: {
      size: 0,
    },
    // labels: {
    //   show: false,
    //   position: 'top',
    // },
    grid: {
      strokeDashArray: 7,
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
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h4 className="text-title-sm2 font-bold text-black dark:text-white">
            Campaign Visitors
          </h4>
          <div className="mt-2.5 flex gap-2.5">
            <h3 className="mb-1.5 text-title-lg font-bold text-black dark:text-white">
              $560.93
            </h3>
            <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
              {GreenArrowIcon}
              +2.5%
            </span>
          </div>
          <span className="mt-1 block font-medium">
            Average cost per interaction
          </span>
        </div>
        {/* <DropdownDefault /> */}
      </div>
      <div>
        <div id="chartSix" className="-ml-5">
          <ApexCharts
            options={options}
            series={state.series}
            type="area"
            height={options.chart?.height}
            width={options.chart?.width}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignAreaChart;
