/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, type PropsWithChildren } from 'react';
//@ts-ignore
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { DebugLogger } from '@utils/logger';
import TransitionComponents from '@views/TransitionComponents';
import SlideInOut from '@views/animations/SlideInOut';
import { Layout } from '@utils/Layout';
import FadeInOut from '@views/animations/FadeInOut';

const { relativeX, relativeY, SCREEN_HEIGHT, SCREEN_WIDTH } = Layout;

const log = DebugLogger('App.tsx');

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  log(['hello', 'world']);
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const sections = ['Step One', 'See Your Changes', 'Debug', 'Learn More'];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [compName, setCompName] = useState('Step One');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <SafeAreaView style={backgroundStyle} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: SCREEN_WIDTH,
            justifyContent: 'space-around',
          }}>
          {sections.map(name => {
            return (
              <TouchableOpacity key={name} onPress={() => setCompName(name)}>
                <Text
                  style={{
                    color: isDarkMode ? Colors.light : Colors.dark,
                    paddingVertical: relativeY(0.5),
                    paddingHorizontal: relativeX(3),
                    borderRadius: 3,
                    backgroundColor: 'blue',
                  }}>
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TransitionComponents
          activeComponentName={compName}
          duration={200}
          components={[
            {
              name: 'Step One',
              Animation: SlideInOut(),
              component: () => (
                <Section title="Step One">
                  Edit <Text style={styles.highlight}>App.tsx</Text> to change
                  this screen and then come back to see your edits.
                </Section>
              ),
            },
            {
              name: 'See Your Changes',
              Animation: SlideInOut(),
              component: () => (
                <Section title="See Your Changes">
                  <ReloadInstructions />
                </Section>
              ),
            },
            {
              name: 'Debug',
              component: () => (
                <Section title="Debug">
                  <DebugInstructions />
                </Section>
              ),
            },
            {
              name: 'Learn More',
              component: () => (
                <Section title="Learn More">
                  Read the docs to discover what to do next:
                </Section>
              ),
            },
          ]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
