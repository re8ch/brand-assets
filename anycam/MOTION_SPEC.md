# AnyCAM 图标动效说明

## 叙事（约 600～900 ms，适合 Splash / 关于页单次播放）

1. **0–200 ms**：四角对焦线由外向内收束（ease-out）。
2. **200–500 ms**：镜头外环 scale 0.92 → 1.0，轻量 rotation ±3°（对焦感）。
3. **500–900 ms**：镜头玻璃略提亮；底部三颗微粒依次弹出（stagger 约 40 ms）。

## 接入方式

- **首选**：Figma / AE 导出 **Lottie JSON**，Compose 使用 `LottieAnimation`（或工程内封装）。
- **桌面启动器**：使用静态 Adaptive Icon；多数 OEM 不提供长动画。
- **AnimatedVectorDrawable**：矢量 + `objectAnimator`（`scaleX/Y`、`trimPath` 等），适合极短循环，维护成本通常高于 Lottie。

## 注意

动效与 **大尺寸 Lottie** 建议仅用于闪屏、关于页、空状态，与 **mipmap** 静态图标分开管理与体积控制。
