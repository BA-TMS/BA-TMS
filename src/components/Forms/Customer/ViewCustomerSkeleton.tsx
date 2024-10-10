'use client';

import Button from '@/components/UI_Elements/buttons/Button';
import { useRouter } from 'next/navigation';

// this component shows if there is a problem displaying customer data

const ViewCustomerSkeleton = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <p>Something went wrong</p>

      <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-end sticky bottom-0 bg-white dark:bg-grey-900 z-10">
        <Button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          Ok
        </Button>
      </div>
    </div>
  );
};

export default ViewCustomerSkeleton;
