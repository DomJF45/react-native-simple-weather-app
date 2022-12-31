import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default class SearchInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  handleChangeText = (text) => {
    // do something
    this.setState({ text: text });

  }

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({text: ''});

  }


  render() {

    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput 
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
          onSubmit={this.handleUpdateLocation}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginHorizontal: 40,
    marginTop: 20,
    backgroundColor: '#666',
    borderRadius: 10
  
  },
  textInput: {
    flex: 1,
    color: 'white',
    textAlign: 'center'
  }
})
