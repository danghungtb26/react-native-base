package com.helloworld.modules;

import android.app.Activity;
import android.graphics.Color;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;

import com.helloworld.R;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = SplashModule.MODULE_NAME)
public class SplashModule extends ReactContextBaseJavaModule {

    public static final String MODULE_NAME = "RNSplash";
    private static boolean mInitialized = false;

    public SplashModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void hide(@NonNull final float duration) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ConstraintLayout layout = getReactApplicationContext().getCurrentActivity().findViewById(R.id.splash_layout_id);
                Log.e("SplashActivity", String.valueOf(layout == null));
                if(layout == null) {
                    return;
                }
                final ViewGroup parent = (ViewGroup) layout.getParent();
                layout.setVisibility(View.INVISIBLE);
            }
        });
    }

    @ReactMethod
    public void show(@NonNull final float duration) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ConstraintLayout layout = getReactApplicationContext().getCurrentActivity().findViewById(R.id.splash_layout_id);
                if(layout == null) {
                    return;
                }
                layout.setVisibility(View.VISIBLE);
            }
        });
    }

    public static void init(@NonNull final Activity activity) {
        if(mInitialized) {
            return;
        }
        mInitialized = true;
        SplashView layout = new SplashView(activity.getApplicationContext());
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
        layout.setId(R.id.splash_layout_id);
        layout.setVisibility(View.VISIBLE);
        activity.addContentView(layout, params);
    }

}
