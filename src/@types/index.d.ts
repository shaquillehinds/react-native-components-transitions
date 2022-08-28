type AnimatedStyles =
  | false
  | RegisteredStyle<ViewStyle>
  | Animated.Value
  | Animated.AnimatedInterpolation
  | Animated.WithAnimatedObject<ViewStyle>
  | Animated.WithAnimatedArray<ViewStyle[]>
  | null
  | undefined;

type TransitionAnimation = (props: TransitionAnimation) => JSX.Element;

interface AnimatedComponent {
  name: string;
  component: (data: any) => JSX.Element;
}

interface TransitionComponentsProps {
  components: AnimatedComponent[];
  activeComponentName: string;
  duration?: number;
  Animation: (props: {
    children: React.ReactNode;
    willUnmount?: boolean;
    duration?: number;
    style?: AnimatedStyles;
  }) => JSX.Element;
}

interface RenderComponentProps {
  willUnmount: boolean;
}
