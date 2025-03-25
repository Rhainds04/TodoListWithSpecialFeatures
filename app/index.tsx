import {
  Text,
  View,
  ScrollView,
  Alert,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  useColorScheme,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from 'react-native-dialog';
import OpenAI from 'openai';
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';

// Importez la fonction getStyles au lieu de s directement
import { s } from '../App.Style';

import { Header } from '../components/Header/Header';
import { CardTodo } from '../components/CardTodo/CardTodo';
import { Footer } from '../components/TabBottomMenu/TabBottomMenu';
import { ButtonAdd } from '../components/ButtonAdd/ButtonAdd';
import { ChatGptButton } from '../components/ChatGptButton/ChatGptButton';

let isFirstRender = true;
let isLoadUpdate = false;

const apiKey = '<YOUR_API_KEY>';

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export default function Index() {
  const [todoList, setTodoList] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newAiTodoTitle, setNewAiTodoTitle] = useState('');
  const [newTodoTimeLimit, setNewTodoTimeLimit] = useState('');

  const confettiRef = useRef<LottieView>(null);

  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);

  //Fonctionnalitée: Sort en ordre alphabétique.
  function sortTodos() {
    setTodoList([...todoList].sort((a, b) => a.title.localeCompare(b.title)));
  }

  //Fonctionnalitée: Delete all done tasks.
  let lastTap = 0;
  function handleDoubleTap() {
    const now = Date.now();
    if (now - lastTap < 300) {
      // Double tap detected, clear all tasks
      Alert.alert(
        'Supprimer toutes les tâches complétées',
        'Êtes-vous sûr de vouloir supprimer toutes les tâches complétées?',
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Supprimer',
            onPress: () => {
              setTodoList(prevTodos =>
                prevTodos.filter(todo => !todo.isCompleted)
              );
            },
          },
        ]
      );
    }
    lastTap = now;
  }

  //Fonctionnalitée: confetti and sound.
  const soundRef = useRef(null);

  useEffect(() => {
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/confettiSound.mp3')
        );
        soundRef.current = sound;
      } catch (error) {
        console.error('Error loading sound', error);
      }
    }

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  async function triggerConfetti() {
    confettiRef.current?.play(0);

    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.setPositionAsync(0);
        await soundRef.current.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound', error);
    }
  }

  async function saveTodoList() {
    console.log('SAVE');
    try {
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList));
    } catch (err) {
      alert('Erreur:' + err);
    }
  }

  async function loadTodoList() {
    console.log('LOAD');
    try {
      const stringifiedTodoList = await AsyncStorage.getItem('@todoList');
      if (stringifiedTodoList !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (err) {
      alert('Erreur:' + err);
    }
  }

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
      handleInput();
    } else {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);

  //Fonctionnalitée: Search Bar
  const [searchText, setSearchText] = useState('');

  function getFilteredTodos() {
    return todoList
      .filter(todo => {
        // Filtrage par onglet
        if (activeTab === 'InProgress') return !todo.isCompleted;
        if (activeTab === 'Done') return todo.isCompleted;
        return true; // "All" tab
      })
      .filter(todo =>
        // Filtrage par texte (insensible à la casse)
        todo.title.toLowerCase().includes(searchText.toLowerCase())
      );
  }

  function renderTodoList() {
    return getFilteredTodos().map(todo => (
      <View style={isDarkMode ? s.cardItemDark : s.cardItemLight} key={todo.id}>
        <CardTodo
          onPress={() => updateTodo(todo.id)}
          deleteTodo={() => deleteTodo(todo.id)}
          todo={todo}
          isDarkMode={isDarkMode}
        />
      </View>
    ));
  }

  function updateTodo(todoId: number) {
    const todo = todoList.find(t => t.id === todoId);
    if (!todo) return;

    if (!todo.isCompleted && !todo.xpGained) {
      const now = Date.now();
      const startTime = todo.id || now; //ID = Date.now() so it is the creation time of the todo
      const timeSpentMinutes = (now - startTime) / 60000;

      if (timeSpentMinutes <= todo.timeLimit) {
        setUserXP(userXP + 10);
        todo.xpGained = true;
      } else if (timeSpentMinutes > todo.timeLimit) {
        setUserXP(userXP - 10);
      }

      if (userXP <= 50) {
        setUserLevel(1);
      } else if (userXP > 50 && userXP <= 100) {
        setUserLevel(2);
      } else if (userXP > 100 && userXP <= 150) {
        setUserLevel(3);
      }
    }

    setTodoList(list =>
      list.map(todo =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );

    if (!todo.isCompleted) {
      triggerConfetti();
    }
  }

  function deleteTodo(todoId: number) {
    Alert.alert(
      'Supprimer la tâche',
      'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',

          onPress: () => {
            setTodoList(list => list.filter(todo => todo.id !== todoId));
          },
        },
      ]
    );
  }

  function addTodo() {
    console.log(newTodoTitle);
    if (newTodoTitle === '') {
      Alert.alert('Erreur', 'Le titre ne peut pas être vide.');
      return;
    }

    const timeLimit = newTodoTimeLimit.trim() === '' ? null : newTodoTimeLimit;

    const newTodo = {
      id: Date.now(), // Générer un ID unique (idéalement, utiliser un UUID)
      title: newTodoTitle,
      timeLimit: timeLimit,
      isCompleted: false,
      isAiGenerated: false,
      xpGained: false,
    };

    setTodoList([...todoList, newTodo]);
    setNewTodoTitle(''); // Réinitialiser le champ
    setNewTodoTimeLimit('');
    setIsAddDialogVisible(false); // Fermer le dialogue
  }

  function showAddDialog() {
    setIsAddDialogVisible(true);
  }

  //fonctionnalité ajouté

  const [input] = useState(
    'Génère une tâche à faire de 4 à 10 mots, en français. La tâche doit être différente de celles générées précédemment.'
  );

  const handleInput = async () => {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
        temperature: 0.5,
        max_tokens: 20,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });

      const generatedTask = response.choices[0].message.content;
      setNewAiTodoTitle(generatedTask);
      console.log(response.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };

  function addAiTask() {
    console.log(newAiTodoTitle);
    if (newAiTodoTitle === '') {
      Alert.alert('Erreur', 'Le titre ne peut pas être vide.');
      return;
    }

    const newTodo = {
      id: Date.now(), // Générer un ID unique (idéalement, utiliser un UUID)
      title: newAiTodoTitle,
      isCompleted: false,
      isAiGenerated: true,
    };

    setTodoList([...todoList, newTodo]);
    setNewAiTodoTitle(''); // Réinitialiser le champ
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={isDarkMode ? s.appDark : s.appLight}>
          <TouchableWithoutFeedback onPress={handleDoubleTap}>
            <View style={s.header}>
              <Header isDarkMode={isDarkMode} />
            </View>
          </TouchableWithoutFeedback>
          <View style={s.searchAndSortContainer}>
            <TextInput
              style={s.searchBar}
              placeholder="Rechercher une tâche..."
              placeholderTextColor={isDarkMode ? '#888888' : '#666666'}
              value={searchText}
              onChangeText={setSearchText}
            />
            <View style={isDarkMode ? s.sortBtnDark : s.sortBtnLight}>
              <Button title="Sort" onPress={sortTodos} color={'white'} />
            </View>
            <View>
              <Text style={isDarkMode ? s.levelTextDark : s.levelTextLight}>
                Level: {userLevel}
              </Text>
              <Text style={isDarkMode ? s.levelTextDark : s.levelTextLight}>
                XP: {userXP}
              </Text>
            </View>
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
          <LottieView
            ref={confettiRef}
            source={require('../assets/confettiAnimation.json')}
            autoPlay={false}
            loop={false}
            style={s.lottie}
            resizeMode="cover"
          />
          <ButtonAdd onPress={showAddDialog} isDarkMode={isDarkMode} />
          <ChatGptButton
            handleInput={handleInput}
            onPress={addAiTask}
            isDarkMode={isDarkMode}
          />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Footer
          all={todoList.length}
          inProgress={todoList.filter(todo => !todo.isCompleted).length}
          done={todoList.filter(todo => todo.isCompleted).length}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
        />
      </View>
      <Dialog.Container
        visible={isAddDialogVisible}
        onBackdropPress={() => setIsAddDialogVisible(false)}
      >
        <Dialog.Title>Créer une tâche</Dialog.Title>
        <Dialog.Input
          placeholder="Nom de tâche"
          onChangeText={setNewTodoTitle}
        ></Dialog.Input>
        <Dialog.Input
          placeholder="limite en minutes"
          onChangeText={setNewTodoTimeLimit}
        ></Dialog.Input>
        <Dialog.Button label="créer" onPress={addTodo}></Dialog.Button>
      </Dialog.Container>
    </>
  );
}
