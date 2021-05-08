/**
 * @author: zzj
 * @date: 2021-04-29 15:16:51
 */

export class ShopInfo {
  /**
   * ID
   */
  id;
  /**
   * 店主ID
   */
  umsUserId;
  /**
   * 店铺编号
   */
  shopNo;
  /**
   * 店铺名称
   */
  shopName;
  /**
   * 省份代码
   */
  provinceCode;
  /**
   * 省份名称
   */
  provinceName;
  /**
   * 城市代码
   */
  cityCode;
  /**
   * 城市名称
   */
  cityName;
  /**
   * 地区代码
   */
  areaCode;
  /**
   * 地区名称
   */
  areaName;
  /**
   * 详细地址
   */
  address;
  /**
   * 服务电话
   */
  serviceTelPhone;
  /**
   * 经纬度 格式：纬度,经度，纬度在前，经度在后，例如"35.8,-45.91"
   */
  geoPoint;
  /**
   * 平均价格
   */
  avgPrice;
  /**
   * 好评率 90
   */
  judgeRate;
  /**
   * 基础服务，逗号隔开
   */
  basicService;
  /**
   * 保证金
   */
  deposit;
  /**
   * 自提标识
   */
  selfPickFlag;
  /**
   * 状态0正常 1禁用
   */
  openState;
  /**
   * 营业开始时间
   */
  openStartTime;
  /**
   * 营业结束时间
   */
  openEndTime;
  /**
   * 创建时间
   */
  createTime;
  /**
   * 更新时间
   */
  updateTime;
}
