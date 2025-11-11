import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { app } from "../firebaseConfig";
WebBrowser.maybeCompleteAuthSession();

const auth = getAuth(app);

export default function LoginScreen() {
  const [user, setUser] = useState(null);

 
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "525836493151-5crlc7a9gkcviof590qtgtle22kjoe54.apps.googleusercontent.com", 
    expoClientId:
      "525836493151-5crlc7a9gkcviof590qtgtle22kjoe54.apps.googleusercontent.com", 
  });


  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => console.log("✅ Kyçje e suksesshme me Google!"))
        .catch((err) => console.error("❌ Gabim gjatë kyçjes:", err));
    }
  }, [response]);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {user ? (
        <>
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 20 }}
          />
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Mirësevjen, {user.displayName} 👋
          </Text>
          <Text style={{ marginBottom: 20 }}>{user.email}</Text>
          <Button title="Dalje (Logout)" onPress={() => auth.signOut()} />
        </>
      ) : (
        <>
          <Text style={{ marginBottom: 20, fontSize: 18 }}>
            Kyçu përmes Google
          </Text>
          <Button
            title="Login with Google"
            disabled={!request}
            onPress={() => promptAsync()}
          />
        </>
      )}
    </View>
  );
}

