import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseConfig";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCheckingAuth(false);

      if (!u) {
        console.log("👤 S'ka përdorues → po kalon në login...");
        router.replace("/login");
      } else {
        console.log("✅ Përdorues i kyçur:", u.email);
      }
    });
    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="addItem" />
      <Stack.Screen name="foundItem" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="about" />
    </Stack>
  );
}

