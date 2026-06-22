import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [taskText, setTaskText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Insert tasks here...?"
        placeholderTextColor="#000000"
        value={taskText}
        onChangeText={setTaskText}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#6ea2e3",
  },
  title: {
    fontSize: 40,
    color: "#2822e1",
    fontFamily: "Monospace",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#2822e1",
    borderRadius: 30,
    padding: 12,
    fontSize: 16,
    color: "#000000",
    marginTop: 20,
  },
});
