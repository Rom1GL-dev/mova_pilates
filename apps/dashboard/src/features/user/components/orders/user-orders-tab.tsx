import { DataTable } from '@/components/data-table/data-table.tsx';
import { Loading } from '@/components/loading.tsx';
import { UserOrdersListingToolbar } from '@/features/user/components/orders/user-orders-listing-toolbar.tsx';
import { orderColumns } from '@/features/orders/components/order-columns.tsx';
import { useListUserOrders } from '@/features/user/usecases/list-orders/use-list-user-orders.tsx';

interface Props {
  userId: string;
}

export function UserOrdersTab({ userId }: Props) {
  const { data: orderResponse, isLoading } = useListUserOrders(userId);
  const { data } = orderResponse ?? {
    data: []
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DataTable
      columns={orderColumns}
      data={data.orders}
      Toolbar={UserOrdersListingToolbar}
    />
  );
}
