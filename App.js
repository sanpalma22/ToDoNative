import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState('');

  const agregarTarea = () => {
    if (texto.trim() === '') {
      Alert.alert('Error', 'El texto de la tarea no puede estar vacío.');
      return;
    }
    setTareas([...tareas, { texto, hecho: false }]);
    setTexto('');
  };

  const toggleTarea = (index) => {
    const nuevasTareas = tareas.map((tarea, i) =>
      i === index ? { ...tarea, hecho: !tarea.hecho } : tarea
    );
    setTareas(nuevasTareas);
  };

  const borrarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          placeholder="Ingrese lo que tenga que hacer"
        />
        <Button title="AGREGAR TAREA" onPress={agregarTarea} />
      </View>
      <FlatList
        data={tareas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={item.hecho ? styles.tareaHecha : styles.tareaPendiente}>
            <TouchableOpacity onPress={() => toggleTarea(index)}>
              <Text style={item.hecho ? styles.textoTareaHecha : styles.textoTareaPendiente}>
                {item.texto}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => borrarTarea(index)}>
              <Text>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d7eaff',
    padding: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 40,
    fontSize: 16,
  },
  tareaHecha: {
    backgroundColor: 'rgba(240, 128, 128, 0.655)',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tareaPendiente: {
    backgroundColor: 'rgba(144, 238, 144, 0.655)',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textoTareaHecha: {
    textDecorationLine: 'line-through',
    fontSize: 18,
  },
  textoTareaPendiente: {
    fontSize: 18,
  },
});

export default App;
