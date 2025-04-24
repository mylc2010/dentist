
import { useState } from "react";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { useOrderContext } from "@/contexts/OrderContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order } from "@/data/mockData";

const Orders = () => {
  const { orders, orderTypes } = useOrderContext();
  const [statusFilter, setStatusFilter] = useState<"all" | Order["status"]>("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter orders based on status and type
  const filteredOrders = orders.filter((order) => {
    const statusMatch = statusFilter === "all" || order.status === statusFilter;
    const typeMatch = typeFilter === "all" || order.type === typeFilter;
    return statusMatch && typeMatch;
  });

  // Get today's orders
  const today = new Date().toISOString().split("T")[0];
  const todayOrders = filteredOrders.filter((order) => order.createdAt.startsWith(today));

  // Get other orders
  const previousOrders = filteredOrders.filter((order) => !order.createdAt.startsWith(today));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">订单管理</h1>
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="订单状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="pending">待处理</SelectItem>
              <SelectItem value="in_progress">处理中</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="订单类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              {orderTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList>
          <TabsTrigger value="today">今日订单 ({todayOrders.length})</TabsTrigger>
          <TabsTrigger value="previous">历史订单 ({previousOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-4">
          <OrdersTable orders={todayOrders} orderTypes={orderTypes} />
        </TabsContent>

        <TabsContent value="previous" className="mt-4">
          <OrdersTable orders={previousOrders} orderTypes={orderTypes} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
