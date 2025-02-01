<!-- HTTP-запити
У React немає вбудованого модуля для роботи з HTTP-запитами, тому ми можемо використовувати звичайні інструменти, наприклад бібліотеку Axios.

npm install axios
HTTP-запити можна виконувати як за подією, наприклад, при кліку на елементі чи відправці форми, так і без очікування дій користувача, тобто при монтажі компонента. У останньому випадку використовується ефект, який виконується після етапу монтажу, оскільки компонент вже був відображений у DOM і готовий до подальшого оновлення стану.

Наприклад, при монтажі ми будемо робити запити на Hacker News API та відображати список посилань на статті.
Ми будемо використовувати синтаксис async/await, але є проблема - колбек-функція, яку ми передаємо useEffect, не може бути асинхронною.

// ❌ Так робити не можна!
useEffect(async () => {
}, []);
 -->
<!-- Отже, всередині колбек-функції необхідно оголосити ще одну функцію, яка буде асинхронною, і викликати її одразу після оголошення. HTTP-запити слід виконувати всередині цієї функції.
const App = () => {
  useEffect(() => {
    async function fetchArticles() {
      const response = await axios.get(
        "https://hn.algolia.com/api/v1/search?query=react"
      );
	  console.log(response);
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>
    </div>
  );
};-->

<!--                                                 Обробка даних запиту
Щоб відобразити результат HTTP-запиту, його необхідно зберегти в стані компонента, іншого способу немає. Оголосимо стан articles і збережемо в ньому результат HTTP-запиту. Оскільки з бекенда буде приходити масив даних, початковим значенням стану буде порожній масив.
Відображення даних
При зміні стану компонент оновиться, тому можна використовувати стан для відображення JSX-розмітки. Використовуємо відображення за умовою і додаємо розмітку списку посилань на статті у випадку, якщо у масиві є хоча б один елемент.

Буде логічно виділити список статей у окремий компонент ArticleList і використовувати його в компоненті, де виконується HTTP-запит. Масив статей із стану батьківського компонента передаємо йому пропсом items.

!!! Зверніть увагу, що умовний рендерінг відбувається в батьківському компоненті App. Компонент ArticleList не знає, коли рендерити розмітку, це завдання компонента, в якому він використовується. Компонент ArticleList або рендериться, або ні, і це вирішує компонент App.

import { useEffect, useState } from "react";
import axios from "axios";

const ArticleList = ({ items }) => (
  <ul>
    {items.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await axios.get(
        "https://hn.algolia.com/api/v1/search?query=react"
      );
      setArticles(response.data.hits);
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};

Висновок. стандартну техніку виконання HTTP-запиту в React, яка складається з кількох етапів:
1)Виконати HTTP-запит, будь-то в ефекті чи при події
2)У засобах розробки на вкладці Network переконатися, що запит успішний, і у відповідь ми отримуємо дані
3)Оголосити у компоненті стан для зберігання результату запиту
4)Зберегти результат HTTP-запиту у стані
5)Використовувати стан для відображення JSX-розмітки-->

<!-- Індикатор завантаження
Під час виконання HTTP-запиту користувач замість компонента бачить порожній блок інтерфейсу, що абсолютно не інформативно. Тому під час HTTP-запиту потрібно відображати індикатор завантаження. Індикатор видно, доки запит виконується, і як тільки він завершується, індикатор приховується, а замість нього відображається компонент із завантаженими даними.

Індикатор завантаження є реактивним значенням, тому воно зберігається в стані компонента. У нього всього два значення:
1)false - запит ще не розпочався або вже завершився.
2)true - запит виконується.
Додамо стан loading для зберігання індикатора завантаження статей і використовуватимемо його в JSX для умовного відображення абзацу з текстом.

