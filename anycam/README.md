# AnyCAM 图标资产（Anycam）

本目录存放 **AnyCAM / `com.phonaid.anycam`** 的矢量与工程侧草案。

Anycam 仓库根目录下的 `brand-assets` **符号链接**指向本仓库（`/Volumes/A1/brand-assets`），可从 IDE 直接编辑此处文件。

## 与 Android 工程的对应关系（已对齐）

以下内容与本仓库 **Anycam** 内当前启动器图标 **一致**：改品牌源文件后若要应用，可复制到  
`app/src/main/res/drawable/`（或按需走 Image Asset 工具）。

| 品牌文件 | Android 应用内 |
|-----------|----------------|
| `android-vector/ic_anycam_foreground.xml` | `ic_launcher_foreground.xml` |
| `android-vector/ic_anycam_monochrome.xml` | `ic_launcher_monochrome.xml` |
| `android-vector/ic_launcher_background_layerlist.xml` | `ic_launcher_background.xml` |
| `svg/icon-adaptive-foreground.svg` | 同上（Studio 可由 SVG 再导入校准） |

## 缩放（观感定稿）

为适应 **launcher 异形裁切** 与 Material keyline ，所有 **前景几何**采用统一缩放：

- **缩放系数**：**0.75**
- **枢轴**：**(54, 52)**（与镜头主体视觉中心对齐）
- **SVG**：`transform="translate(54 52) scale(0.75) translate(-54 -52)"`
- **Vector Drawable**：`<group pivotX="54" pivotY="52" scaleX="0.75" scaleY="0.75">…</group>`

`icon-full-mark.svg`、`icon-adaptive-foreground.svg`、`icon-monochrome.svg`、`android-vector/ic_anycam_*.xml` 均遵循同一规则。

## 文件

| 路径 | 说明 |
|------|------|
| `svg/icon-full-mark.svg` | 带圆角方底的完整图标（预览 / 导出 PNG）；底渐与自适应背景同色 |
| `svg/icon-monochrome.svg` | 单色版（预览；系统主题图标可参考） |
| `svg/icon-adaptive-background.svg` | Adaptive Icon **背景层** SVG（对角渐变） |
| `svg/icon-adaptive-foreground.svg` | Adaptive Icon **前景层** SVG |
| `android-vector/ic_anycam_foreground.xml` | **前景** Vector Drawable 正本 |
| `android-vector/ic_anycam_monochrome.xml` | **单色层** Vector Drawable 正本 |
| `android-vector/ic_launcher_background_layerlist.xml` | **背景** LayerList + 对角渐变（与 app 同款） |
| `MOTION_SPEC.md` | 动效分段与 Compose / Lottie / AVD 说明 |
| `animation/lottie/` | 占位：导出 Lottie JSON 后放此处 |

## 色值（可与 App `ui/theme` 对齐后替换）

- 背景：`#1E1B4B` → `#312E81`
- 强调：`#06B6D4` / `#22D3EE`

## 导入 Android Studio

**File → New → Image Asset**，分别选择 `icon-adaptive-foreground.svg` 与 `icon-adaptive-background.svg` 生成各 `mipmap`；或直接按上表拷贝 `drawable/` 用的 XML。

Play Console 至少需要 **512×512** PNG，可由 `svg/icon-full-mark.svg` 矢量导出。

## 与本仓库顶层目录的关系

根目录另有通用 `SVG/`、`PNG/`、`ANIME/`； **`anycam/` 为产品线专用成套资产**，不与通用素材混放。
