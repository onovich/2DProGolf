# 2D Pro Golf
A procedural 2D golf prototype upgraded into a Vite-managed repository with GitHub Pages automation.<br/>**一个程序化 2D 高尔夫原型，已升级为由 Vite 管理并支持 GitHub Pages 自动部署的正式仓库。**
## Project Status
The gameplay is preserved from the original single-file implementation, and a migration-ready architecture baseline is now established with separated data, engine, and view folders.<br/>**当前保留了原单文件版本的玩法，并已建立可迁移架构基础，完成 data、engine、view 的目录拆分。**
This is an incremental refactor foundation, not a full extraction of every subsystem yet.<br/>**这属于增量重构基础，并非所有子系统都已完全拆分。**
## Features
- Procedural terrain generation with contour-style shading and terrain-dependent friction.<br/>**程序化地形生成，包含等高线风格阴影与基于地形类型的摩擦差异。**
- Wind, slope, and club-specific ball physics with 2D + airborne depth simulation.<br/>**包含风力、坡度与球杆差异化物理，并具备 2D + 滞空深度模拟。**
- Camera pan/follow and off-screen hole indicator for playability.<br/>**支持相机平移/跟随与屏外球洞指示器，提升可玩性。**
## Architecture
- src/data: world constants and configurable gameplay parameters.<br/>**src/data：世界常量与可配置玩法参数。**
- src/logic/engine: pure runtime calculations and game loop orchestration.<br/>**src/logic/engine：核心运行计算与游戏循环调度。**
- src/logic/hooks: reserved bridge layer for future React/Unity-facing integration hooks.<br/>**src/logic/hooks：预留给未来 React/Unity 接入的桥接层。**
- src/view/screens and src/view/components: UI composition layers separated from engine internals.<br/>**src/view/screens 与 src/view/components：与引擎内部逻辑分离的界面组合层。**
## Local Development
- Install dependencies: npm install<br/>**安装依赖：npm install**
- Start dev server: npm run dev<br/>**启动开发服务：npm run dev**
- Build production assets: npm run build<br/>**构建生产产物：npm run build**
- Preview build locally: npm run preview<br/>**本地预览构建结果：npm run preview**
## Deployment
GitHub Pages is deployed through the workflow at .github/workflows/deploy.yml using official Pages actions.<br/>**GitHub Pages 通过 .github/workflows/deploy.yml 使用官方 Pages Actions 自动部署。**
For repository settings, set Pages Source to GitHub Actions.<br/>**在仓库设置中请将 Pages Source 设置为 GitHub Actions。**
Expected site URL: https://onovich.github.io/2DProGolf/<br/>**预期站点地址：https://onovich.github.io/2DProGolf/**
