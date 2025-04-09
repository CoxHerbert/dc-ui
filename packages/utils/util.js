export const hexToRgba = (hex, alpha = 1) => {
    if (typeof hex !== 'string' || !hex) return;
    // 去除 # 符号
    hex = hex.trim().replace(/^#/, '');

    // 处理短格式颜色（如 #000 转换为 #000000）
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map((char) => char + char)
            .join('');
    }

    // 提取 RGB 分量
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
