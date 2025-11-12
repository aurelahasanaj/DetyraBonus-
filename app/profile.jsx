import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { router } from "expo-router";
import NavBar from "../components/NavBar";

export default function ProfileScreen() {
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/auth/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      {user ? (
        <>
          <Text style={styles.info}>Logged in as:</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>No user logged in</Text>
      )}
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: "#333",
  },
  email: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 20,
  },
});
