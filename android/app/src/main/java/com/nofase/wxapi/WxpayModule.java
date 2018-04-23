package com.nofase.wxapi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

class WxpayModule extends ReactContextBaseJavaModule {

  private IWXAPI api;
  static String APP_ID = "";
  static Promise promise = null;

  WxpayModule(ReactApplicationContext reactContext) {
    super(reactContext);
    api = WXAPIFactory.createWXAPI(reactContext, null);
  }

  @Override
  public String getName() {
    return "Wxpay";
  }

  @ReactMethod
  public void registerApp(String APP_ID) { // 向微信注册
    WxpayModule.APP_ID = APP_ID;
    api.registerApp(APP_ID);
  }

  @ReactMethod
  public void pay(final ReadableMap order, Promise promise) {
    WxpayModule.promise = promise;
    PayReq request = new PayReq();
    request.appId = order.getString("appid");
    request.partnerId = order.getString("partnerid");
    request.prepayId= order.getString("prepayid");
    request.packageValue = order.getString("package");
    request.nonceStr= order.getString("noncestr");
    request.timeStamp= order.getInt("timestamp")+"";
    request.sign= order.getString("sign");
    api.sendReq(request);
  }

  @ReactMethod
  public void isSupported(Promise promise) { // 判断是否支持调用微信SDK
    boolean isSupported = api.isWXAppInstalled();
    promise.resolve(isSupported);
  }

}