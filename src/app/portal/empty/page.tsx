'use client';

import PortalLayout from '../../components/portal/PortalLayout';

const EmptyRecieving: any = () => {
  return (
    <PortalLayout pageTitle="Empty_Recieving">
      {/* thinking about how to do the header - looks like an MUI component */}
      <h1>Empty Recieving</h1>
    </PortalLayout>
  );
};

export default EmptyRecieving;
// I think there is a different way to do this vs using the file structure
