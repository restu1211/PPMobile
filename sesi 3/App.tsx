import { View,
         Text, 
         TextInput, 
         Pressable, 
         Alert, 
         StyleSheet
         } from 'react-native';
import React, { useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');

  const handleAddToTodo = () => {
    if (title.trim().length === 0) {
      Alert.alert('Error', 'Please enter your todo');
      return;
    }

    const newTodo: Todo = {
      id: todo.length + 1,
      title: title.trim(),
      completed: false,
    };

    setTodo([...todo, newTodo]);
    setTitle('');
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedTodo = todo.filter((item) => item.id !== id);
            setTodo(updatedTodo);
          },
        },
      ]
    );
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodo = todo.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodo(updatedTodo);
  };

  const handleEditTodo = (id: number, currentTitle: string) => {
    setIsEditing(true);
    setCurrentTodoId(id);
    setEditedTitle(currentTitle);
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim().length === 0) {
      Alert.alert('Error', 'Todo title cannot be empty');
      return;
    }

    const updatedTodo = todo.map((item) => {
      if (item.id === currentTodoId) {
        return { ...item, title: editedTitle.trim() };
      }
      return item;
    });

    setTodo(updatedTodo);
    setIsEditing(false);
    setCurrentTodoId(null);
    setEditedTitle('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTodoId(null);
    setEditedTitle('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your todo"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <Pressable onPress={handleAddToTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </Pressable>
      </View>

      {isEditing && (
        <View style={styles.editContainer}>
          <TextInput
            placeholder="Edit your todo"
            value={editedTitle}
            onChangeText={setEditedTitle}
            style={styles.input}
          />
          <View style={styles.editButtons}>
            <Pressable onPress={handleSaveEdit} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
            <Pressable onPress={handleCancelEdit} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      )}

      {todo.map((item) => (
        <View key={item.id} style={styles.todoItem}>
          <Text
            style={[
              styles.todoText,
              {
                textDecorationLine: item.completed ? 'line-through' : 'none',
                color: item.completed ? 'gray' : 'black',
              },
            ]}
          >
            {item.title}
          </Text>
          <View style={styles.todoActions}>
            <Pressable onPress={() => handleToggleComplete(item.id)}>
              <Text style={[styles.actionText, { color: item.completed ? 'gray' : 'green' }]}>
                {item.completed ? 'Completed' : 'Incomplete'}
              </Text>
            </Pressable>
            <Pressable onPress={() => handleEditTodo(item.id, item.title)}>
              <Text style={[styles.actionText, { color: 'orange' }]}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => handleDeleteTodo(item.id)}>
              <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: '#00FFFF',//aqua
    paddingTop: 50, 
  },
  inputContainer: {
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#0000FF', //blue
  },
  addButton: {
    backgroundColor: '#00FF00',// green
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'black',
    fontSize: 16,
  },
  editContainer: {
    marginBottom: 18,
    backgroundColor: '#f2f3f4',
    padding: 10,
    borderRadius: 5,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#f4a460',
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
    borderColor: 'blue',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f08080',
    padding: 10,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  todoItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
    
  },
  todoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'blue',
  },
});

export default TodoList;