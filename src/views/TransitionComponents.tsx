import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { DebugLogger } from '@utils/logger';
import FadeInOut from './animations/FadeInOut';

const log = DebugLogger('TransitionComponents.tsx');

const defaultDuration = 500;

export default function TransitionComponents({
  activeComponentName,
  components,
  Animation = FadeInOut,
  duration = defaultDuration,
}: TransitionComponentsProps) {
  const [compCurrName, setCompCurrName] = useState(activeComponentName);
  useEffect(() => {
    setTimeout(() => setCompCurrName(activeComponentName), duration / 2);
  }, [activeComponentName]);

  const RenderComponent = useCallback(
    ({ willUnmount }: RenderComponentProps) => {
      const component = components.filter(
        comp => comp.name === compCurrName,
      )[0];
      const ComponentAnimation = component?.Animation || Animation;
      const SelectedComponent = component?.component;
      return SelectedComponent ? (
        <ComponentAnimation willUnmount={willUnmount} duration={duration / 2}>
          <SelectedComponent />
        </ComponentAnimation>
      ) : (
        <View />
      );
    },
    [compCurrName],
  );

  log([RenderComponent]);
  return <RenderComponent willUnmount={activeComponentName !== compCurrName} />;
}
