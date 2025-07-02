import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function InputField({
  label,
  value,
  onChangeText,
  style,
  ...props
}) {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});
