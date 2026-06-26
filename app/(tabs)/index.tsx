import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { parseTask } from "@/lib/parseTask";

export default function HomeScreen() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<
    {
      id: string;
      text: string;
      done: boolean;
      priority: "high" | "medium" | "low";
      dueDate: Date | null;
    }[]
  >([]);

  const addTask = () => {
    if (taskText.trim() === "") return;
    const parsed = parseTask(taskText);
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        text: parsed.text,
        done: false,
        priority: parsed.priority,
        dueDate: parsed.dueDate,
      },
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

  const cyclePriority = (id: string) => {
    const order = { high: "medium", medium: "low", low: "high" } as const;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: order[task.priority] } : task,
      ),
    );
  };

  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.date, { color: theme.textMuted }]}>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </Text>

      <Text style={[styles.title, { color: theme.text }]}>My Tasks</Text>
      <TextInput
        style={[
          styles.input,
          {
            color: theme.text,
            borderColor: theme.border,
            backgroundColor: theme.card,
          },
        ]}
        placeholder="Type tasks here..."
        placeholderTextColor={theme.textMuted}
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
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
            onPress={() => toggleTaskDone(item.id)}
          >
            <View
              style={[
                styles.checkbox,
                { borderColor: theme.border },
                item.done && {
                  backgroundColor: theme.accent,
                  borderColor: theme.accent,
                },
              ]}
            >
              {item.done && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text
              style={[
                styles.cardText,
                { color: theme.text },
                item.done && {
                  color: theme.textMuted,
                  textDecorationLine: "line-through",
                },
              ]}
            >
              {item.text}
            </Text>
            <TouchableOpacity
              onPress={() => cyclePriority(item.id)}
              hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
            >
              <View
                style={[
                  styles.priorityDot,
                  {
                    backgroundColor:
                      item.priority === "high"
                        ? theme.priorityHigh
                        : item.priority === "medium"
                          ? theme.priorityMedium
                          : theme.priorityLow,
                  },
                ]}
              ></View>
            </TouchableOpacity>
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
});
