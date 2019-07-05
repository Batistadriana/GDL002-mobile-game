import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        //se renderizan aquí
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  //Se pone todo en ceros para que el juego inicie vacío.
  initializeGame = () => {
    this.setState({
      gameState: [
          [0, 0, 0], 
          [0, 0, 0], 
          [0, 0, 0]],
      currentPlayer: 1,
    });
  };

  getWinner = () => {
    const NUM_TILES = 3;
    let sum;
    let arr = this.state.gameState;

    //checar las filas
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //checar las colimnas

    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //checar las diagonales
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    //sin ganadores

    return 0;
  };

  //va a hacer updagte al array del juego dependiendo del valor de a quien le toca jugar
  onTilePress = (row, col) => {
    // no te deja "cambiar" la ficha
    let value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    //Jugador que sigue
    let currentPlayer = this.state.currentPlayer;

    // Aquí siemrpe esta en el jugador uno
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //cambio de jugador
    let nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });
    let winner = this.getWinner();
    if (winner == 1) {
      Alert.alert(
        '¡Guau!',
        'El gato ha escapado',
        [{ text:'Miau'}]
        );
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert(
        'Miau',
        'El perro me ha atrapado',
        [{text: 'Guau'}]
        );
      this.initializeGame();
    }
  };

  onNewGamePress = () => {
    this.initializeGame();
  };

  //Va a regresarte el ícono que es usado
  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="cat" style={styles.tileCat} />;
      case -1:
        return <Icon name="dog" style={styles.tileDog} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      //aquí se hacen las filas con 3 cuadrados cada una y con el border quitamos los lados del cuadrado que no necesitamos.
      <View style={styles.container}>
        
        <View style={styles.centerContent}>
              <Image style={styles.imgStyle} source ={require('./src/img/catDog.jpg')}/>
            </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={[styles.tile, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[
              styles.tile,
              { borderBottomWidth: 0, borderRightWidth: 0 },
            ]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        
        <View >
        
          <TouchableHighlight onPress={this.onNewGamePress} style={styles.btn}>
            <Text style={styles.txtBtn}> Nuevo Juego </Text>
          </TouchableHighlight>
      
        </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
  },

  tileCat: {
    color: 'purple',
    fontSize: 70,
  },

  tileDog: {
    color: 'red',
    fontSize: 70,
  },

  btn: {
    width: 150,
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth:5
},
  
  txtBtn:{
color:'black',
fontSize: 20,
  },

  centerContent: {
    justifyContent:'center',
    alignItems:'center'
  },
  
  imgStyle:{
    width: 200,
    height: 150,
    marginTop: 0
  }
  
});