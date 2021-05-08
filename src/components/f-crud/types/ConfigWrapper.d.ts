/**
 *
 * @aRthor zzhijie
 * @date 2021-04-25
 */
import {Config} from "./index";

export class ConfigWrapper<R> {
  /**
   *
   * @param config {Config}
   * @param row
   * @returns {Config}
   */
  constructor(config: Config<R>, row?: R);

  /**
   * 获取配置项
   * @param config {Config}
   * @param row
   * @returns {Config}
   */
  static convert<R>(config: Config<R>, row?: R): Config<R>;
}