Далі потрібно перед HTTP-запитом встановити значення стану loading в true, а після запиту повернутися в false. Для цього у асинхронній функції використовуємо try...catch.
const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
		// 1. Встановлюємо індикатор в true перед запитом
        setLoading(true);
        const response = await axios.get(
          "https://hn.algolia.com/api/v1/search?query=react"
        );
        setArticles(response.data.hits);
      } catch (error) {
        // Тут будемо обробляти помилку
      } finally {
		// 2. Встановлюємо індикатор в false після запиту
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>
      {loading && <p>Loading data, please wait...</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};
 -->
<!--                                    Обробка помилок
HTTP-запит не завжди виконується без помилок, тому користувачеві обов'язково потрібно дати зрозуміти, якщо щось пішло не так. По-перше, додамо ще один стан error для зберігання помилки.
const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
	/* Решта коду */
};

У конструкції try...catch для обробки помилок використовується блок catch. Якщо він виконається, це означає, що проміс (HTTP-запит) був виконаний з помилкою.
const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://hn.algolia.com/api/v1/search?query=react"
        );
        setArticles(response.data.hits);
      } catch (error) {
				// Встановлюємо стан error в true
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);
	/* Остальной код */
};


Тепер у JSX можна використовувати стан error, щоб відобразити користувачеві повідомлення про помилку.
const App = () => {
  /* Решта коду */
	return (
    <div>
      <h1>Latest articles</h1>
      {loading && <p style={{ fontSize: 20 }}>Loading data, please wait...</p>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};-->

<!--                               Поділ відповідальності
Зберігати код, пов'язаний з HTTP-запитом, безпосередньо в компоненті - не найкраща практика. У застосунку буде багато різних запитів до бекенду, можливо навіть до декількох різних бекендів, і вони будуть використовуватися в різних компонентах. До того ж код HTTP-запитів може бути складним та громіздким.


ДОДАТКОВИЙ ФАЙЛ articles-api.js всередині папки src. У цьому файлі будемо зберігати функції для HTTP-запитів до бекенду із статтями.
// src/articles-api.js
import axios from "axios";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

export const fetchArticlesWithTopic = async topic => {
  const response = await axios.get(`/search?query=${topic}`);
  return response.data.hits;
};

1)Оголошуємо асинхронну функцію (async/await) отримання списку статей за заголовком.
2)Функція виконує HTTP-запит і повертає його результат - ПРОМІС із даними.
3)ОБРОБКА помилки не входить до тіла функції, це виконується в місці її використання, тобто в КОМПОНЕНТІ.
4)Імпортуємо функцію fetchArticlesWithTopic із файлу api.js в компонент і використовуємо її в ефекті.
// 1. Імпортуємо HTTP-функцію
import { fetchArticlesWithTopic } from "../articles-api.js";

export function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
		// 2. Використовуємо HTTP-функцію
		const data = await fetchArticlesWithTopic("react");
        setArticles(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

	return (
    <div>
      <h1>Latest articles</h1>
      {loading && <p>Loading data, please wait...</p>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};

Навіть в такому простому випадку ми приховали від компонента адресу запиту та специфіку відповіді. Компонент лише викликає функцію і передає їй ключове слово пошуку статей, після чого використовує результат. -->

<!--                     Пошук через форму
ArticleList - список посилань на статті
Article - компонент карточки списку, по суті, це просто посилання
Loader - індикатор завантаження, який можна виділити в окремий компонент
Error - повідомлення про помилку, яке можна виділити в окремий компонент
SearchForm -
Для того, щоб користувач міг самостійно вводити ключове слово для пошуку статей, в додаток необхідно додати форму пошуку.
Створимо компонент форми пошуку:
// src/components/SearchForm.jsx

export const SearchForm = ({ onSearch }) => {

	const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
	const topic = form.elements.topic.value;
    onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="topic" placeholder="Search articles..." />
      <button>Search</button>
    </form>
  );
};

Це НЕКОНТРОЛЬОВАНА форма з одним текстовим полем, значення якого потрібно лише при поданні форми.
Форма очікує один пропс onSearch - колбек-функцію, якій передасть значення поля при сабміті форми.

Якщо користувач нічого не ввів у текстове поле і намагається відправити форму, потрібно повідомити його про це, оскільки виконувати HTTP-запит без слова для пошуку не потрібно. Для цього в компоненті форми, в момент її відправлення, перевірте вміст текстового поля, і тільки в тому випадку, якщо введено щось, викличте пропс onSearch.
// src/components/SearchForm.jsx

export const SearchForm = ({ onSearch }) => {

	const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
		const topic = form.elements.topic.value;

		// Якщо текстове поле порожнє, виводимо повідомлення
		// і припиняємо виконання функції.
		if(form.elements.topic.value.trim() === "") {
			alert("Please enter search term!")
			return;
		}

		// У протилежному випадку викликаємо пропс
		// і передаємо йому значення поля
		onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="topic" placeholder="Пошук статей..." />
      <button>Пошук</button>
    </form>
  );
};


