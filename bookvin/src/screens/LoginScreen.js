import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    dispatch(login({ name: name.trim(), email: email.trim(), avatar: null }));
  };

  const handleSocialLogin = (provider) => {
    dispatch(login({
      name: provider === 'Google' ? 'Google User' : 'Apple User',
      email: provider === 'Google' ? 'user@gmail.com' : 'user@icloud.com',
      avatar: null,
    }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>🚗</Text>
        <Text style={styles.title}>bookvin</Text>
        <Text style={styles.subtitle}>Your personal car companion</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>— or continue with —</Text>

        <TouchableOpacity style={[styles.socialButton, styles.googleButton]} onPress={() => handleSocialLogin('Google')}>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, styles.appleButton]} onPress={() => handleSocialLogin('Apple')}>
          <Text style={[styles.socialButtonText, { color: '#fff' }]}>Continue with Apple</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: { fontSize: 48, marginBottom: 4 },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  form: { width: '100%', marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4, marginTop: 12 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: { borderColor: '#e53e3e' },
  errorText: { color: '#e53e3e', fontSize: 12, marginTop: 4 },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  orText: { color: '#999', marginBottom: 16, fontSize: 13 },
  socialButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  googleButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
  appleButton: { backgroundColor: '#000' },
  socialButtonText: { fontSize: 16, fontWeight: '500', color: '#333' },
});
