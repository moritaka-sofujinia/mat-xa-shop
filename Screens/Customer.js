import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../App';
import AntDesign from '@expo/vector-icons/AntDesign';

const theme = {
  background: '#F0F5F9',
  text: '#171717',
  primary: '#4ca1af',
  secondary: '#444444',
  accent: '#EDEDED',
};

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${user?.fullname || 'Admin'}`,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.avatarButton}>
          <Icon name="account-circle" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, user]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const fetchUsers = async () => {
    const usersCollection = collection(db, 'user');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(usersList);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      fetchUsers(); // Lấy tất cả người dùng nếu không có từ khóa tìm kiếm
      return;
    }

    const usersCollection = collection(db, 'user');
    const q = query(
      usersCollection, 
      where("email", ">=", searchQuery), 
      where("email", "<=", searchQuery + '\uf8ff')
    );
    
    const querySnapshot = await getDocs(q);
    const searchResults = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(searchResults);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.userInfo}>
        <Text style={styles.title}>{item.email}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search customer..."
          placeholderTextColor={theme.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Gọi hàm tìm kiếm khi nhấn Enter
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <AntDesign name="search1" size={24} color={theme.accent} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.background,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: theme.secondary,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.accent,
    color: theme.text,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  list: {
    paddingBottom: 80,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.accent,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: theme.text,
  },
  role: {
    fontSize: 14,
    color: theme.secondary,
  },
});

export default Customer;
