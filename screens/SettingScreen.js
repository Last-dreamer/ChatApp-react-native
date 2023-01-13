import React from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';



const SettingScreen = props => {
    return <View style={styles.container}>
        <Text>SettingScreen</Text>
        <Button title="Go To Settings" onPress={()=> {props.navigation.navigate("ChatSettings")}} />
    </View>
}

const styles = StyleSheet.create({
   container: {
       flex:1,
       justifyContent: 'center',
       alignItems: 'center'
   }
});

export default SettingScreen;