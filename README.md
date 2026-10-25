# 立体几何 · 截面实验台

离线可用的立体几何截面实验工具。单页面、零外部依赖、**不联网、无后端、不请求任何外部资源**。

> 详细的安装步骤、平板手势、常见问题见 **[`使用说明.md`](使用说明.md)**；本文件只做仓库门面与文件索引。

## 目录说明

| 路径 | 用途 | 必需 |
|---|---|---|
| `index.html` | 主页面。**本身就是一个完全自包含的单文件**（CSS/JS/图形全内联），单独拷走也能用 | 是 |
| `离线单文件版.html` | 与 `index.html` **内容逐字节相同**，只是换了个名字，方便"只发一个文件给别人" | 否（副本） |
| `manifest.webmanifest` | 桌面图标 / 全屏启动配置（PWA 用） | Pages 部署时 |
| `sw.js` | 离线缓存（断网也能打开） | Pages 部署时 |
| `icons/` | 四个尺寸的图标（180 / 192 / 512 / maskable-512） | Pages 部署时 |
| `app/` | Capacitor 打包工程（构建 Android APK / iOS IPA） | 出 APK 时 |
| `.github/workflows/` | 云端自动构建脚本 | 出 APK 时 |
| `.nojekyll` | 让 GitHub Pages 跳过 Jekyll 处理，中文文件名更稳 | Pages 部署时 |
| `LICENSE` | MIT 许可证 | 否 |
| `使用说明.md` | iPad / 安卓 / 电脑的详细安装与使用说明 | 否 |

> **`index.html` 与 `离线单文件版.html` 到底什么区别？** 没有任何区别——`cmp` 校验为逐字节相同（各 190,343 字节）。
> 电脑双击**任意一个**都能直接用。留两份纯粹是为了命名直观：`index.html` 给托管和打包用，`离线单文件版.html` 给"微信传一个文件"用。


## 三条使用路线

- **iPad**：打开 GitHub Pages 地址 → 分享 → 添加到主屏幕（仓库为公开仓库，Pages 免费可用）
- **安卓**：进 **Releases** 下载现成的 `截面实验台-v0.0.2.apk` 直接安装（公开仓库免登录可下）；也可以自己跑 Actions 重新构建
- **电脑**：双击 `index.html` 即可

> 现成安装包：**Releases** 页面 → `v0.0.2` → 下载 `截面实验台-v0.0.2.apk`（约 3.9 MB，Debug 签名，安装时若提示"未知来源"选允许即可）。
> 装的是 Debug 包，系统可能会提示"未通过安全检测"，这是因为没有上架应用商店，不是文件有问题。

## 在线地址（GitHub Pages）

开启方式：仓库 → **Settings** → **Pages** → Build and deployment → Source 选 **Deploy from a branch** → Branch 选 `main`、文件夹选 `/ (root)` → **Save**。

几分钟后访问：`https://myselfw.github.io/geom-section-lab-_-/`

## 隐私

- 页面不含手机号、身份证、邮箱、微信号、本机路径、API Key、Token 等任何个人信息
- 页面 0 外链，不向任何第三方发送数据
- 本仓库为**公开仓库**：源码任何人可查看，Pages 地址任何人可打开使用
- 注意：GitHub 官方文档说明，Pages 站点被访问时会记录访客 IP（站点所有者看不到该日志）

## 自动构建

推送后 GitHub Actions 会自动构建 Android APK，在仓库的 **Actions** 标签页下载产物。
iOS IPA 需要 Apple 开发者账号与签名证书，见 `.github/workflows/build-ios.yml` 顶部说明。
