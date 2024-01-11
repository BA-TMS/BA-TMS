import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header/Header';

const CrmPage = () => {
  return (
    <>
      {/* <Sidebar />
      <Header /> */}
      {Array(100)
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
        ))}
    </>
  );
};

export default CrmPage;
