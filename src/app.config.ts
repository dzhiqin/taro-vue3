export default {
  pages: [
    'pages/home/home',
    'pages/mine/mine',
    'pages/login/login',
    'pages/citizen/citizen',
    'pages/loan-apply/loan-apply',
    'pages/business/business',
    'pages/loan-limit/loan-limit',
    'pages/success/success',
    'pages/user-info/user-info',
    'pages/identity-info/identity-info',
    'pages/prepayment/prepayment',
    'pages/create/index',
    'pages/find/index',
    'pages/my/index'
  ],
  window: {
    backgroundColor: '#fff',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  subpackages: [
    {
      root: 'packs',
      pages: ['service/service', 'feedback/feedback']
    }
  ],
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#d81e06',
    borderStyle: 'black',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/home/home',
        iconPath: 'assets/img/home@2x.png',
        selectedIconPath: 'assets/img/home-en@2x.png',
        text: '首页'
      },
      {
        pagePath: 'pages/mine/mine',
        iconPath: 'assets/img/mine@2x.png',
        selectedIconPath: 'assets/img/mine-en@2x.png',
        text: '我的'
      }
    ]
  }
}
