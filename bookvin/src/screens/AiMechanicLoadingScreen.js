import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator,
  TouchableOpacity, SafeAreaView,
} from 'react-native';

export default function AiMechanicLoadingScreen({ navigation, route }) {
  const {
    title = 'Активація AI-Механіка',
    headline,
    hint,
    nextRoute,
    nextParams = {},
    delayMs = 2500,
  } = route.params || {};

  const navigated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!navigated.current) {
        navigated.current = true;
        navigation.navigate(nextRoute, nextParams);
      }
    }, delayMs);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (!navigated.current) {
      navigated.current = true;
      navigation.navigate(nextRoute, nextParams);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {headline ? (
          <View style={styles.headlineCard}>
            <Text style={styles.headlineText}>{headline}</Text>
          </View>
        ) : null}

        <ActivityIndicator size="large" color="#4B8BFF" style={styles.spinner} />

        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Далі</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D1A' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#4B8BFF', textAlign: 'center', marginBottom: 24 },
  headlineCard: {
    backgroundColor: '#1A1A2E', borderRadius: 12, padding: 16,
    marginBottom: 32, width: '100%',
  },
  headlineText: { fontSize: 15, color: '#C0C0D0', lineHeight: 22, textAlign: 'center' },
  spinner: { marginBottom: 24 },
  hint: { fontSize: 14, color: '#6B6B8A', textAlign: 'center' },
  footer: {
    padding: 16, borderTopWidth: 1, borderTopColor: '#1A1A2E',
  },
  nextButton: {
    backgroundColor: '#4B8BFF', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
  },
  nextButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});
