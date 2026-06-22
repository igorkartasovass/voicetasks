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
  const [tasks, setTasks] = useState<
    { id: string; text: string; done: boolean }[]
  >([]);

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: taskText, done: false },
    ]);
    setTaskText("");
  };

  const toggleTaskDone = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </Text>

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
            <Text style={[styles.taskItem, item.done && styles.taskItemDone]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#5571F6",
  },
  title: {
    fontSize: 40,
    color: "#ffffff",
    fontFamily: "BricolageGrotesque_800ExtraBold",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.3,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.14)",
    padding: 12,
    fontSize: 16,
    color: "#000000",
    marginTop: 20,
    fontFamily: "PlusJakartaSans_500Medium",
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
    fontSize: 33.5,
  },
  taskItemDone: {
    textDecorationLine: "line-through",
    color: "#e13030",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  date: {
    fontSize: 17,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#rgba(255,255,255,0.72)",
    marginBottom: 4,
  },
});
