import PropTypes from 'prop-types';

interface TableTitleProps {
  title: string;
}

function TableTitle({ title }: TableTitleProps) {
  return (
    <div className="p-4 border-b-4 border-red-500 rounded shadow bg-black z-50 opacity-70 text-center">
      <h1 className="text-lg font-bold text-white">{title}</h1>
    </div>
  );
}

TableTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TableTitle;



// import PropTypes from 'prop-types';

// interface TableTitleProps {
//   title: string;
// }

// const TableTitle: React.FC<TableTitleProps> = ({ title }) => {
//   return (
//     <div className="p-4 border border-gray-200 rounded shadow">
//       <h1 className="text-lg font-bold">{title}</h1>
//     </div>
//   );
// };

// TableTitle.propTypes = {
//   title: PropTypes.string.isRequired,
// };

// export default TableTitle;