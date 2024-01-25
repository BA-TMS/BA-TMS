import { getLoads } from '@/lib/dbActions';
import LoadTable from '@/components/Tables/LoadTable';

const LoadsPage = async () => {
  const data = await getLoads();

  return <LoadTable loads={data} />;
};

export default LoadsPage;
