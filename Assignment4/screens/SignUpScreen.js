import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { supabase } from '../lib/supabase';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError || !data.user) {
      Alert.alert('Sign Up Error', signUpError?.message || 'Unknown error.');
      return;
    }

    const { error: insertError } = await supabase.from('user_details').insert([{
      uuid: data.user.id,
      first_name: firstName,
      last_name: lastName,
      email,
    }]);

    if (insertError) {
      Alert.alert('Database Error', insertError.message);
    } else {
      Alert.alert('Success', 'Account created! Please verify your email.');
      navigation.navigate('SignIn');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding' })} style={styles.container}>
      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Back to Sign In" onPress={() => navigation.navigate('SignIn')} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: {
    height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12, paddingHorizontal: 10,
  },
});

