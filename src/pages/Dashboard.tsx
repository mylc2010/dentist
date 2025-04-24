
import { Calendar, Clock, ClipboardCheck, FileCheck } from "lucide-react";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { useOrderContext } from "@/contexts/OrderContext";

const Dashboard = () => {
  const { orders, orderTypes } = useOrderContext();

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const inProgressOrders = orders.filter((order) => order.status === "in_progress").length;
  const completedOrders = orders.filter((order) => order.status === "completed").length;

  // Get today's orders
  const today = new Date().toISOString().split("T")[0];
  const todayOrders = orders.filter((order) => order.createdAt.startsWith(today));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="所有订单"
          value={totalOrders}
          icon={<Calendar className="h-4 w-4" />}
          description="总订单数"
        />
        <StatusCard
          title="待处理订单"
          value={pendingOrders}
          icon={<Clock className="h-4 w-4" />}
          description="等待处理的订单"
          className="bg-warning-light border-warning"
        />
        <StatusCard
          title="处理中订单"
          value={inProgressOrders}
          icon={<ClipboardCheck className="h-4 w-4" />}
          description="正在处理的订单"
          className="bg-medical-50 border-medical-300"
        />
        <StatusCard
          title="已完成订单"
          value={completedOrders}
          icon={<FileCheck className="h-4 w-4" />}
          description="处理完成的订单"
          className="bg-success-light border-success"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">今日订单</h2>
        <OrdersTable orders={todayOrders} orderTypes={orderTypes} />
      </div>
    </div>
  );
};

export default Dashboard;
