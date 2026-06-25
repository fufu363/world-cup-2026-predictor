# GoalMap — 2026 世界杯预测模拟器

[English](./README.md)

一个零依赖、支持中英文切换的世界杯对阵预测器。你可以拖拽调整小组排名、排列 12 支小组第三名球队，并从 32 强开始逐场选出冠军。

## 主要功能

- 中英文界面切换，并自动记住语言
- 拖拽调整 12 个小组的最终排名
- 单独排列 12 支小组第三名球队
- 自动生成 32 强对阵入口
- 完整展示 32 强至决赛的晋级路径
- 使用浏览器 `localStorage` 自动保存预测
- 适配桌面端和移动端
- 纯静态结构，可直接部署到 GitHub Pages

## 当前数据快照

内置积分数据更新于 **2026 年 6 月 25 日 17:22（UTC+8）**。

项目不再依赖实时接口。比赛结果变化后，只需要更新 [`real-data.js`](./real-data.js) 中的数据。

## 本地运行

无需安装依赖，也不需要构建。

可以直接打开 `index.html`，或者使用任意静态服务器：

```bash
python -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 部署到 GitHub Pages

1. 在 GitHub 创建一个新仓库。
2. 将本文件夹中的所有文件上传或推送到仓库。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**。
5. 选择 `main` 分支和 `/ (root)` 目录。

项目使用相对路径，因此个人主页仓库和普通项目仓库都可以部署。

## 项目结构

```text
.
├── assets/
│   └── favicon.svg
├── index.html
├── styles.css
├── app.js
├── real-data.js
├── README.md
├── README.zh-CN.md
└── LICENSE
```

## 数据与商标声明

积分数据来自公开赛事数据，并以 FIFA 官方页面交叉核对。本项目与 FIFA 无隶属或授权关系。

## 开源许可

[MIT](./LICENSE)