Форма пошуку рендериться в компоненті App, а функція handleSearch буде відповідати за код, який необхідно виконати при сабміті форми.
// src/components/App.jsx

import { SearchForm } from "./SearchForm";

const App = () => {

  const handleSearch = topic => {
	// ...
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};


Оскільки тепер користувач сам вводить рядок для пошуку статей, нам не потрібний ефект. Таким чином, будемо писати код всередині функції handleSearch, яка виконується при сабміті форми. Робимо її асинхронною і додаємо всередину код, пов'язаний з HTTP-запитом.
// src/components/App.jsx

const App = () => {
	const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

	const handleSearch = async (topic) => {
    try {
	  setArticles([]);
	  setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};

Зверніть увагу на дві речі перед кодом HTTP-запиту в функції handleSearch:
1) setArticles([]), за допомогою якого ми спеціально очищаємо стан articles перед новим запитом, щоб припинити відображення "старого" списку посилань.
2) setError(false), щоб скинути помилку перед наступним запитом, на випадок, якщо вона була у попередньому запиті.
-->

<!--                                                     Хук useMemo
Мемоізація це метод оптимізації комп'ютерних програм шляхом збереження результатів викликів функції та повернення кешованого результату при повторенні тих самих вхідних даних. Мемоізована функція «запам'ятовує» результат обчислень відповідний набору аргументів. Наступні виклики з такими самими значеннями аргументів повертають запам'ятаний результат, а не перераховують його.

Іноді компонентам доводиться виконувати дорогі синхронні обчислення. Хук useMemo використовує концепцію мемоізації, тобто повертає кешований результат обчислень.

import { useMemo } from "react";

Хук useMemo приймає два аругменти:
1) анонімна функція, яка повертає значення, саме вона буде мемоізована.
2) масив залежностей, при зміні якоїсь з них, викликається функція передана першим аргументом.

const memoizedValue = useMemo(() => {
  return a + b;
}, [a, b]);

Алгоритм роботи хука useMemo:
- При першому рендері компонента викликається функція, результат запам'ятовується і повертається як результат роботи хука.
- Якщо за наступних рендерів залежності не змінюються, то хук не викликає функцію, а просто повертає збережений результат роботи.
- Якщо будь-яка залежність змінилася, то хук викликає функцію заново, запам'ятовує нове значення та повертає його.

Приклад.
Кожного разу, коли змінюється стан clicks, компонент буде оновлено, що призведе до обчислення filteredPlanets, хоча значення planets та query не змінилися! Оскільки метод filter повертає посилання на новий масив, React сприймає це як абсолютно нові дані та список планет буде відображено заново. У такому разі варто мемоізувати обчислення filteredPlanets.
 -->
<!-- отже
Те ж саме стосується дорогих операцій, таких як використання довгого циклу for. Дорогі обчислення можуть бути витратними за часом, що гарантовано призведе до погіршення роботи інтерфейсу.

Але, більше не означає краще! Не потрібно мемоізувати все поспіль, це може призвести до ВТРАТ продуктивності, оскільки мемоізація також ЗАЙМАЄ ОБЧИСЛЮВАЛЬНІ РЕСУРСИ. Найчастіше повторні ПРОСТІ обчислення обійдуться дешевше, ніж їхня мемоїзація.
!!! Використовуйте useMemo() ТОЧКОВО, в першу чергу при роботі з МАСИВАМИ та для ДОРОГИХ ОБЧИСЛЕНЬ (цикл FOR тощо). -->

