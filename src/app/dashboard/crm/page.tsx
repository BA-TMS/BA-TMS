import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import CRM from '@/components/Dashboard/CRM';

const CrmPage = () => {
  return (
    <>
      {/* <Sidebar />
      <Header /> */}
      {/* {Array(100)
        .fill('Overflowing string ')
        .map((str, index) => (
          <p
            key={index}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {str.repeat(100)}
          </p>
        ))} */}
      <CRM />
    </>
  );
};

export default CrmPage;
