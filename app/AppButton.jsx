import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// create a preset app button that takes in an onPress command, button title and a color for the container
const AppButton = ({ onPress, title, backgroundColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.appButtonContainer, backgroundColor && { backgroundColor }]}
    >
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#0a662d7c",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default AppButton;