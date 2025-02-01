import { useState, useEffect, useContext } from 'react'
import './App.css'
import toast from 'react-hot-toast';
import * as apiFunctions from '../services/api.js';

import colors from '../colors.json';
import initialTasks from '../tasks.json';

import Container from './Container/Container';
import Clock from './Clock/Clock'
import Counter from './Counter/Counter';
import ColorPicker from './ColorPicker/ColorPicker';
import ToDoList from './ToDoList/ToDoList';
import Modal from './Modal/Modal';
import Vote from './Vote/Vote';
import Form from './FormFilterTaskList/Form/Form';
import Filter from './FormFilterTaskList/Filter/Filter';
import TaskList from './FormFilterTaskList/TaskList/TaskList';
import ControlledForm from './ControlledForm/ControlledForm';
import UseIdExample from './useIdExample/useIdExample';
import LangSwitcher from './LangSwitcher/LangSwitcher';
import ImprovedCounter from './ImprovedCounter/ImprovedCounter';
import FileUploader from './FileUploader/FileUploader.tsx';
import FormFormikAndYup from './FormFormikAndYup/FormFormikAndYup.jsx';
import ArticleList from './ArticleFinder/ArticleList/ArticleList.jsx';
import Loader from './ArticleFinder/Loader/Loader.jsx';
import Error from './ArticleFinder/Error/Error.jsx';
import SearchBar from './ArticleFinder/SearchBar/SearchBar.jsx';
import UseMemoExample from './useMemoExample/useMemoExample.jsx';
import UseRefExample from './UseRefExample/UseRefExample.jsx';
import { ForwardRefExample } from './UseRefExample/ForwardRefExample.jsx';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import { authContext } from './Provider/AuthentProvider/AuthentProvider.jsx';
import FormLogin from './FormLogin/FormLogin.jsx';
import { themeContext } from './Provider/ThemeProvider/ThemeProvider.jsx';
import clsx from 'clsx';
// import Player from './Player/Player.jsx';




function App() {
  // context for login and for theme toggle
  const { userName } = useContext(authContext);
  const { theme } = useContext(themeContext);
  // Modal region
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  // Form&&Filter&&Task region
  const [tasks, setTasks] = useState(() => { return JSON.parse(window.localStorage.getItem('tasksWithForm')) ?? initialTasks;});
  const [filter, setFilter] = useState('');

 useEffect(()=>{window.localStorage.setItem('tasksWithForm', JSON.stringify(tasks))}, [tasks])
  const onAdd = (newTask) => {
    setTasks((prevTasks) => {
return [...prevTasks, newTask]
    })
  }
  const onDelete = (id) => {
  console.log(id);
    setTasks((prevTask) => {
      return prevTask.filter(task => task.id !== id);
  })
  }
  // якщо фільтр буде пустий ("") то інклюдс завжди поверне тру тому відмалюється у список всі таски 
  const visibleTasks = tasks.filter(task => task.text.toLowerCase().includes(filter.toLocaleLowerCase()));
  // ControlledForm region
  // ф-ція для забирання данних з форми, передаємо її через пропс на компонент з якого забираєм дані
  const register = dataFromForm => {
    console.log(dataFromForm);
  }
  // LangSwicher region
  const [lang, setLang] = useState("uk");
  // ArticleFinder with API region
  const [articles, setArticles] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [nbHits, setNbHits] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  useEffect(() => {
    if (!newTopic) return;

    const getData = async () => {
      try {
        setIsError(false);
        setIsLoad(true);
        const { hits, nbHits, nbPage } = await apiFunctions.fetchArticlesWithTopic(newTopic, page, perPage);
        setArticles(prev => [...prev, ...hits]);
        setNbHits(nbHits);
        setMaxPage(nbPage);
    } catch {
        setIsError(true);
        toast.error('Server is dead. Try again later:)')
   } finally {
        setIsLoad(false);
      }
    }
    
  getData();
  }, [newTopic, page, perPage])

  const useNewTopic = (newSearch) => {
    setNewTopic(newSearch);
    setArticles([]);
    setPage(0);
    setPerPage(10);
}

  const updatePerPage = (newPer) => {
    
    if (newPer > nbHits) {
     return toast.error('The number of visible articles cannot be more than their total number');
    }
 
    setArticles([]);
    setPerPage(newPer);
}

  return (
    userName ? <>
      <Header> <button onClick={openModal}>Modal</button>
        {isOpen && <Modal closeModal={closeModal} title={'Hello. How are you?'} />}</Header>
      <main className={clsx(theme === 'light' ? 'light' : 'dark')}>
      <Clock />
      <Container><Counter /></Container>
      <Container><ColorPicker array={colors} /></Container>
      <Container> <ToDoList/></Container>
      <Container><Vote/></Container>
      <Container>
        <h2>Tasks list with filter</h2>
        <Form onAdd={onAdd} />
        <Filter value={filter} setFilter={setFilter} />
        <TaskList tasks={visibleTasks} onDelete={onDelete}/>
      </Container>
      <Container>
        <ControlledForm register={register} />
      </Container>
      <Container>
        <FormFormikAndYup/>
      </Container>
      <Container>
        <UseIdExample/>
      </Container>
      <Container>
        <LangSwitcher value={lang} onSelect={setLang}/>
      </Container>
      <Container>
        <ImprovedCounter lsKey={crypto.randomUUID()}/>
      </Container>
      <Container>
        <FileUploader/>
      </Container>
      <Container>
        <h2>Search articles by topics</h2>
        <SearchBar func={useNewTopic} updatePerPage={updatePerPage}/>
        <ArticleList data={articles} />
        {isLoad && <Loader />}
        {isError && <Error />}
        {articles.length > 0 && <button onClick={() => {
          if (page >= maxPage) {
           return toast.error('Out of articles!');
          }
        return setPage(prev => prev + 1)
        }}>Load more</button>}
      </Container>
      <Container>
        {/* <Player source={'https://videos.pexels.com/video-files/1448735/1448735-uhd_2732_1440_24fps.mp4'}/> */}
      </Container>
      <Container>
      <UseMemoExample/>
      </Container>
      <Container>
        <UseRefExample/>
      </Container>
      <Container>
        <ForwardRefExample/>
        </Container>
        </main>
      <Footer/>
    </> : <FormLogin/>
  )
}

export default App
