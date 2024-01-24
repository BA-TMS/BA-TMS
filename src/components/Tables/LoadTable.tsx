interface SingleLoad {
  loadNum: string,
  carrierId: string,
  driverId: string,
  customerId: string,
  originId: string,
  destId: string,
  status: string
}

export default function LoadTable({loads}) {
  return (
    <table>
      <tr>
        <th>Number</th>
        <th>Carrier</th>
        <th>Driver</th>
        <th>Customer</th>
        <th>Origin</th>
        <th>Destination</th>
        <th>Status</th>
      </tr>
      {loads.map((load: SingleLoad) => (
        <tr>
          <td>{load.loadNum}</td>
          <td>{load.carrierId}</td>
          <td>{load.driverId}</td>
          <td>{load.customerId}</td>
          <td>{load.originId}</td>
          <td>{load.destId}</td>
          <td>{load.status}</td>
        </tr>
      ))}
    </table>
  );
}