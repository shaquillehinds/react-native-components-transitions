import React, { useEffect, useRef } from 'react';
import { Animated, Easing, RegisteredStyle, ViewStyle } from 'react-native';
import { DebugLogger } from '@utils/logger';
import { Layout } from '@utils/Layout';

const log = DebugLogger('SlideInOut.tsx');

const { SCREEN_HEIGHT, SCREEN_WIDTH } = Layout;

export default function SlideInOut(props?: {
  direction?: 'up' | 'down' | 'left' | 'right';
  reverseOut?: boolean;
}) {
  let direction = props?.direction || 'left';
  let reverseOut = props?.reverseOut;
  return function ({
    children,
    willUnmount,
    duration,
    style,
  }: {
    children: React.ReactNode;
    willUnmount?: boolean;
    duration?: number;
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
    const isLeft = direction === 'left';
    const isRight = direction === 'right';
    const isDown = direction === 'down';

    const offScreen = isLeft
      ? SCREEN_WIDTH
      : isRight
      ? -SCREEN_WIDTH
      : isDown
      ? -SCREEN_HEIGHT
      : SCREEN_HEIGHT;
    const onScreen = 0;

    const { current: position } = useRef(new Animated.Value(offScreen));

    const slideIn = Animated.timing(position, {
      useNativeDriver: true,
      easing: Easing.in(Easing.sin),
      duration: duration || 300,
      toValue: onScreen,
    });

    const slideOut = Animated.timing(position, {
      useNativeDriver: true,
      easing: Easing.out(Easing.sin),
      duration: duration || 300,
      toValue: reverseOut ? offScreen : -offScreen,
    });

    useEffect(() => {
      slideIn.start();
    }, []);

    useEffect(() => {
      if (willUnmount) {
        slideOut.start();
      }
    }, [willUnmount]);

    const transform = [
      isLeft || isRight ? { translateX: position } : { translateY: position },
    ];

    return (
      <Animated.View style={[{ transform, flex: 1 }, style]}>
        {children}
      </Animated.View>
    );
  };
}
