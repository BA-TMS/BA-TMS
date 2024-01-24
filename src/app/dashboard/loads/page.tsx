import {loads} from '@/lib/dbActions';
import LoadTable from '@/components/Tables/LoadTable';

const LoadsPage = async () => {
  const data = await loads();
  console.log(data);

  return (
    <LoadTable loads={data} />
  );
};

export default LoadsPage;
