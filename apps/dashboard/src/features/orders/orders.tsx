import { DataTable } from '@/components/data-table/data-table.tsx';
import Layout from '@/components/layout.tsx';
import { orderColumns } from './components/order-columns.tsx';
import { OrderListingToolbar } from '@/features/orders/components/order-listing-toolbar.tsx';
import { useListOrders } from '@/features/orders/usecases/list-orders/use-list-orders.tsx';

export function Orders() {
  const { data: orderResponse } = useListOrders();
  const { data } = orderResponse ?? {
    data: []
  };

  return (
    <Layout
      breadcrumbs={['Paiements']}
      title={'Liste des paiements'}
      description={'Consulter la liste des paiements des packs.'}
    >
      <DataTable
        columns={orderColumns}
        data={data.orders ?? []}
        Toolbar={OrderListingToolbar}
      />
    </Layout>
  );
}
