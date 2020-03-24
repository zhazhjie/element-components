/**
 * @author: zhazhjie
 * @email: zhazhjie@vip.qq.com
 * @date: 2020-02-02 10:25:27
 * @version: 1.0
 */
import plugin from './export';

if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(plugin);
}
