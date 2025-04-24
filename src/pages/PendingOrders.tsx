
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { useOrderContext } from "@/contexts/OrderContext";

const PendingOrders = () => {
  const { orders, orderTypes } = useOrderContext();
  
  // Filter pending orders
  const pendingOrders = orders.filter((order) => order.status === "pending");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">待处理订单</h1>
        <p className="text-muted-foreground">共 {pendingOrders.length} 个待处理订单</p>
      </div>

      <OrdersTable orders={pendingOrders} orderTypes={orderTypes} />
    </div>
  );
};

export default PendingOrders;
