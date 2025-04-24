
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";

const Settings = () => {
  const [clinicName, setClinicName] = useState("我的诊所");
  const [managerName, setManagerName] = useState("管理员");
  const [email, setEmail] = useState("admin@example.com");
  const [phone, setPhone] = useState("13800138000");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("设置已保存");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">设置</h1>
        <p className="text-muted-foreground">管理您的诊所和账户设置</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>诊所信息</CardTitle>
            <CardDescription>
              更新您诊所的基本信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clinicName">诊所名称</Label>
                <Input
                  id="clinicName"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="managerName">管理员姓名</Label>
                <Input
                  id="managerName"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">电子邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">联系电话</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <Button type="submit">保存设置</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>系统设置</CardTitle>
            <CardDescription>
              配置系统参数和偏好设置
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>数据备份</Label>
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">自动备份</p>
                  <p className="text-sm text-muted-foreground">每天自动备份订单数据</p>
                </div>
                <Button variant="outline">配置</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>订单设置</Label>
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">订单类型管理</p>
                  <p className="text-sm text-muted-foreground">添加、编辑或删除订单类型</p>
                </div>
                <Button variant="outline">管理</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>材料管理</Label>
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">材料库存与价格</p>
                  <p className="text-sm text-muted-foreground">管理材料库存和价格设置</p>
                </div>
                <Button variant="outline">管理</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
