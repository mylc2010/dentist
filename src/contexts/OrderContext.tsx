
import { createContext, useState, useContext, ReactNode } from "react";
import { Order, orders as mockOrders, materials, orderTypes, Material, OrderType } from "../data/mockData";
import { toast } from "@/components/ui/sonner";

interface OrderContextType {
  orders: Order[];
  getOrderById: (id: string) => Order | undefined;
  getOrderTypeById: (id: string) => OrderType | undefined;
  getMaterialById: (id: string) => Material | undefined;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  updateOrderMaterials: (id: string, materials: { materialId: string; quantity: number }[]) => void;
  updateOrderFormData: (id: string, formData: Record<string, any>) => void;
  completeOrder: (id: string, totalPrice: number) => void;
  materials: Material[];
  orderTypes: OrderType[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const getOrderTypeById = (id: string) => {
    return orderTypes.find((type) => type.id === id);
  };

  const getMaterialById = (id: string) => {
    return materials.find((material) => material.id === id);
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id) {
          return { ...order, status };
        }
        return order;
      })
    );
    toast.success(`订单状态已更新为 ${status === "in_progress" ? "处理中" : status === "completed" ? "已完成" : "待处理"}`);
  };

  const updateOrderMaterials = (id: string, newMaterials: { materialId: string; quantity: number }[]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id) {
          return { ...order, materials: newMaterials };
        }
        return order;
      })
    );
    toast.success("订单材料已更新");
  };

  const updateOrderFormData = (id: string, formData: Record<string, any>) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id) {
          return { ...order, formData };
        }
        return order;
      })
    );
    toast.success("订单表单数据已更新");
  };

  const completeOrder = (id: string, totalPrice: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id) {
          return { 
            ...order, 
            status: "completed", 
            completedAt: new Date().toISOString(),
            totalPrice 
          };
        }
        return order;
      })
    );
    toast.success("订单已完成");
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrderById,
        getOrderTypeById,
        getMaterialById,
        updateOrderStatus,
        updateOrderMaterials,
        updateOrderFormData,
        completeOrder,
        materials,
        orderTypes,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
