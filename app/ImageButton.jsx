import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';

const ImageButton = ({ source, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      {
        opacity: pressed ? 0.6 : 1, // Visual feedback when pressed
      },
      style, // Apply custom styles passed as props
    ]}>
      <Image source={source} style={styles.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    // Add other image styles like borderRadius, resizeMode, etc.
  },
});

export default ImageButton;