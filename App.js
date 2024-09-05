import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";

const USERNAME = "Username";
const PASSWORD = "Admin123!";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [themeButtonText, setThemeButtonText] = useState("🙈");

  const toggleSwitch = () =>
    setIsImageVisible((previousState) => !previousState);

  const handleThemeToggle = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      setThemeButtonText(newTheme ? "🙈" : "🙉");
      return newTheme;
    });
  };

  useEffect(() => {
    if (username.length < 6) {
      setUsernameError("Username must be at least 6 characters.");
    } else if (username.length > 20) {
      setUsernameError("Username must be no more than 20 characters.");
    } else {
      setUsernameError("");
    }
  }, [username]);

  useEffect(() => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must include uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }
  }, [password]);

  const handleLogin = () => {
    if (username === USERNAME && password === PASSWORD) {
      Alert.alert("Login Success", "You have successfully logged in.");
    } else {
      Alert.alert("Login Failed", "Invalid username or password.");
    }
  };

  return (
    <View
      style={[
        styles.container,
        isDarkTheme ? styles.darkTheme : styles.lightTheme,
      ]}
    >
      <Text style={[styles.header, { color: isDarkTheme ? "#fff" : "#000" }]}>
        Login
      </Text>
      <View style={styles.inputContainer}>
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>Username</Text>
        <TextInput
          style={[styles.input, { borderColor: isDarkTheme ? "#666" : "#ccc" }]}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor={isDarkTheme ? "#aaa" : "#888"}
        />
        <Text style={{ color: isDarkTheme ? "#f00" : "#f00" }}>
          {usernameError}
        </Text>
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>
          Username Characters: {username.length}/20
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={{ color: isDarkTheme ? "#fff" : "#000" }}>Password</Text>
        <TextInput
          style={[styles.input, { borderColor: isDarkTheme ? "#666" : "#ccc" }]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor={isDarkTheme ? "#aaa" : "#888"}
        />
        <Text style={{ color: isDarkTheme ? "#f00" : "#f00" }}>
          {passwordError}
        </Text>
      </View>
      <Button
        title="Login"
        onPress={handleLogin}
        color={isDarkTheme ? "#aaa" : "#007bff"}
      />

      <Text style={{ color: isDarkTheme ? "#fff" : "#000", marginTop: 50 }}>
        Too bright?
      </Text>

      <Button
        title={themeButtonText}
        onPress={handleThemeToggle}
        color={isDarkTheme ? "#aaa" : "#007bff"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  lightTheme: {
    backgroundColor: "#fff",
  },
  darkTheme: {
    backgroundColor: "#333",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});

export default App;
