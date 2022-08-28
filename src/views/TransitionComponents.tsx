import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

const defaultDuration = 500;

export default function TransitionComponents({
  activeComponentName,
  components,
  Animation,
  duration = defaultDuration,
}: TransitionComponentsProps) {
  const [compCurrName, setCompCurrName] = useState(activeComponentName);
  useEffect(() => {
    setTimeout(() => setCompCurrName(activeComponentName), duration / 2);
  }, [activeComponentName]);

  const RenderComponent = useCallback(
    ({ willUnmount }: RenderComponentProps) => {
      const SelectedComponent = components.filter(
        comp => comp.name === compCurrName,
      )[0]?.component;
      return SelectedComponent ? (
        <Animation willUnmount={willUnmount} duration={duration / 2}>
          <SelectedComponent />
        </Animation>
      ) : (
        <View />
      );
    },
    [compCurrName],
  );

  return <RenderComponent willUnmount={activeComponentName !== compCurrName} />;
}
