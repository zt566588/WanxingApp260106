# 未来科技导航系统 - 项目结构说明

## 📁 目录结构
```
未来科技导航系统/
├── 📁 src/                    # 源代码目录
│   ├── 📄 server.js          # 主服务器文件
│   ├── 📁 api/               # API接口目录
│   │   ├── 📄 links.js       # 链接管理API
│   │   ├── 📄 login.js       # 登录验证API
│   │   └── 📄 package.json   # API依赖配置
│   └── 📁 data/              # 数据存储目录
│       └── 📄 links.json     # 链接数据文件
├── 📁 public/                # 静态资源目录
│   ├── 📄 index.backup.html  # 主页面备份
│   ├── 📄 index-secure.backup.html # 安全页面备份
│   ├── 📄 api-debug.html     # API调试页面
│   ├── 📄 api-test.html      # API测试页面
│   ├── 📄 test-api.html      # API测试页面
│   └── 📄 test-login.html    # 登录测试页面
├── 📁 docs/                  # 文档目录
│   ├── 📄 交互式建站教程.html
│   ├── 📄 快速部署指南.md
│   ├── 📄 新手0基础固定域名教程.md
│   ├── 📄 超详细全流程建站教程.md
│   └── 📄 [其他部署文档]
├── 📁 config/                # 配置文件目录
│   └── 📄 netlify.toml       # Netlify配置
├── 📁 backups/               # 备份文件目录
│   ├── 📄 GitHub_Project_Files.tar.gz
│   ├── 📄 WanxingApp.tar.gz
│   └── 📄 WanxingApp_latest.tar.gz
├── 📄 .inscode               # Inscode运行配置
├── 📄 package.json           # Node.js项目配置
├── 📄 package-lock.json      # 依赖锁定文件
└── 📄 .gitignore            # Git忽略配置
```

## 🚀 访问信息
- **本地地址**: http://localhost:3000
- **管理员账号**: admin
- **管理员密码**: admin123
- **项目状态**: ✅ 正常运行

## 📋 功能特性
- 未来科技风格导航系统
- 星空背景动画效果
- 管理员后台管理
- 链接添加/删除功能
- 响应式设计

## 🔧 技术栈
- 后端: Node.js + Express
- 前端: HTML5 + CSS3 + JavaScript
- 数据存储: JSON文件
- 部署: 支持Netlify等平台

## 📝 使用说明
1. 访问主页面查看导航链接
2. 使用管理员账号登录后台
3. 添加/管理导航链接
4. 享受未来科技风格的界面体验