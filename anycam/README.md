# AnyCAM 图标资产（Anycam）

本目录存放 **AnyCAM / `com.phonaid.anycam`** 的矢量与工程侧草案。

Anycam 仓库根目录下的 `brand-assets` **符号链接**指向本仓库（`/Volumes/A1/brand-assets`），可从 IDE 直接编辑此处文件。

## 文件

| 路径 | 说明 |
|------|------|
| `svg/icon-full-mark.svg` | 带圆角方底的完整图标（预览 / 导出 PNG） |
| `svg/icon-monochrome.svg` | 单色版 |
| `svg/icon-adaptive-background.svg` | Android Adaptive Icon **背景层** |
| `svg/icon-adaptive-foreground.svg` | Android Adaptive Icon **前景层** |
| `android-vector/ic_anycam_foreground.xml` | 前景 Vector Drawable 草案 |
| `MOTION_SPEC.md` | 动效分段与 Compose / Lottie / AVD 说明 |
| `animation/lottie/` | 占位：导出 Lottie JSON 后放此处 |

## 色值（可与 App `ui/theme` 对齐后替换）

- 背景：`#1E1B4B` → `#312E81`
- 强调：`#06B6D4` / `#22D3EE`

## 导入 Android Studio

**File → New → Image Asset**，分别选择 `icon-adaptive-foreground.svg` 与 `icon-adaptive-background.svg` 生成各 `mipmap`。

Play Console 至少需要 **512×512** PNG，可由 `svg/icon-full-mark.svg` 矢量导出。

## 与本仓库顶层目录的关系

根目录另有通用 `SVG/`、`PNG/`、`ANIME/`； **`anycam/` 为产品线专用成套资产**，不与通用素材混放。
