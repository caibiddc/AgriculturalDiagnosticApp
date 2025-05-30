# 农业诊断应用 (Agricultural Diagnostic App)

一个基于React Native开发的智能农业诊断应用，帮助农民快速识别和诊断农作物病害。

## 功能特点

- 🔐 用户认证系统
- 📱 病害智能诊断
- 📚 病害百科知识库
- 👤 个人诊断历史记录
- 💬 用户反馈系统
- ⚙️ 系统设置

## 技术栈

- React Native 0.77.1
- TypeScript
- Redux Toolkit
- React Navigation
- Gluestack UI
- NativeWind (TailwindCSS)
- React Hook Form
- Axios

## 开始使用

### 环境要求

- Node.js >= 18
- React Native CLI
- Android Studio (Android开发)
- Xcode (iOS开发)

### 安装步骤

1. 克隆项目

```bash
git clone [项目地址]
cd AgriculturalDiagnosticApp
```

2. 安装依赖

```bash
# 使用npm
npm install

# 或使用yarn
yarn install
```

3. iOS额外设置

```bash
# 安装CocoaPods依赖
cd ios
bundle install
bundle exec pod install
cd ..
```

### 运行项目

1. 启动Metro服务器

```bash
# 使用npm
npm start

# 或使用yarn
yarn start
```

2. 运行应用

Android:

```bash
npm run android
# 或
yarn android
```

iOS:

```bash
npm run ios
# 或
yarn ios
```

## 项目结构

```
src/
├── screens/          # 页面组件
├── components/       # 可复用组件
├── routes/          # 导航配置
├── store/           # Redux状态管理
├── services/        # API服务
├── hooks/           # 自定义Hooks
├── utils/           # 工具函数
└── assets/          # 静态资源
```

## 主要功能模块

### 认证模块

- 登录/注册
- 忘记密码
- 创建密码

### 首页模块

- 快速诊断
- 诊断历史
- 功能导航

### 百科模块

- 病害列表
- 病害详情
- 搜索功能

### 个人中心

- 用户信息
- 诊断历史
- 反馈历史
- 系统设置

## 开发指南

### 代码规范

- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 遵循TypeScript类型定义

### 提交规范

- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交Pull Request

## 许可证

[添加许可证信息]

## 联系方式

[添加联系方式]
