package com.helloworld.modules;

import android.content.Context;
import android.util.AttributeSet;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;

import com.helloworld.R;
import com.facebook.react.uimanager.ThemedReactContext;

public class SplashView extends ConstraintLayout {
    Context context;

    public SplashView(@NonNull Context context) {
        super(context);
        init(context);
    }

    public SplashView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public SplashView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public SplashView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    private void init(Context context) {
        this.context = context;
        inflate(context, R.layout.activity_splash, this);
    }
}
