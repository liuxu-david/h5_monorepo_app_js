# h5_monorepo_app_js

## 介绍

`h5_monorepo_app_js` 是一个基于 Vue 的项目，使用了 UniApp 框架进行开发。该项目包含了换肤、请求封装、原生对接、机型自适应、图片库的处理。

## 规范要求

- 项目采用 Monorepo 架构，每个模块都是一个独立的 Vue 项目。
- 项目使用pnpm作为包管理工具。
- 每个模块都有自己的 `package.json` 文件，用于管理依赖和脚本。
- 所有模块的代码都存储在 `packages` 目录下，每个模块的代码都在一个单独的子目录中。

## 安装

首先，确保你已经安装了 Node.js 和 npm 和 pnpm。然后在项目根目录下运行以下命令来安装依赖：

## 启动服务
pnpm install 
pnpm run lhb:dev

## 跟原生通信方案