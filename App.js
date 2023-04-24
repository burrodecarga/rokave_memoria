import React,{useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from './src/components/Card';
//import cards from './src/data/datos'

const cards = [
   "😊",
   "😍",
   "😂",
   "👩",
   "👩‍🦱",
   "👮‍♀️",
]
export default function App() {

  const [board,setBoard] = useState(()=>shuffle([...cards,...cards]))
  const [selectedCards, setSelectedCards] = useState([])
  const [matchCard, setMatchCard] = useState([])
  const [score, setScore]=useState(0)

  useEffect(()=>{
   if(selectedCards.length <2) return
   if(board[selectedCards[0]] === board[selectedCards[1]]){
     setMatchCard([...matchCard,...selectedCards])
     setScore(score+1)
     setSelectedCards([])
   }else{
    const timeoutId = setTimeout(()=>setSelectedCards([]),1000)
    setScore(score-1)
    return ()=>clearTimeout(timeoutId)
   }

  },[selectedCards])
 
  const handleTapCards = (index)=>{
    if(selectedCards.length>=2 || selectedCards.includes(index)){
      console.log('Existe el index: '+index)
      return
    } 
    setSelectedCards([...selectedCards,index])
  }

  const reset = ()=>{
    setSelectedCards([])
    setMatchCard([])
    setScore(0)
  }

  const didPlayerWin = ()=>(matchCard.length === board.length)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{didPlayerWin ? 'Felicitaciones': 'Memoria'}</Text>
      <Text style={styles.title}>Puntos : {score}</Text>

      <View style={styles.board}>
      {
        board.map((card, index) =>{
          const isTurndeOver = (selectedCards.includes(index) || matchCard.includes(index))
          console.log(isTurndeOver, selectedCards, index)
          return (
            <Card
             key={index}
             onPress={()=>handleTapCards(index)}
             isTurndeOver={isTurndeOver}
             >{card}</Card>)
        })
      }
      </View>
      <StatusBar style="light" />
      {
        didPlayerWin && (<TouchableOpacity
        onPress={reset}
        >
          <Text style={styles.nuevo}>Nuevo Juego</Text></TouchableOpacity>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontWeight: '900',
    fontSize:28,
    color: 'white'
  },
  board: {
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  nuevo:{
    backgroundColor:'white',
    borderRadius:13,
    marginVertical:10,
    paddingVertical:5,
    paddingHorizontal:20

  }
});


function shuffle(array){
for(let i = array.length-1; i>0;i--){
  const randomIndex = Math.floor(Math.random* (i+1))
  [array[i], array[randomIndex]] = [[array[randomIndex],array[i]]]
}
return array
}