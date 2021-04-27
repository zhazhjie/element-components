/**
 *
 * @author zzhijie
 * @date 2021-04-25
 */
import {Config} from "./index";

export class ConfigWrapper {
  /**
   *
   * @param config {Config}
   * @returns {Config}
   */
  constructor(config: Config);

  /**
   * 获取配置项
   * @param config {Config}
   * @returns {Config}
   */
  static convert(config: Config): Config;
}
