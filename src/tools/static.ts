export const phoneNumberRegex = /^1\d{10}$/ //手机号码正则表达式
export const chineseNameRegex = /^[\u4e00-\u9fa5]{2,4}$/
export const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
export const provCityDistRegex = /.+?(省|市|自治区|自治州|县|区)/g
export const emailRegex = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+[.a-zA-Z]+$/

export const LoanTermOptions = [
  { value: '1', text: '12个月', label: '12个月', title: '12个月' },
  { value: '2', text: '36个月', label: '36个月', title: '36个月' }
]
export const YesNoOptions = [
  { value: '1', text: '是', label: '是', title: '是' },
  { value: '0', text: '否', label: '否', title: '否' }
]
export const TaxTypeOptions = [
  { value: '1', text: '仅为中国税收居民', label: '仅为中国税收居民', title: '仅为中国税收居民' },
  { value: '2', text: '仅为非居民', label: '仅为非居民', title: '仅为非居民' },
  {
    value: '3',
    text: '即是中国税收居民又是其他国家(地区)税收居民',
    label: '即是中国税收居民又是其他国家(地区)税收居民',
    title: '即是中国税收居民又是其他国家(地区)税收居民'
  }
]
export const GuaranteeTypeOptions = [{ value: '1', text: '信用', label: '信用', title: '信用' }]
export const RelationshipOptions = [
  { value: '1', text: '直系亲属', label: '直系亲属', title: '直系亲属' },
  { value: '2', text: '配偶', label: '配偶', title: '配偶' }
]
export const LoanPurposeOptions = [
  { value: '1', text: '综合消费', label: '综合消费', title: '综合消费' },
  { value: '2', text: '个人经营', label: '个人经营', title: '个人经营' }
]
export const BillAddressOptions = [
  { value: '1', text: '住宅地址', label: '住宅地址', title: '住宅地址' },
  { value: '1', text: '单位地址', label: '单位地址', title: '单位地址' }
]
export const BillSendOptions = [
  { value: '1', text: '电子邮件寄送账单', label: '电子邮件寄送账单', title: '电子邮件寄送账单' }
]
export const JobOptions = [
  { value: '1', text: '厅局级以上', label: '厅局级以上', title: '厅局级以上' },
  { value: '2', text: '处级', label: '处级', title: '处级' },
  { value: '3', text: '科级', label: '科级', title: '科级' },
  { value: '4', text: '一般干部', label: '一般干部', title: '一般干部' },
  { value: '5', text: '企业负责人', label: '企业负责人', title: '企业负责人' },
  { value: '6', text: '中层管理人员', label: '中层管理人员', title: '中层管理人员' },
  { value: '7', text: '一般管理人员', label: '一般管理人员', title: '一般管理人员' },
  { value: '8', text: '一般员工', label: '一般员工', title: '一般员工' },
  { value: '9', text: '其他', label: '其他', title: '其他' }
]
export const TitleOptions = [
  { value: '1', text: '高级职称', label: '高级职称', title: '高级职称' },
  { value: '2', text: '中级职称', label: '中级职称', title: '中级职称' },
  { value: '3', text: '处级职称', label: '处级职称', title: '处级职称' }
]
export const RepayTypeOptions = [
  { value: '101', text: '利随本清', label: '利随本清', title: '利随本清' },
  { value: '102', text: '到期利随本清', label: '到期利随本清', title: '到期利随本清' },
  { value: '103', text: '不定期还款', label: '不定期还款', title: '不定期还款' },
  { value: '301', text: '预收利息', label: '预收利息', title: '预收利息' },
  { value: '202', text: '等额本息', label: '等额本息', title: '等额本息' },
  {
    value: '203',
    text: '分期归还法/分期还款',
    label: '分期归还法/分期还款',
    title: '分期归还法/分期还款'
  },
  { value: '201', text: '等额本金', label: '等额本金', title: '等额本金' }
]
export const FinanceRepayTypeOptions = [
  { value: '1', text: '最低还款额', label: '最低还款额', title: '最低还款额' },
  { value: '2', text: '全额还款', label: '全额还款', title: '全额还款' }
]
export const CardTypeOptions = [
  { value: '0', text: '隐形卡', label: '隐形卡', title: '隐形卡' },
  { value: '1', text: '实体卡', label: '实体卡', title: '实体卡' }
]
export const LoanTypeOptions = [{ value: '1', text: '新增', label: '新增', title: '新增' }]
export const EducationOptions = [
  { value: '0', text: '初中及以下', label: '初中及以下', title: '初中及以下' },
  { value: '1', text: '高中及中转', label: '高中及中转', title: '高中及中转' },
  { value: '2', text: '大专', label: '大专', title: '大专' },
  { value: '3', text: '本科', label: '本科', title: '本科' },
  { value: '4', text: '硕士', label: '硕士', title: '硕士' },
  { value: '5', text: '博士', label: '博士', title: '博士' }
]
export const MaritialStatusOptions = [
  { value: '1', text: '未婚', label: '未婚', title: '未婚' },
  { value: '2', text: '已婚', label: '已婚', title: '已婚' },
  { value: '3', text: '离异', label: '离异', title: '离异' },
  { value: '4', text: '丧偶', label: '丧偶', title: '丧偶' }
]
