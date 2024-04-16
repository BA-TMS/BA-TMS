const StartDate = () => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Start Date
      </label>
      <div className="relative">
        <div className="flatpickr-wrapper">
          <input
            className="form-datepicker w-48 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary flatpickr-input"
            placeholder="mm/dd/yyyy"
            data-class="flatpickr-right"
            type="text"
            readOnly={true}
          />
          <div
            className="flatpickr-calendar animate static arrowBottom arrowLeft arrowTop open"
            tabIndex={-1}
          >
            <div className="flatpickr-months">
              <span className="flatpickr-prev-month">
                <svg
                  className="fill-current"
                  width={7}
                  height={11}
                  viewBox="0 0 7 11"
                >
                  <path d="M5.4 10.811.4-1.4-4-4 4L5.4 0 0 5.4z"></path>
                </svg>
              </span>
              <div className="flatpickr-month">
                <div className="flatpickr-current-month">
                  <span className="cur-month">April </span>
                  <div className="numInputWrapper">
                    <input
                      className="numInput cur-year"
                      type="number"
                      tabIndex={-1}
                      aria-label="Year"
                    />
                    <span className="arrowUp"></span>
                    <span className="arrowDown"></span>
                  </div>
                </div>
              </div>
              <span className="flatpickr-next-month">
                <svg
                  className="fill-current"
                  width={7}
                  height={11}
                  viewBox="0 0 7 11"
                >
                  <path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z"></path>
                </svg>
              </span>
            </div>

            <div className="flatpickr-innerContainer">
              <div className="flatpickr-rContainer">
                <div className="flatpickr-weekdays">
                  <div className="flatpickr-weekdaycontainer">
                    <span className="flatpickr-weekday">Sun</span>
                    <span className="flatpickr-weekday">Mon</span>
                    <span className="flatpickr-weekday">Tue</span>
                    <span className="flatpickr-weekday">Wed</span>
                    <span className="flatpickr-weekday">Thu</span>
                    <span className="flatpickr-weekday">Fri</span>
                    <span className="flatpickr-weekday">Sat</span>
                  </div>
                </div>
                <div className="flatpickr-days" tabIndex={1}>
                  <div className="dayContainer">
                    <span
                      className="flatpickr-day prevMonthDay"
                      aria-label="March 31, 2024"
                      tabIndex={-1}
                    >
                      31
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 1, 2024"
                      tabIndex={-1}
                    >
                      1
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 2, 2024"
                      tabIndex={-1}
                    >
                      2
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 3, 2024"
                      tabIndex={-1}
                    >
                      3
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 4, 2024"
                      tabIndex={-1}
                    >
                      4
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 5, 2024"
                      tabIndex={-1}
                    >
                      5
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 6, 2024"
                      tabIndex={-1}
                    >
                      6
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 7, 2024"
                      tabIndex={-1}
                    >
                      7
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 8, 2024"
                      tabIndex={-1}
                    >
                      8
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 9, 2024"
                      tabIndex={-1}
                    >
                      9
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 10, 2024"
                      tabIndex={-1}
                    >
                      10
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 11, 2024"
                      tabIndex={-1}
                    >
                      11
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 12, 2024"
                      tabIndex={-1}
                    >
                      12
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 13, 2024"
                      tabIndex={-1}
                    >
                      13
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 14, 2024"
                      tabIndex={-1}
                    >
                      14
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 15, 2024"
                      tabIndex={-1}
                    >
                      15
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 16, 2024"
                      tabIndex={-1}
                    >
                      16
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 17, 2024"
                      tabIndex={-1}
                    >
                      17
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 18, 2024"
                      tabIndex={-1}
                    >
                      18
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 19, 2024"
                      tabIndex={-1}
                    >
                      19
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 20, 2024"
                      tabIndex={-1}
                    >
                      20
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 21, 2024"
                      tabIndex={-1}
                    >
                      21
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 22, 2024"
                      tabIndex={-1}
                    >
                      22
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 23, 2024"
                      tabIndex={-1}
                    >
                      23
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 24, 2024"
                      tabIndex={-1}
                    >
                      24
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 25, 2024"
                      tabIndex={-1}
                    >
                      25
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 26, 2024"
                      tabIndex={-1}
                    >
                      26
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 27, 2024"
                      tabIndex={-1}
                    >
                      27
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 28, 2024"
                      tabIndex={-1}
                    >
                      28
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 29, 2024"
                      tabIndex={-1}
                    >
                      29
                    </span>
                    <span
                      className="flatpickr-day"
                      aria-label="April 30, 2024"
                      tabIndex={-1}
                    >
                      30
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 1, 2024"
                      tabIndex={-1}
                    >
                      1
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 2, 2024"
                      tabIndex={-1}
                    >
                      2
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 3, 2024"
                      tabIndex={-1}
                    >
                      3
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 4, 2024"
                      tabIndex={-1}
                    >
                      4
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 5, 2024"
                      tabIndex={-1}
                    >
                      5
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 6, 2024"
                      tabIndex={-1}
                    >
                      6
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 7, 2024"
                      tabIndex={-1}
                    >
                      7
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 8, 2024"
                      tabIndex={-1}
                    >
                      8
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 9, 2024"
                      tabIndex={-1}
                    >
                      9
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 10, 2024"
                      tabIndex={-1}
                    >
                      10
                    </span>
                    <span
                      className="flatpickr-day nextMonthDay"
                      aria-label="May 11, 2024"
                      tabIndex={-1}
                    >
                      11
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
              fill="#64748B"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StartDate;
