/**
 * 全局配置文件
 */
export default {
    title: 'saber',
    logo: '/img/logo.png',
    key: 'saber', //配置主键,目前用于存储
    clientId: 'saber3', // 客户端id
    clientSecret: 'saber3_secret', // 客户端密钥
    tenantId: '000000', // 管理组租户编号
    captchaMode: false, // 是否开启验证码模式
    switchMode: false, // 是否开启部门切换模式
    tokenHeader: 'Blade-Auth',
    //http的status默认放行不才用统一处理的,
    statusWhiteList: [],
    //oauth2配置
    oauth2: {
        // 是否开启注册功能
        registerMode: true,
        // 使用后端工程 @org.springblade.test.Sm2KeyGenerator 获取
        publicKey:
            '04371300310e53c6bcce15b1b5b6b5429a30211f8cb023d97a7eeda289475cb5d024026f255affacabd06ff215287427b231643e30b0fa88c1673cebcbd91a2a1e',
        // 第三方系统授权地址
        authUrl: `${import.meta.env.VITE_APP_BASE_URL}/blade-auth/oauth/render`,
        // 单点登录系统认证(cloud端口为8100,boot端口为80)
        ssoUrl: `${
            import.meta.env.VITE_APP_BASE_URL
        }/oauth/authorize?client_id=saber3&response_type=code&redirect_uri=`,
        // 单点登录回调地址(Saber服务的登录界面地址)
        redirectUri: `${import.meta.env.VITE_APP_BASE_URL}/login`,
    },
};
