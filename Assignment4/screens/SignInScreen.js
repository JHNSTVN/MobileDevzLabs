import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigation.replace('Landing');
      }
    });
  }, []);

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert('Sign In Error', error.message);
    } else {
      navigation.replace('Landing');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })} style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12, paddingHorizontal: 10,
  },
});

