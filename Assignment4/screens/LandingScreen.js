import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { supabase } from '../lib/supabase';

export default function LandingScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        navigation.replace('SignIn');
        return;
      }

      const { data, error: userError } = await supabase
        .from('user_details')
        .select('*')
        .eq('uuid', session.user.id)
        .single();

      if (userError) {
        Alert.alert('Error', 'Could not load user details.');
      } else {
        setUserDetails(data);
      }

      setLoading(false);
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('SignIn');
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {userDetails?.first_name} {userDetails?.last_name}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcome: { fontSize: 22, marginBottom: 20 },
});
