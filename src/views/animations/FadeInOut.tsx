import React, { useEffect, useRef } from 'react';
import { Animated, Easing, RegisteredStyle, ViewStyle } from 'react-native';
import { DebugLogger } from '@utils/logger';

const log = DebugLogger('FadeInOut.tsx');

export default function FadeInOut({
  children,
  duration,
  willUnmount,
  style,
}: {
  children: React.ReactNode;
  duration?: number;
  willUnmount?: boolean;
  style?:
    | false
    | RegisteredStyle<ViewStyle>
    | Animated.Value
    | Animated.AnimatedInterpolation
    | Animated.WithAnimatedObject<ViewStyle>
    | Animated.WithAnimatedArray<ViewStyle[]>
    | null
    | undefined;
}) {
  const { current: opacity } = useRef(new Animated.Value(0));

  const fadeInOpacity = Animated.timing(opacity, {
    useNativeDriver: true,
    easing: Easing.linear,
    duration: duration || 1000,
    toValue: 1,
  });

  const fadeOutOpacity = Animated.timing(opacity, {
    useNativeDriver: true,
    easing: Easing.linear,
    duration: duration || 250,
    toValue: 0,
  });

  useEffect(() => {
    fadeInOpacity.start();
  }, []);

  useEffect(() => {
    if (willUnmount) {
      fadeOutOpacity.start();
    }
  }, [willUnmount]);

  return (
    <Animated.View style={[{ opacity, flex: 1 }, style]}>
      {children}
    </Animated.View>
  );
}
