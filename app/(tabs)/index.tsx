import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTasks([...tasks, taskText]);
    setTaskText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Type tasks here..."
        placeholderTextColor="#000000"
        value={taskText}
        onChangeText={setTaskText}
      ></TextInput>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.taskItem}>{item}</Text>}
      />
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
  taskItem: {
    fontSize: 18,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2822e1",
  },
  buttonRow: {
    alignItems: "center",
    marginTop: 16,
  },
  addButton: {
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2822e1",
    padding: 12,
    borderRadius: 30,
    marginTop: 20,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 30,
  },
});
