
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Order, OrderType } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface OrdersTableProps {
  orders: Order[];
  orderTypes: OrderType[];
  limit?: number;
}

export const OrdersTable = ({ orders, orderTypes, limit }: OrdersTableProps) => {
  const displayOrders = limit ? orders.slice(0, limit) : orders;
  
  const getOrderTypeName = (typeId: string) => {
    return orderTypes.find((type) => type.id === typeId)?.name || typeId;
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-warning-light text-warning border-warning">待处理</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-medical-100 text-medical-800 border-medical-300">处理中</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-success-light text-success border-success">已完成</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>订单号</TableHead>
            <TableHead>患者</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                暂无订单
              </TableCell>
            </TableRow>
          ) : (
            displayOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.patientName}</TableCell>
                <TableCell>{getOrderTypeName(order.type)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/order/${order.id}`}>查看</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