<!--                                                       Хук useRef

Рефи дозволяють отримати прямий доступ до DOM-вузлів або React-елементів із шаблону компонента. Вони використовуються якщо необхідно звернутися до DOM-методів та властивостей елемента.

- Фокус елемента під час події, виділення тексту.
- Контроль програвання медіаконтенту.
- Інтеграція з DOM-бібліотеками.
- Доступ до DOM-властивостей, значення яких неможливо отримати по-іншому - розміри елемента, значення скрола тощо.

Створення
Рефи створюються хуком useRef() та прив'язані до React-елементів за допомогою атрибуту ref (скорочення від reference), який зберігатиме посилання на DOM-елемент.

import { useRef } from "react";

const App = () => {
  const btnRef = useRef();

  return <button ref={btnRef}>Button with ref</button>;
};

                                 Життєвий цикл рефа

React надає властивості current посилання на DOM-елемент коли компонент монтується та undefined при розмонтуванні, тому значення рефа доступне тільки після монтування.

import { useState, useRef } from "react";

const App = () => {
  const [value, setValue] = useState(0);
  const btnRef = useRef();

	// Буде undefined на першому рендері
	// і посиланням на DOM-елемент всі наступні
  console.log("App: ", btnRef.current);

  useEffect(() => {
		// Ефект виконується після монтування,
		// тому завжди буде посиланням на DOM-елемент
    console.log("useEffect: ", btnRef.current);
  });

  const handleClick = () => {
		// Кліки будуть після монтування,
		// тому завжди буде посиланням на DOM-елемент
    console.log("handleClick: ", btnRef.current);
  };

  return (
    <>
      <button onClick={() => setValue(value + 1)}>
        Update value to trigger re-render
      </button>
      <button ref={btnRef} onClick={handleClick}>
        Button with ref
      </button>
    </>
  );
};


                     Відсутність реактивності
Рефи це не стан, тобто вони не реактивні, тому зміна значення рефа не впливає на оновлення компонента і не викликає повторний рендер.
import { useEffect, useRef } from "react";

const App = () => {
  const valueRef = useRef(0);

  useEffect(() => {
		// Виконається лише один раз під час монтування.
		// Наступні оновлення значення рефа не
		// викличуть оновлення компонента
    console.log(valueRef.current);
  });

  const handleClick = () => {
    valueRef.current += 1;
  };

  return <button onClick={handleClick}>Click to update ref value</button>;
};


РЕФИ також можна використовувати як СХОВИЩЕ ДОІЛЬНИХ ЗНАЧЕННЬ, які не змінюються між рендерами компонента та на нього не впливають. Тому в прикладі хуку useRef передано початкове значення якості current - число 0. Ця можливість використовується для класу завдань при створенні складніших компонентів.

                    Відеоплеєр
Створимо компонент Player для програвання відео, використовуючи нативний тег <video>. Щоб запустити та зупинити програвання необхідно викликати методи HTMLMediaElement.play() та HTMLMediaElement.pause(), де HTMLMediaElement це елемент <video>. Використовуємо реф для отримання доступу до DOM-елементу та його методам.
import { useRef } from "react";

