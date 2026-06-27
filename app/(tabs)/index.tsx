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

      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
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

            <View style={{ flex: 1 }}>
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
              {item.dueDate && (
                <Text style={[styles.date, { color: theme.textMuted }]}>
                  {item.dueDate?.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              )}
            </View>

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

      <View
        style={[
          styles.inputBar,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Add a task..."
          placeholderTextColor={theme.textMuted}
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.accent }]}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
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
  inputBar: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 18,
    paddingRight: 8,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  addButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 28,
  },
  date: {
    fontSize: 17,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "rgba(255,255,255,0.72)",
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
  dueDate: {
    fontSize: 13,
    marginTop: 2,
    fontFamily: "PlusJakartaSans_400Regular",
  },
});
