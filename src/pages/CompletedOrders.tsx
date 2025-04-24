
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { useOrderContext } from "@/contexts/OrderContext";

const CompletedOrders = () => {
  const { orders, orderTypes } = useOrderContext();
  
  // Filter completed orders
  const completedOrders = orders.filter((order) => order.status === "completed");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">已完成订单</h1>
        <p className="text-muted-foreground">共 {completedOrders.length} 个已完成订单</p>
      </div>

      <OrdersTable orders={completedOrders} orderTypes={orderTypes} />
    </div>
  );
};

export default CompletedOrders;
