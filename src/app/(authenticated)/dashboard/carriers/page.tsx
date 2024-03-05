import CarrierTable from '@/components/Tables/CarrierTable';
import { getCarriers } from '@/lib/dbActions';

const CarrierPage = async () => {
  const data = await getCarriers();

  return (
    <div>
      <CarrierTable data={data} />;
    </div>
  );
};

export default CarrierPage;
