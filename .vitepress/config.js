export default {
    title: 'My UI',
    description: '私有组件库文档',
    themeConfig: {
        nav: [
            { text: '指南', link: '/index' },
            { text: '组件', link: '/button' },
        ],
        sidebar: {
            '/': [
                { text: '快速开始', link: '/index' },
                { text: '按钮 Button', link: '/button' },
                // 其他组件...
            ],
        },
    },
};
