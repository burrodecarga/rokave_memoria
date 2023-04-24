import React from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native'

const Card = ({onPress, isTurndeOver, children}) => {
  return (
    <View style={styles.container}>
    <Pressable style={isTurndeOver? styles.cardUp:styles.cardDown}
    onPress={onPress}
    >
      {
       isTurndeOver ? 
        <Text style={styles.text}>{children}</Text>
       :<Text style={styles.text}>?</Text>
      }
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row', 
  },

  cardUp:{
    width:80,
    height:100,
    margin:10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:'25%',
    backgroundColor:'#1E293B',
    borderWidth:10,
    borderColor:'#334155',
  },
  cardDown:{
    width:80,
    height:100,
    margin:10,
    borderWidth:10,
    borderColor:'#334155',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:'#1E293B'
  },
  text:{
    fontSize:46,
    color:'#6D7F97'

  }
})

export default Card