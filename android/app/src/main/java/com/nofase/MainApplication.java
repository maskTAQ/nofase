package com.nofase;

import android.app.Application;

import com.facebook.react.ReactApplication;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

//import com.nofase.module.SharePackage;
import com.nofase.alipay.AlipayPackage;
import com.nofase.wxapi.WxpayPackage;
import cn.jpush.reactnativejpush.JPushPackage;
//import com.umeng.socialize.Config;
//import com.umeng.socialize.PlatformConfig;
//import com.umeng.socialize.UMShareAPI;

// import com.umeng.commonsdk.UMConfigure;
// import com.umeng.message.IUmengRegisterCallback;
// import com.umeng.message.MsgConstant;
// import com.umeng.message.PushAgent;
// import com.umeng.message.UTrack;
// import com.umeng.message.UmengMessageHandler;
// import com.umeng.message.UmengNotificationClickHandler;
// import com.umeng.message.common.UmLog;
// import com.umeng.message.entity.UMessage;
import com.umeng.socialize.PlatformConfig;
import com.nofase.invokenative.SharePackage;
import com.nofase.invokenative.RNUMConfigure;


import java.util.Arrays;
import java.util.List;

import com.burnweb.rnwebview.RNWebViewPackage;

public class MainApplication extends Application implements ReactApplication {
  // 设置为 true 将不会弹出 toast
  private boolean SHUTDOWN_TOAST = true;
  // 设置为 true 将不会打印 log
  private boolean SHUTDOWN_LOG = true;
  
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new SharePackage(), new AlipayPackage(),
          new RNWebViewPackage(), new WxpayPackage(), new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG));
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
    // 此处配置类型，供后台分析各渠道时使用
    // Config.shareType = "react native";
    // // 初始化Umeng分享
     //UMShareAPI.get(this);
    // UMConfigure.setLogEnabled(true);
    //     //初始化组件化基础库, 统计SDK/推送SDK/分享SDK都必须调用此初始化接口
    //     RNUMConfigure.init(this, "59892f08310c9307b60023d0", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,
    //         "669c30a9584623e70e8cd01b0381dcb4");
        //initUpush();
  }

  // 配置平台key、secret信息
  {
    PlatformConfig.setWeixin("wxa0f45f747e934b0b", "b30386fbb4dce809d7dfa11cc35d1351");
    PlatformConfig.setQQZone("1106639209", "eKFR5EH6ci3wQpMO");
    PlatformConfig.setSinaWeibo("2733400964", "fac50980a44e3e3afd4bc968ea572887", "www.baidu.com");
  }
}
