import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../components/NavBar";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome to Find Lost Things 👋</Text>

        <Link href="/addItem" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Lost Item</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/foundItem" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Found Items</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/about" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
        </Link>

        {/* 🔹 Butonat për autentifikim */}
        <Link href="/signup" asChild>
          <TouchableOpacity style={[styles.button, styles.authButton]}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/login" asChild>
          <TouchableOpacity style={[styles.button, styles.authButton]}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/logout" asChild>
          <TouchableOpacity style={[styles.button, styles.authButton]}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>

      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    padding: 15,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  authButton: {
    backgroundColor: "#50C878", // ngjyrë tjetër për butonat e login/signup
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
