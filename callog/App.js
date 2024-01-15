import React, {useState, useEffect} from 'react';


import {
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  FlatList,
} from 'react-native';


import CallLogs from 'react-native-call-log';

const App = () => {
  const [listData, setListDate] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (Platform.OS != 'ios') {
        try {
          
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
              title: 'Call Log Example',
              message: 'Access your call logs',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            CallLogs.loadAll().then((c) => setListDate(c));
            CallLogs.load(3).then((c) => console.log(c));
          } else {
            alert('Call Log permission denied');
          }
        } catch (e) {
          alert(e);
        }
      } else {
        alert(
          'Sorry! You can’t get call logs in iOS devices',
        );
      }
    }
    fetchData();
  }, []);

  const ItemView = ({item}) => {
    return (
      
      <View>
        <Text style={styles.textStyle}>
          Name : {item.name ? item.name : 'NA'}
          {'\n'}
          DateTime : {item.dateTime}
          {'\n'}
          Duration : {item.duration}
          {'\n'}
          PhoneNumber : {item.phoneNumber}
          {'\n'}
          RawType : {item.rawType}
          {'\n'}
          Timestamp : {item.timestamp}
          {'\n'}
          Type : {item.type}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>
          
        </Text>
        <FlatList
          data={listData}
          
          ItemSeparatorComponent={ItemSeparatorView}
         
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 16,
    marginVertical: 10,
  },
});