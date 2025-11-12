import { signOut } from "firebase/auth";
import { Button, Text, View } from "react-native";
import { auth } from "../firebaseConfig";

export default function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Përdoruesi doli!");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Dalja nga llogaria</Text>
      <Button title="Dil" onPress={handleLogout} />
    </View>
  );
}