const Player = ({ source }) => {
  const playerRef = useRef();

  const play = () => playerRef.current.play();

  const pause = () => playerRef.current.pause();

  return (
    <div>
      <video ref={playerRef} src={source}>
        Sorry, your browser does not support embedded videos.
      </video>
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
};

const App = () => {
  return <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />;
};
 -->
<!-- Перенаправлення рефів

При використанні рефів на компоненті, проп ref не передається автоматично. Це створює проблеми у випадку коли ми хочемо отримати ref на елемент усередині самого компонента, а не на сам компонент. Для цього використовується функція forwardRef.

import { forwardRef, useRef, useEffect } from "react";

const CustomButton = forwardRef((props, ref) => (
  <button ref={ref}>{props.children}</button>
));

const App = () => {
  const btnRef = useRef();

  useEffect(() => btnRef.current.focus(), []);

  return <CustomButton ref={btnRef}>Button with forwarded ref</CustomButton>;
};

Такий підхід дозволяє отримати посилання у батьківському компоненті на DOM-елемент усередині іншого компонента. Наприклад, ви створюєте галерею, так можна отримати посилання на DOM-елементи поза них і працювати з їх властивостями, наприклад використовувати метод Element.getBoundingClientRect() і тому подібне. -->

<!-- Власні хуки



Першочергове завдання хуків - спростити повторне використання коду (логіки) для розробників. Створення власних хуків це процес отримання логіки компонентів у повторно використовувані функції. Це зробить код проекту чистішим і легше у підтримці.



Хук це просто функція, ім'я якої обов'язково починається з приставки use. Саме по ній React визначатиме це звичайна функція чи хук. Наприклад: useState, useEffect, useToggle, useDevice, useImages і так далі. Власні хуки створюються поза тілом компонента, часто навіть в окремих файлах, та можуть викликати інші хуки, так досягається просте повторне використання коду.



Створення власних хуків потребує досвіду роботи з хуками та React загалом. Не варто спеціально прагнути зробити у проекті власні хуки. Якщо ви явно бачите можливість повторного використання коду - добре, зробіть свій хук. В іншому випадку краще сконцентруватися на вивченні основного матеріалу та використання вбудованих React-хуків або готових хуків із бібліотек на кшталт react-use.


Хук useToggle



Розглянемо приклад де у двох компонентах необхідна логіка відкриття, закриття та перемикання елемента інтерфейсу, наприклад модального вікна та сайдбару.



// ComponentA.jsx
const ComponentA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={openModal}>Open modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

// ComponentB.jsx
const ComponentB = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <button onClick={openSidebar}>Open sidebar</button>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
};




Створення стану та функцій для відкриття/закриття модального вікна ідентично в кожному компоненті, тобто відбувається дублювання коду. Уявіть, що буде в проекті, де модальні вікна, сайдбари, спливаючі вікна відкриваються десятки чи навіть сотні разів. Створимо власний хук useToggle в якому приховаємо створення стану та функцій роботи з ним.



// src/hooks/useToggle.js

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};




Власний хук може приймати будь-які аргументи і повертати будь-що, правил немає, залежить від реалізації. У нашому випадку це об'єкт із властивостями.

Тоді код із попереднього прикладу буде виглядати наступним чином.



// ComponentA.jsx
import { useToggle } from "../hooks/useToggle.js";

const ComponentA = () => {
  const { isOpen, open, close } = useToggle();

  return (
    <>
      <button onClick={open}>Open modal</button>
      <Modal isOpen={isOpen} onClose={close} />
    </>
  );
};

// ComponentB.jsx
import { useToggle } from "../hooks/useToggle.js";

const ComponentB = () => {
  const { isOpen, open, close } = useToggle();

  return (
    <>
			<button onClick={open}>Open sidebar</button>
      <Sidebar isOpen={isOpen} onClose={close} />
    </>
  );
};



Навіть у такому простому випадку ми значно зменшили повторення коду, структурували файли проекту, зробили компоненти чистішими та спростили майбутній рефакторинг компонентів та логіки хука.



Оскільки хуки є звичайними функціями, їм можна передавати аргументи, наприклад, для початкового значення стану. Розширимо хук useToggle так, щоб можна було зробити модальне вікно спочатку відкритим. За замовчуванням робимо його закритим.



// src/hooks/useToggle.js
export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};

// MyComponent.jsx
import { useToggle } from "../hooks/useToggle.js";

const MyComponent = () => {
  const { isOpen, open, close } = useToggle(true);

  return (
    <>
      <button onClick={open}>Open modal</button>
      <Modal isOpen={isOpen} onClose={close} />
    </>
  );
}; -->
