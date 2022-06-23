import React from 'react'
import { StyleSheet, View } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <View style={styles.container} behavior="padding">
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
