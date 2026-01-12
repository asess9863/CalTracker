import CustomFoods from '../CustomFoodsClass.jsx'
import { Dropdown } from 'react-native-element-dropdown'
import { StyleSheet, View, Text } from 'react-native';

export default function DisplayCustomFoods() {
    let FoodList = [];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Custom Foods will appear here when they work
            </Text>
            <Dropdown
                style={styles.Dropdown}
                placeholder='Please choose from a food'
                placeholderTextColor={'white'}
                data={FoodList}
                maxHeight={300}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'top',
    backgroundColor: '#000000ff',
    flex: 1,
    padding: 24,
  },
  title: {
    color: '#ffffffff',
    textAlign: 'center',
    fontSize: 30,
  },
  input: {
    width: 355,
    height: 40,
    margin: 12,
    borderWidth: 4,
    borderColor: '#ffffffff',
    color: 'white',
    padding: 10,
  },
  link: {
    textAlign: 'center',
    marginTop: 12,
    color: 'white',
  },
  Dropdown: {
    color: 'white'
  }
});
