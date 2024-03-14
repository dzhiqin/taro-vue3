const baseUrl = {
  dev: 'https://jcgb.ssrcb.com/jcgbprod', //测试环境
  // dev: 'https://jcgb.ssrcb.com/jcgprodes/testproxy',
  // dev: 'https://ssrcb.fjnx.com.cn/jcgprodes/proxy',
  prod: 'https://ssrcb.fjnx.com.cn/jcgprodes/proxy',
  wxapi: {
    dev: 'http://121.37.7.190:3000',
    prod: 'http://121.37.7.190:3000'
  }
}
const uploadUrl =
  process.env.NODE_ENV === 'development'
    ? `${baseUrl.dev}/sys/common/upload?biz=weapp`
    : `${baseUrl.prod}/sys/common/upload?biz=weapp`
// const uploaderPreviewUrl = 'https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/staticPreview/'
const uploaderPreviewUrl =
  process.env.NODE_ENV === 'development'
    ? `${baseUrl.dev}/sys/common/staticPreview/`
    : `${baseUrl.prod}/sys/common/staticPreview/`
const publicImgPreviewUrl = 'https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/staticPreview/'
const publicPath = [/^\/public/, /^\/login/]
export default {
  baseUrl,
  uploadUrl,
  uploaderPreviewUrl,
  publicPath,
  publicImgPreviewUrl
}
// export default {
//   baseUrl: {
//     dev: 'https://jcgb.ssrcb.com/jcgbprod/', //测试环境
//     // dev: 'https://jcgb.ssrcb.com/jcgprodes/testproxy',
//     // dev: 'https://ssrcb.fjnx.com.cn/jcgprodes/proxy',
//     prod: 'https://ssrcb.fjnx.com.cn/jcgprodes/proxy',
//     wxapi: {
//       dev: 'http://121.37.7.190:3000',
//       prod: 'http://121.37.7.190:3000'
//     }
//   },
//   uploadUrl: 'https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/upload?biz=weapp',
//   uploaderPreviewUrl: 'https://ssrcb.fjnx.com.cn/jcgprodes/proxy/sys/common/staticPreview/',
//   publicPath: [/^\/public/, /^\/login/]
// }
