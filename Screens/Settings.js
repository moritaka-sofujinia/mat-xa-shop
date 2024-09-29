import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { AuthContext } from '../App'; // Đảm bảo bạn đã import AuthContext

const settingsOptions = [
  { id: '1', title: 'Accounts', icon: 'user' },
  { id: '2', title: 'Security & Safety', icon: 'flag' },
  { id: '3', title: 'Accessibility', icon: 'eye' },
  { id: '4', title: 'Language', icon: 'book' },
  { id: '5', title: 'Advanced', icon: 'setting' },
  { id: '6', title: 'Support', icon: 'questioncircleo' },
  { id: '7', title: 'Sign Out', icon: 'logout' },
];

const SettingsScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handlePress(item)}
    >
      <View style={styles.iconContainer}>
        <AntDesign name={item.icon} size={24} color="black" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
      <Feather name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    if (item.title === 'Sign Out') {
      Alert.alert(
        'Logout',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: handleLogout,
          },
        ],
        { cancelable: false }
      );
    } else if (item.title === 'Accounts') {
      navigation.navigate('Profile'); // Đảm bảo 'Profile' là tên route đúng trong navigator của bạn
    } else {
      // Handle navigation for other settings
      // For example: navigation.navigate(item.title);
    }
  };

  const handleLogout = () => {
    signOut();
    // Uncomment the line below if you want to navigate to the Login screen after logout
    // navigation.navigate('Auth', { screen: 'Login' });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  iconContainer: {
    marginRight: 10,
  },
});

export default SettingsScreen;
