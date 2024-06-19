'use client';

interface DropdownProps {
  label: string;
}

export default function Dropdown({ label }: DropdownProps) {
  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="w-full min-w-40 body1 h-14 p-4 text-grey-500 border border-grey-300 rounded-lg dark:bg-grey-800 dark:border-grey-700 dark:text-white focus:outline-none text-center inline-flex items-center box-border"
        type="button"
      >
        {label}
        <svg
          className="w-2.5 h-2.5 ms-3"
          width="15"
          height="8"
          viewBox="0 0 15 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.0003 7.50128C6.76665 7.50173 6.54021 7.42036 6.3603 7.27128L0.360298 2.27128C-0.0649608 1.91781 -0.123164 1.28653 0.230298 0.861275C0.583761 0.436016 1.21504 0.377813 1.6403 0.731275L7.0003 5.21128L12.3603 0.891275C12.5669 0.723505 12.8318 0.645006 13.0965 0.673159C13.3611 0.701313 13.6036 0.833795 13.7703 1.04128C13.9554 1.24913 14.0456 1.52475 14.019 1.80183C13.9924 2.07892 13.8516 2.33238 13.6303 2.50128L7.6303 7.33127C7.44521 7.45679 7.2234 7.51665 7.0003 7.50128Z"
            fill="#637381"
          />
        </svg>
      </button>

      {/* menu */}
      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

// export default function Dropdown() {}
