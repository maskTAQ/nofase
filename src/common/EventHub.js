import { EventEmitter } from "events";

/**
 * 全局事件监听
 * @type {EventEmitter|*}
 */
const emitter = new EventEmitter();
//设置为0,不限制数量
emitter.setMaxListeners(0);

export default emitter;
