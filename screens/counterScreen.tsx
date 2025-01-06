import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAtom } from 'jotai';
import { counterAtom, randomUserAtom } from '../atoms';

const CounterJotai = () => {
  const [count, setCount] = useAtom(counterAtom);
  const [randomUser, setRandomUser] = useAtom(randomUserAtom);

  return (
    <View style={styles.container}>
      {/* Counter Section */}
      <View style={styles.card}>
        <Text style={styles.title}>Counter</Text>
        <Text style={styles.counter}>{count}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>Increment Counter</Text>
        </TouchableOpacity>
      </View>

      {/* Random User Section */}
      <View style={styles.card}>
        <Text style={styles.title}>Random User</Text>
        <Text style={styles.userInfo}>
          {randomUser
            ? `${randomUser.name.first} ${randomUser.name.last}`
            : 'No user loaded'}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => fetchRandomUser(setRandomUser)}
        >
          <Text style={styles.buttonText}>Fetch Random User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const fetchRandomUser = async (setRandomUser) => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    setRandomUser(data.results[0]);
  } catch (error) {
    console.error('Error fetching random user:', error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
    marginVertical: 10,
  },
  userInfo: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#555555',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CounterJotai;
