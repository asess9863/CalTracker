import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function ImageButton({ onPress })
{
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image
                source= {"../assets/BackButton.png"}
                style={styles.image}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});