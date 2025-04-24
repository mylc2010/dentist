
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrderContext } from "@/contexts/OrderContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calendar, ArrowLeft, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getOrderById,
    getOrderTypeById,
    materials,
    updateOrderStatus,
    updateOrderMaterials,
    updateOrderFormData,
    completeOrder,
  } = useOrderContext();

  const [order, setOrder] = useState(getOrderById(id || ""));
  const [orderType, setOrderType] = useState(order ? getOrderTypeById(order.type) : undefined);
  const [formData, setFormData] = useState<Record<string, any>>(order?.formData || {});
  const [selectedMaterials, setSelectedMaterials] = useState<
    { materialId: string; quantity: number }[]
  >(order?.materials || []);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Update order when it changes
    setOrder(getOrderById(id || ""));
  }, [id, getOrderById]);

  useEffect(() => {
    // Update order type when order changes
    if (order) {
      setOrderType(getOrderTypeById(order.type));
      setFormData(order.formData || {});
      setSelectedMaterials(order.materials || []);
    }
  }, [order, getOrderTypeById]);

  useEffect(() => {
    // Calculate total price
    if (!orderType) return;

    let price = orderType.baseFee;

    // Add material costs
    selectedMaterials.forEach((item) => {
      const material = materials.find((m) => m.id === item.materialId);
      if (material) {
        price += material.price * item.quantity;
      }
    });

    // Add extras based on form data
    if (orderType.id === "teeth_cleaning" && formData.fluoride_treatment) {
      price += 50; // Extra fee for fluoride treatment
    }

    if (orderType.id === "cavity_filling") {
      // Extra fee based on cavity count
      const cavityCount = parseInt(formData.cavity_count || "0", 10);
      if (cavityCount > 1) {
        price += (cavityCount - 1) * 100;
      }
      
      // Extra fee for X-ray
      if (formData.xray_needed) {
        price += 80;
      }
    }

    setTotalPrice(price);
  }, [orderType, selectedMaterials, formData, materials]);

  if (!order || !orderType) {
    return <div>订单不存在</div>;
  }

  const getStatusBadge = (status: string) => {
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

  const handleStatusChange = (status: "pending" | "in_progress" | "completed") => {
    if (order) {
      updateOrderStatus(order.id, status);
      setOrder({...order, status});
    }
  };

  const handleMaterialChange = (materialId: string, quantity: number) => {
    const updatedMaterials = [...selectedMaterials];
    const index = updatedMaterials.findIndex((item) => item.materialId === materialId);

    if (index >= 0) {
      if (quantity <= 0) {
        updatedMaterials.splice(index, 1);
      } else {
        updatedMaterials[index].quantity = quantity;
      }
    } else if (quantity > 0) {
      updatedMaterials.push({ materialId, quantity });
    }

    setSelectedMaterials(updatedMaterials);
    if (order) {
      updateOrderMaterials(order.id, updatedMaterials);
    }
  };

  const handleFormChange = (fieldId: string, value: any) => {
    const newFormData = { ...formData, [fieldId]: value };
    setFormData(newFormData);
    if (order) {
      updateOrderFormData(order.id, newFormData);
    }
  };

  const handleCompleteOrder = () => {
    if (!order) return;
    
    // Check if all required fields are filled
    const missingFields = orderType.formFields
      .filter((field) => field.required && !formData[field.id])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      toast.error(`请填写以下必填字段: ${missingFields.join(", ")}`);
      return;
    }

    // Check if required materials are selected
    const requiredMaterialIds = new Set(orderType.requiredMaterials);
    const selectedMaterialIds = new Set(selectedMaterials.map((item) => item.materialId));
    
    const missingMaterials = [...requiredMaterialIds].filter((id) => !selectedMaterialIds.has(id))
      .map((id) => materials.find((m) => m.id === id)?.name || id);
    
    if (missingMaterials.length > 0) {
      toast.error(`请添加以下必需材料: ${missingMaterials.join(", ")}`);
      return;
    }

    completeOrder(order.id, totalPrice);
    setOrder({...order, status: "completed", completedAt: new Date().toISOString(), totalPrice});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">订单详情</h1>
        {getStatusBadge(order.status)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">患者信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>姓名</Label>
              <p className="text-lg font-medium">{order.patientName}</p>
            </div>
            <div>
              <Label>患者ID</Label>
              <p>{order.patientId}</p>
            </div>
            <div>
              <Label>订单类型</Label>
              <p>{orderType.name}</p>
            </div>
            <div>
              <Label>创建时间</Label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            {order.completedAt && (
              <div>
                <Label>完成时间</Label>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <p>{new Date(order.completedAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </CardContent>
          {order.status !== "completed" && (
            <CardFooter className="flex-col items-start gap-4">
              <Separator />
              <div className="w-full">
                <Label>修改订单状态</Label>
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">待处理</SelectItem>
                    <SelectItem value="in_progress">处理中</SelectItem>
                    <SelectItem value="completed">已完成</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
          )}
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">订单处理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">所需表单</h3>
              {orderType.formFields.map((field) => (
                <div key={field.id}>
                  <Label htmlFor={field.id}>{field.label}</Label>
                  {field.type === "text" && (
                    <Input
                      id={field.id}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleFormChange(field.id, e.target.value)}
                      disabled={order.status === "completed"}
                      required={field.required}
                    />
                  )}
                  {field.type === "number" && (
                    <Input
                      id={field.id}
                      type="number"
                      value={formData[field.id] || ""}
                      onChange={(e) => handleFormChange(field.id, e.target.value)}
                      disabled={order.status === "completed"}
                      required={field.required}
                    />
                  )}
                  {field.type === "select" && (
                    <Select
                      value={formData[field.id] || ""}
                      onValueChange={(value) => handleFormChange(field.id, value)}
                      disabled={order.status === "completed"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        id={field.id}
                        checked={formData[field.id] || false}
                        onCheckedChange={(checked) => handleFormChange(field.id, checked)}
                        disabled={order.status === "completed"}
                      />
                      <Label htmlFor={field.id}>是</Label>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">所需材料</h3>
              <div className="space-y-2">
                {materials
                  .filter((mat) => orderType.requiredMaterials.includes(mat.id))
                  .map((material) => {
                    const selectedMaterial = selectedMaterials.find((item) => item.materialId === material.id);
                    const quantity = selectedMaterial?.quantity || 0;
                    
                    return (
                      <div key={material.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{material.name}</p>
                          <p className="text-sm text-muted-foreground">¥{material.price}/{material.unit}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleMaterialChange(material.id, Math.max(0, quantity - 1))}
                            disabled={order.status === "completed" || quantity === 0}
                          >
                            -
                          </Button>
                          <span className="w-10 text-center">{quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleMaterialChange(material.id, quantity + 1)}
                            disabled={order.status === "completed"}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">基础服务费</h3>
                <p>¥{orderType.baseFee.toFixed(2)}</p>
              </div>
              
              {selectedMaterials.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <h3 className="font-medium mb-2">材料费</h3>
                  {selectedMaterials.map((item) => {
                    const material = materials.find((m) => m.id === item.materialId);
                    if (!material) return null;
                    
                    return (
                      <div key={item.materialId} className="flex justify-between items-center mb-1 text-sm">
                        <p>{material.name} × {item.quantity}</p>
                        <p>¥{(material.price * item.quantity).toFixed(2)}</p>
                      </div>
                    );
                  })}
                </>
              )}
              
              {/* Extra charges based on form data */}
              {orderType.id === "teeth_cleaning" && formData.fluoride_treatment && (
                <>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center">
                    <p>氟化物处理</p>
                    <p>¥50.00</p>
                  </div>
                </>
              )}
              
              {orderType.id === "cavity_filling" && (
                <>
                  {parseInt(formData.cavity_count || "0", 10) > 1 && (
                    <>
                      <Separator className="my-4" />
                      <div className="flex justify-between items-center">
                        <p>多个龋齿处理 ({parseInt(formData.cavity_count || "0", 10) - 1} 个额外)</p>
                        <p>¥{((parseInt(formData.cavity_count || "0", 10) - 1) * 100).toFixed(2)}</p>
                      </div>
                    </>
                  )}
                  
                  {formData.xray_needed && (
                    <>
                      <Separator className="my-4" />
                      <div className="flex justify-between items-center">
                        <p>X光检查</p>
                        <p>¥80.00</p>
                      </div>
                    </>
                  )}
                </>
              )}
              
              <Separator className="my-4" />
              <div className="flex justify-between items-center text-lg font-bold">
                <h3>总计</h3>
                <p>¥{totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
          {order.status !== "completed" && (
            <CardFooter>
              <Button className="w-full" onClick={handleCompleteOrder}>
                完成订单并确认价格
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OrderDetail;
