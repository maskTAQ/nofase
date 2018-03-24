import EventHub from "./EventHub";

/**
 * 全局提示
 */
export default {
  /**
   * 操作成功提示
   * @param message 消息内容
   * @param time 延迟小时时间
   */
  success: (message = "操作成功", time = 2000) => {
    EventHub.emit("tip.success", message, time);
  },
  /**
   * 操作失败提示
   * @param message 消息内容
   * @param time 延迟小时时间
   */
  fail: (message = "操作失败", time = 2000) => {
    EventHub.emit("tip.fail", message, time);
  },
  /**
   * 关闭loading状态
   */
  dismiss: () => {
    EventHub.emit("tip.dismiss");
  },
  /**
   * 加载中，不会自动关闭，需要调用dismiss关闭
   * @param text 提示内容
   */
  loading: text => {
    EventHub.emit("tip.loading", text);
  }
};
