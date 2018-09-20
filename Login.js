import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';

export default class Login extends React.Component {
  render() {
    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">
       <Text>名前を入力してください！</Text>
       <TextInput
        autoCapitalize="none"
        autoFocus
        keyboardType="default"
        maxLength={20}
        palaceholder="Username"
        returnKeyType="done"
        enablesReturnKeyAutomatically
        style={styles.username}
        onSubmitEditing={this.props.onSubmitName}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    alignSelf: 'stretch',
    textAlign: 'center'
  }
})
