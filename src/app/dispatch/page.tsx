import { ContextProvider } from '@/Context/modalContext';
import Dispatch from '@/components/Table/Dispatch';
import { getLoads } from '@/lib/dbActions';

export default async function DispatchPage() {
  const loads = await getLoads();

  return (
    <Dispatch cargo={loads} />
  );
}
