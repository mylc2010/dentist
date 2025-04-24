
export interface Material {
  id: string;
  name: string;
  price: number;
  unit: string;
}

export interface OrderType {
  id: string;
  name: string;
  description: string;
  baseFee: number;
  requiredMaterials: string[];
  formFields: {
    id: string;
    label: string;
    type: "text" | "number" | "select" | "checkbox";
    options?: string[];
    required: boolean;
  }[];
}

export interface Order {
  id: string;
  patientName: string;
  patientId: string;
  type: string; // References OrderType.id
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
  completedAt?: string;
  totalPrice?: number;
  materials?: {
    materialId: string;
    quantity: number;
  }[];
  formData?: Record<string, any>;
}

export const materials: Material[] = [
  {
    id: "mat1",
    name: "医用消毒液",
    price: 15,
    unit: "瓶",
  },
  {
    id: "mat2",
    name: "牙科抛光膏",
    price: 45,
    unit: "盒",
  },
  {
    id: "mat3",
    name: "牙科麻醉剂",
    price: 120,
    unit: "支",
  },
  {
    id: "mat4",
    name: "一次性口腔检查工具",
    price: 8,
    unit: "套",
  },
  {
    id: "mat5",
    name: "氟化物",
    price: 35,
    unit: "瓶",
  },
  {
    id: "mat6",
    name: "补牙复合材料",
    price: 200,
    unit: "套",
  },
  {
    id: "mat7",
    name: "X光胶片",
    price: 25,
    unit: "张",
  },
  {
    id: "mat8",
    name: "医用手套",
    price: 5,
    unit: "副",
  },
];

export const orderTypes: OrderType[] = [
  {
    id: "teeth_cleaning",
    name: "洗牙",
    description: "标准洗牙服务",
    baseFee: 150,
    requiredMaterials: ["mat1", "mat2", "mat4", "mat5", "mat8"],
    formFields: [
      {
        id: "previous_cleaning",
        label: "上次洗牙时间",
        type: "text",
        required: true,
      },
      {
        id: "tartar_level",
        label: "牙结石程度",
        type: "select",
        options: ["轻度", "中度", "重度"],
        required: true,
      },
      {
        id: "fluoride_treatment",
        label: "是否需要氟化物处理",
        type: "checkbox",
        required: false,
      },
    ],
  },
  {
    id: "cavity_filling",
    name: "补牙",
    description: "牙洞填充治疗",
    baseFee: 280,
    requiredMaterials: ["mat1", "mat3", "mat4", "mat6", "mat7", "mat8"],
    formFields: [
      {
        id: "cavity_count",
        label: "龋齿数量",
        type: "number",
        required: true,
      },
      {
        id: "cavity_locations",
        label: "龋齿位置",
        type: "text",
        required: true,
      },
      {
        id: "filling_material",
        label: "填充材料类型",
        type: "select",
        options: ["树脂", "银汞合金", "陶瓷"],
        required: true,
      },
      {
        id: "xray_needed",
        label: "是否需要X光检查",
        type: "checkbox",
        required: false,
      },
    ],
  },
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const formatDate = (date: Date) => {
  return date.toISOString();
};

export const orders: Order[] = [
  {
    id: "ord1",
    patientName: "张三",
    patientId: "P12345",
    type: "teeth_cleaning",
    status: "completed",
    createdAt: formatDate(yesterday),
    completedAt: formatDate(today),
    totalPrice: 230,
    materials: [
      { materialId: "mat1", quantity: 1 },
      { materialId: "mat2", quantity: 1 },
      { materialId: "mat4", quantity: 1 },
      { materialId: "mat5", quantity: 1 },
      { materialId: "mat8", quantity: 2 },
    ],
    formData: {
      previous_cleaning: "6个月前",
      tartar_level: "中度",
      fluoride_treatment: true,
    },
  },
  {
    id: "ord2",
    patientName: "李四",
    patientId: "P12346",
    type: "cavity_filling",
    status: "pending",
    createdAt: formatDate(today),
    materials: [],
    formData: {},
  },
  {
    id: "ord3",
    patientName: "王五",
    patientId: "P12347",
    type: "teeth_cleaning",
    status: "in_progress",
    createdAt: formatDate(today),
    materials: [],
    formData: {},
  },
  {
    id: "ord4",
    patientName: "赵六",
    patientId: "P12348",
    type: "cavity_filling",
    status: "pending",
    createdAt: formatDate(today),
    materials: [],
    formData: {},
  },
  {
    id: "ord5",
    patientName: "孙七",
    patientId: "P12349",
    type: "teeth_cleaning",
    status: "pending",
    createdAt: formatDate(today),
    materials: [],
    formData: {},
  },
];

export const getOrderById = (id: string): Order | undefined => {
  return orders.find((order) => order.id === id);
};

export const getOrderTypeById = (id: string): OrderType | undefined => {
  return orderTypes.find((type) => type.id === id);
};

export const getMaterialById = (id: string): Material | undefined => {
  return materials.find((material) => material.id === id);
};
