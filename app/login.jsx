import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { app } from "../firebaseConfig";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const auth = getAuth(app);

export default function LoginScreen() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // vendos ID-të e tua këtu (nga Google Cloud)
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "525836493151-5crlc7a9gkcviof590qtgtle22kjoe54.apps.googleusercontent.com",
    expoClientId:
      "525836493151-5crlc7a9gkcviof590qtgtle22kjoe54.apps.googleusercontent.com",
  });

  // kur përdoruesi kyçet me sukses
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(() => console.log("✅ Kyçje e suksesshme me Google!"))
        .catch((err) => console.error("❌ Gabim gjatë kyçjes:", err));
    }
  }, [response]);

  // ndjek ndryshimet e gjendjes së përdoruesit
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("👤 Përdorues i kyçur:", currentUser.email);
        router.replace("/"); // pas kyçjes, e çon në index
      }
    });

    return unsubscribe;
  }, []);

  // pamja
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      {user ? (
        <>
          <Image
            source={{ uri: user.photoURL }}
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              marginBottom: 20,
            }}
          />
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Mirësevjen, {user.displayName} 👋
          </Text>
          <Text style={{ marginBottom: 30 }}>{user.email}</Text>
          <Button
            title="Dalje (Logout)"
            onPress={() => {
              signOut(auth);
              setUser(null);
              router.replace("/login");
            }}
          />
        </>
      ) : (
        <>
          <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: "600" }}>
            Kyçu përmes Google
          </Text>
          <Button
            title="Login me Google"
            disabled={!request}
            onPress={() => promptAsync()}
          />
        </>
      )}
    </View>
  );
}
