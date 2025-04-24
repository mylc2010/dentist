# 医疗诊所订单管理系统

## 项目简介
本系统专为医疗诊所设计，旨在帮助诊所高效管理每日订单任务，支持动态表单填写、多类型订单处理（如洗牙、检查等）、物料需求计算及费用生成。通过自动化流程，减少人工操作错误，提升服务效率与客户满意度。

---

## 核心功能

### 1. 订单分类与管理
- **多类型订单支持**：预设常见订单类型（如洗牙、口腔检查、补牙），支持自定义添加新类型。
- **状态追踪**：实时查看每日订单的「待处理」「进行中」「已完成」状态，支持按日期、类型筛选。
- **批量操作**：可批量标记订单完成、导出任务列表或生成日报。

### 2. 动态表单项配置
- **灵活表单设计**：根据订单类型自动匹配所需填写的表单项。  
  - 示例：洗牙订单需填写「使用物料（如抛光膏、消毒剂数量）」「操作时长」「客户牙齿状况备注」。
- **必填项验证**：确保关键信息（如客户姓名、联系方式）完整提交。

### 3. 物料与成本管理
- **物料库存联动**：订单提交后自动扣除库存，库存不足时触发预警。
- **智能成本计算**：  
  - 基础公式：`总费用 = 人工费（时长×单价） + 物料费（用量×单价） + 附加服务费`。
  - 支持自定义公式适配不同诊所定价策略。

### 4. 客户支付与账单
- **一键生成账单**：自动汇总服务明细与费用，支持打印或邮件发送。
- **支付方式集成**：支持现金、刷卡、第三方支付（如支付宝、微信）记录。
   ```bash
   git clone https://github.com/your-repo/clinic-order-system.git
   cd clinic-order-system
   npm install
   # 配置数据库连接（修改 .env 文件）
   npm run migrate  # 初始化数据库表
   npm start        # 启动服务
```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```
![首页](https://github.com/user-attachments/assets/cdd9aa0f-24ca-42cb-a31f-8e9ef02ef497)

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/93b3e67e-13c8-4149-b548-c0153decbb46) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
