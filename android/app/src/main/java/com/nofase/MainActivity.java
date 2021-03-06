package com.nofase;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
// import com.nofase.module.ShareModule;
// import com.umeng.socialize.UMShareAPI;


// import com.umeng.analytics.MobclickAgent;
// import com.umeng.analytics.MobclickAgent.EScenarioType;
// import com.umeng.message.PushAgent;

// import com.umeng.soexample.invokenative.PushModule;

import com.umeng.socialize.UMShareAPI;
import com.nofase.invokenative.ShareModule;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "nofase";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ShareModule.initSocialSDK(this);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 解决内存泄漏问题
        UMShareAPI.get(this).release();
    }
}
