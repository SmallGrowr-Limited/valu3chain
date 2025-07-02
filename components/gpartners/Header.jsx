import { StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export default function Header({ title, navigation }) {
  const { colors } = useTheme();

  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }}>
      {navigation.canGoBack() && (
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
      )}
      <Appbar.Content title={title} titleStyle={styles.title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontWeight: "bold",
  },
});
