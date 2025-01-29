<!-- Форми
Основна мета будь-якої форми – отримати дані користувача.
-Для того щоб обробити відправку форми, елементу форми передається колбек-функція в пропс onSubmit.
-Колбек-функція отримає єдиний аргумент - об'єкт події відправки форми. Використовуючи його, ми завдаємо запобігання типової поведінці HTML-форми за допомогою методу preventDefault.-->
<!--                                             НЕКОНТРОЛЬОВАНА форма
Якщо значення полів форми потрібні лише в момент її відправки, то така форма називається неконтрольованою. Доступ до значень елементів отримуємо через властивість elements
const LoginForm = () => {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const { login, password } = form.elements;

		// Посилання на DOM-елементи
    console.log(login, password);

		// Значення полів
		console.log(login.value, password.value)

		// Скидаємо значення полів після відправки
		form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="login" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};
- Властивість elements зберігає об'єкт із властивостями, імена яких збігаються зі значеннями атрибутів name елементів форми.
- Значенням кожної властивості буде посилання на DOM-елемент поля.
- Щоб отримати доступ до значень полів, звертаємося до властивості value.
- Щоб скинути значення полів форми в початкові, використовується вбудований DOM-метод reset елемента form. -->

<!-- Використання форми
На практиці форма це окремий компонент, який в більшості випадків повинен турбуватися тільки про збір значень своїх полів. Те, що з цими значеннями потрібно зробити, передається формі у вигляді пропса від батьківського компонента, де форма рендериться. -->
<!-- Передавати ОБ*ЄКТ ПОДІЇ В ПРОПС - це АНТИПАТЕРН.  в пропс onLogin ми передаємо дані полів форми, а не об'єкт події. Об'єкт події використовується лише всередині форми для скасування типової поведінки і роботи з її елементами.
const App = () => {

  // Колбек-функція для обробки сабміту форми
  const handleLogin = (userData) => {
    // Виконуємо необхідні операції з даними
    console.log(userData);
  };

  return (
    <div>
      <h1>Please login to your account!</h1>
      {/* Передаємо колбек як пропс форми */}
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

У компоненті форми деструктуризуємо пропс onLogin, це функція, тому викликаємо її при сабміті форми і передаємо їй значення полів.
const LoginForm = ({ onLogin }) => {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const { login, password } = form.elements;

    // Викликаємо пропс onLogin
    onLogin({
      login: login.value,
      password: password.value,
    });

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="login" />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};
-->

<!--                                                   Хук useId
Хук useId використовується для генерації унікальних ідентифікаторів, які можна передавати атрибутам доступності полів форми.
import { useId } from 'react';
const MyComponent = () => {
	const id = useId();
};

Хук useId:
- Не приймає жодних параметрів.
- Повертає унікальний рядок ідентифікатора.
- HTML-атрибут for тегу label, який в React представлений jsx-атрибутом htmlFor, допомагає асистивним технологіям, зв'язуючи поле і label за ідентифікатором.

import { useId } from "react";

const MyComponent = () => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Text field label</label>
      <input type="text" id={id} />
    </div>
  );
};

!!! Не слід використовувати useId для генерації ключів у списку, він призначений лише для створення ідентифікаторів полів форми.

Для кожної форми можна створити стільки ідентифікаторів, скільки потрібно. Кожен ідентифікатор зберігається в окремій змінній.
const LoginForm = () => {
  const loginId = useId();
  const passwordId = useId();

  return (
    <form>
      <label htmlFor={loginId}>Login</label>
      <input type="text" name="login" id={loginId} />

      <label htmlFor={passwordId}>Password</label>
      <input type="password" name="password" id={passwordId} />

      <button type="submit">Login</button>
    </form>
  );
};

Ви можете поставити логічне питання: для чого створювати унікальні ідентифікатори? Давайте подумаємо, що буде, якщо на одній сторінці буде більше однієї копії компонента форми?

По-перше, значення атрибута id повинно бути унікальним в HTML документі, інакше воно буде невалідним.
По-друге, фокус елементів форми буде працювати неправильно через повторювані ідентифікатори. Браузер не буде знати, на який елемент встановлювати фокус при кліку на label. -->

<!--                                КОНТРОЛЬОВАНІ елементи
Якщо значення елементів форми потрібно отримати кожен раз у момент зміни поля і зробити щось динамічно, вони мають бути контрольовані. Значення таких полів зберігаються в стані компонента.
!!!
Контрольовані елементи використовуються не тільки як частина форми, але і без неї. Наприклад, для створення полів пошуку, фільтрів та інших динамічних елементів інтерфейсу. !!!Елементи всередині однієї форми повинні бути або всі контрольовані, або всі неконтрольовані, перемішувати їх не можна.

Щоб зробити input контрольованим елементом, потрібно виконати два кроки:
1) Атрибуту value потрібно передати значення стану inputValue.
2) При події onChange отримати значення поля і записати його в стан inputValue.
const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>{inputValue}</p>
    </div>
  );
}; -->
<!--                             Елемент select
Селект складається з самого елемента select та вкладеного набору option, у яких необхідно вказати атрибут value. -->
<!-- Якщо селект використовується ПОЗА ФОРМОЮ, то ми працюємо з ним як з КОНТРОЛЬОВАНИМ елементом:

1)Зберігаємо поточне значення в стані.
2)Передаємо значення стану як атрибут value.
3)Змінюємо стан при події onChange.

const LangSwitcher = () => {
  const selectId = useId();
  const [lang, setLang] = useState("uk");

  return (
    <div>
      <label htmlFor={selectId}>Choose language</label>
      <select
        id={selectId}
        value={lang}
        onChange={(evt) => setLang(evt.target.value)}
      >
        <option value="uk">Ukrainian</option>
        <option value="en">English</option>
        <option value="pl">Polish</option>
      </select>
    </div>
  );
};

НЕКОНТРОЛЬОВАНИЙ
Якщо селект є частиною неконтрольованої форми, то спочатку ми задаємо йому атрибут name, а потім отримуємо значення селекта під час сабміту форми через її властивість evt.target.elements.selectName.value, де selectName - це значення атрибута name. -->

<!--                                           Радіо-кнопки
Радіо-кнопки є альтернативою select, оскільки в групі може бути обрано лише один варіант. Тобто радіо-кнопки працюють в групі і дозволяють вибрати один варіант із багатьох.

const App = () => {
  return (
    <>
      <h1>Select coffee size</h1>
      <label>
        <input type="radio" name="coffeeSize" value="sm" />
        Small
      </label>
      <label>
        <input type="radio" name="coffeeSize" value="md" />
        Meduim
      </label>
      <label>
        <input type="radio" name="coffeeSize" value="lg" />
        Large
      </label>
    </>
  );
};

-Групування радіо-кнопок відбувається за допомогою однакового значення атрибута name.
-Значення кожної опції зберігається у атрибуті value.
-Обране значення зберігається в стані.
-Щоб визначити, чи обрано опцію чи ні, атрибуту checked необхідно передати true чи false. Для цього атрибуту checked передається результат порівняння стану і значення атрибута value конкретної радіо-кнопки.

const App = () => {
  const [coffeeSize, setCoffeeSize] = useState("sm");

  return (
    <>
      <h1>Select coffee size</h1>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="sm"
          checked={coffeeSize === "sm"}
        />
        Small
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="md"
          checked={coffeeSize === "md"}
        />
        Meduim
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="lg"
          checked={coffeeSize === "lg"}
        />
        Large
      </label>
    </>
  );
};

Після цього в інструментах розробника ми бачимо знайоме попередження. Ми використовуємо патерн контрольований елемент, зберігши значення в стані, але не передали атрибут onChange, щоб при виборі опції змінювати стан.

Передамо кожній радіо-кнопці в групі атрибут onChange, значенням якого буде функція, всередині якої ми записуємо обране значення в стан компонента.

const App = () => {
  const [coffeeSize, setCoffeeSize] = useState("sm");

  const handleSizeChange = (evt) => {
    setCoffeeSize(evt.target.value);
  };

  return (
    <>
      <h1>Select coffee size</h1>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="sm"
          checked={coffeeSize === "sm"}
          onChange={handleSizeChange}
        />
        Small
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="md"
          checked={coffeeSize === "md"}
          onChange={handleSizeChange}
        />
        Meduim
      </label>
      <label>
        <input
          type="radio"
          name="coffeeSize"
          value="lg"
          checked={coffeeSize === "lg"}
          onChange={handleSizeChange}
        />
        Large
      </label>
    </>
  );
};


<!--                                                         Чекбокси
Якщо радіо-кнопки призначені для вибору одного з багатьох елементів, то чекбокси дозволяють обрати багато з багатьох. Чекбокс, так само, як і радіо-кнопка, може знаходитися в двох станах: обраний або ні.

Створимо інтерфейс, що складається з чекбокса та кнопки. Задача - зробити так, щоб кнопка була активною лише тоді, коли обраний чекбокс.
1)Для цього робимо чекбокс контрольованим елементом, тобто оголошуємо стан і функцію його зміни. У кнопці використовуємо стан для атрибута disabled, так вона буде активною лише тоді, коли в стані буде true, тобто чекбокс обраний.
2)Передаємо чекбоксу значення стану і функцію оновлення як атрибути checked і onChange.
3)Щоб дізнатися, обраний чекбокс чи ні при зміні, у функції-обробнику звертаємося до властивості DOM evt.target.checked, значення якої буде true або false, і записуємо його в стан.
!Тепер кнопка буде активною лише тоді, коли чекбокс обраний, і користувач не зможе пройти далі, не прийнявши умови використання.
const App = () => {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleChange = (evt) => {
    setHasAccepted(evt.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="terms"
          checked={hasAccepted}
          onChange={handleChange}
        />
        I accept terms and conditions
      </label>
      <button type="button" disabled={!hasAccepted}>
        Proceed
      </button>
    </div>
  );
};
При роботі з групою чекбоксів їх значення зберігаються в властивості value, як і в разі з радіо-кнопками, а обрані значення зберігаються в стані як масив чи об'єкт. Це потрібно в більш складних формах, створення яких ми розглянемо пізніше.
 -->

<!-- Контрольована форма
Якщо значення полів форми є не лише необхідними у момент її відправлення, а й кожного разу при зміні значень, наприклад, для додавання валідації полів, то таку форму називають контрольованою.



Складні контрольовані форми, особливо з валідацією, зазвичай створюються не вручну, а за допомогою бібліотек, про які ми розглянемо в наступних уроках. Зараз для нас важливо розібратися, як це працює, щоб при використанні бібліотек це не виглядало як чорна магія.


Дані всіх елементів контрольованої форми зберігаються у стані та передаються як значення їх атрибута value.



const LoginForm = () => {
  const [values, setValues] = useState({
    login: "",
    password: ""
  });

  return (
    <form>
      <input type="text" name="login" value={values.login} />
      <input type="password" name="password" value={values.password} />
      <button type="submit">Login</button>
    </form>
  );
};



Зверніть увагу, що імена властивостей об'єкта стану (login та password) збігаються зі значеннями атрибутів name елементів форми. Ми використовуємо це пізніше для оптимізації обробки значень.


Далі для кожного поля оголошуємо функцію оновлення стану і передаємо їх як значення атрибута onChange. Колбек-функція отримає один аргумент - об'єкт події.



const LoginForm = () => {
  const [values, setValues] = useState({
    login: "",
    password: "",
  });

  const handleLoginChange = (evt) => {
    setValues({
      ...values,
      login: evt.target.value,
    });
  };

  const handlePwdChange = (evt) => {
    setValues({
      ...values,
      password: evt.target.value,
    });
  };

  return (
    <form>
      <input
        type="text"
        name="login"
        value={values.login}
        onChange={handleLoginChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handlePwdChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};



Якщо уважно поглянути на функції оновлення стану, можна помітити, що вони практично ідентичні:

Отримують об'єкт події
Викликають функцію зміни стану setValues
Використовують evt.target.value, щоб отримати значення поля
Різниця лише в властивості об'єкта, яка оновлюється.


Загальний обробник



Згадуючи на початку, що значення атрибута name полів і імена властивостей об'єкта стану збігаються, і це не випадково. Давайте оголосимо один обробник handleChange для всіх полів форми.



const handleChange = evt => {
  console.log(evt.target.value);
  console.log(evt.target.name);
}



Використовуючи об'єкт події, ми маємо доступ до:

evt.target.value - значення поля
evt.target.name - значення атрибута name
Використовуючи синтаксис обчислюваних властивостей об'єкта, ми можемо записати handleChange так, щоб значення оновлюваної властивості стану було значенням атрибута name.



const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };



Це дозволяє обробляти зміну всіх полів однією функцією, замінивши дві раніше оголошені.

const LoginForm = () => {
  const [values, setValues] = useState({
    login: "",
    password: "",
  });

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <form>
      <input
        type="text"
        name="login"
        value={values.login}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};



Відправка форми



Щоб отримати значення полів контрольованої форми під час відправлення, створюємо функцію, наприклад handleSubmit, в якій ми звертаємося до її стану.



const handleSumit = (evt) => {
  evt.preventDefault();

	// Значення полів
  console.log(values);
};



Функцію передаємо як значення атрибута onSubmit елемента form.



<form onSubmit={handleSumit}>



Щоб очистити форму після відправлення, необхідно скинути стан на початкове значення, що призведе до оновлення компонента і повторного рендерингу.



const handleSumit = (evt) => {
  evt.preventDefault();
  console.log(values);

	// Очищаємо форму
  setValues({
    login: "",
    password: "",
  });
};



Ось повний код прикладу форми для входу.



const LoginForm = () => {
  const [values, setValues] = useState({
    login: "",
    password: "",
  });

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSumit = (evt) => {
    evt.preventDefault();

    console.log(values);

    setValues({
      login: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSumit}>
      <input
        type="text"
        name="login"
        value={values.login}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}; -->

<!--                                          Заняття 2. Бібліотека Formik
"Розробляйте форми в React без сліз" - це гасло Formik, однієї з найпопулярніших бібліотек для роботи з формами в React та React Native.
Для внутрішньої логіки Formik використовує лише звичайний стан та властивості React. Залишаючись в межах основного фреймворку React та уникаючи магії, Formik робить налагодження та мислення про форми легкими.

Додаємо Formik до проекту як пакет NPM:
npm install formik-->
<!-- Контейнер форми
Формік - це набір готових компонентів, які спрощують створення форм. Побудова форми починається з компонента-контейнера Formik.
Йому потрібно передати два пропси:
1)initialValues - об'єкт початкових значень полів, наразі передамо порожній об'єкт.
2)onSubmit - функція, яка буде викликана при сабміті форми
Усередині компонента Formik вкладаємо елементи форми, але не вбудовані теги, такі як form чи input, а ті, що надає бібліотека.-->
<!-- Для того, щоб можна було відправити форму, використовуємо тег button, для кнопки відправки в бібліотеці немає спеціального компонента. -->
<!-- Поля форми
Для додавання полів форми використовується компонент Field, який за замовчуванням рендерить тег input. Кожному полю обов'язково потрібно вказати атрибут name, так само, як і при роботі з звичайним тегом input. -->
<!-- Стилізація
Компоненти з бібліотеки Formik стилізуються уже знайомим способом, так само, як і теги, за допомогою пропса className і CSS-модулів.
Значення пропса className передається тегу, який рендерить компонент, і відповідно стилізація застосовується до необхідного тегу.
! Компонент Formik не стилізується, оскільки не рендерить жодного тегу, а зберігає логіку роботи з формою.
 -->
<!-- Початкове значення полів
Форми, створені за допомогою бібліотеки Formik, є контрольованими формами, де значення кожного поля зберігається в стані. Проте нам не потрібно оголошувати та змінювати стан, це виконає компонент Formik за нас. Саме він зберігає в собі стан і логіку його зміни.

Пропсу initialValues необхідно передати об'єкт з початковими значеннями полів. Усередині Formik зберігає стан у вигляді об'єкта, де імена полів - це імена властивостей у стані, а значення полів - це значення властивостей.
Звісно, якщо форма велика, буде зручно винести об'єкт початкових значень полів в зовнішню змінну.
 -->
<!-- Відправка форми
При відправці форми викликається колбек-функція, яку ми передали пропсом onSubmit компоненту Formik. Зручною є ідея зробити її іменованою функцією handleSubmit і передати посилання на неї в onSubmit.

 Функція відправки форми має два параметри:
1)values - об'єкт значень полів форми в момент її відправки.
2)actions - об'єкт з допоміжними методами. Наприклад, метод resetForm використовується для очищення полів форми після відправки.

Функція відправки форми не отримує об'єкт події, що є зайвим. Formik в момент відправки форми:
-викликає метод preventDefault, щоб уникнути перезавантаження сторінки;
-збирає значення полів форми в один зручний об'єкт, де ім'я властивості - це ім'я поля, а значення поля - це значення властивості.

Отже, нам не потрібно турбуватися про оголошення стану, його зміну і збір значень полів форми. Вся рутина з формою зроблена за нас!
 -->
<!-- Елементи форми
В бібліотеці Formik немає компонентів для створення label та інших семантичних елементів форми, таких як fieldset та legend. Для цього використовуються звичайні теги. Не забуваємо використовувати хук useId для створення унікальних ідентифікаторів полів. -->
<!--
Типи полів
За замовчуванням компонент Field рендерить тег input. Щоб змінити тип поля, необхідно передати компоненту Field пропс as значенням якого є рядок - тип тега.

- textarea замість input.
<Field as="textarea" cols="20" rows="5" />

- Селект
Для додавання select так само використовується компонент Field, якому передається пропс as="select". Список опцій вказується тегами option між відкриваючим та закриваючим тегами Field.
<Field as="select">
	<option value="o1">Option 1</option>
	<option value="o2">Option 2</option>
	<option value="o3">Option 3</option>
</Field>-->

<!-- import { useId } from "react";
import { Formik, Form, Field } from "formik";

const initialValues = {
  username: "",
  email: "",
  message: "",
  level: "good",
};

const FeedbackForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const msgFieldId = useId();
  const levelFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <label htmlFor={nameFieldId}>Username</label>
        <Field type="text" name="username" id={nameFieldId} />

        <label htmlFor={emailFieldId}>Email</label>
        <Field type="email" name="email" id={emailFieldId} />

        <label htmlFor={msgFieldId}>Message</label>
        <Field as="textarea" name="message" id={msgFieldId} rows="5" />

        <label htmlFor={levelFieldId}>Service satisfaction level</label>
        <Field as="select" name="level" id={levelFieldId}>
          <option value="good">Good</option>
          <option value="neutral">Neutral</option>
          <option value="bad">Bad</option>
        </Field>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
 -->
<!-- Валідація
 В Formik валідація виконується автоматично, все, що потрібно зробити, це налаштувати її. Для цього необхідно встановити бібліотеку валідації Yup.
npm install yup

Після цього імпортуємо бібліотеку валідації в компонент форми.
import * as Yup from "yup";

Валідатор Yup використовує схеми валідації для перевірки значень. Об'являємо схему валідації об'єкта, оскільки значення форми зберігаються в стані Formik у вигляді об'єкта з властивостями.
const FeedbackSchema = Yup.object().shape({});

У цьому об'єкті описуємо валідацію для кожної властивості об'єкта initialValues.

Почнемо з імені користувача.
const FeedbackSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required")
});

У цьому коді для поля username ми валідуємо наступне:
Це рядок
Рядок повинен бути принаймні 2 символи
Рядок повинен бути максимум 50 символів
Властивість обов'язкова для заповнення

Функції Yup.string(), Yup.min(), Yup.max(), Yup.required() і інші - це валідатори, які дозволяють додати певний критерій валідації. Кожен валідатор може приймати від нуля до двох параметрів.

1)перший - це критерій валідації, наприклад, довжина рядка чи значення числа
2)другий - це рядок, який буде використаний як помилка у разі валідації.
Не у всіх валідаторів є критерії або повідомлення про помилку, щоб це дізнатися, необхідно дивитися в документацію Yup в розділі API.


Додаємо валідацію для інших полів форми. Розгляньте критерії валідації.

const FeedbackSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  message: Yup.string().min(3, "Too short").max(256, "Too long").required("Required"),
	level: Yup.string().oneOf(["good", "neutral", "bad"]).required("Required")
});
Зверніть увагу на валідатори властивості level. Значенням текстового поля може бути будь-який рядок, а в разі з селектом - лише заздалегідь визначене значення з набору опцій, тому використовуємо інший валідатор oneOf(), якому передається масив всіх можливих значень.

Схема валідації готова, залишилося пов'язати її з формою. У компонента Formik є третій пропс validationSchema, в який треба передати схему валідації Yup.
const FeedbackSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  message: Yup.string().min(3, "Too short").max(256, "Too long").required("Required"),
  level: Yup.string().oneOf(["good", "neutral", "bad"]).required("Required")
});

const initialValues = {
  username: "",
  email: "",
  message: "",
  level: "good"
};

const FeedbackForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const msgFieldId = useId();
  const levelFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form>
        <label htmlFor={nameFieldId}>Username</label>
        <Field type="text" name="username" id={nameFieldId} />

        <label htmlFor={emailFieldId}>Email</label>
        <Field type="email" name="email" id={emailFieldId} />

        <label htmlFor={msgFieldId}>Message</label>
        <Field as="textarea" name="message" id={msgFieldId} rows="5" />

        <label htmlFor={levelFieldId}>Service satisfaction level</label>
        <Field as="select" name="level" id={levelFieldId}>
          <option value="good">Good</option>
          <option value="neutral">Neutral</option>
          <option value="bad">Bad</option>
        </Field>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

Тепер, після додавання валідації, ми не зможемо відправити форму, якщо в одному з полів буде введено невалідне значення.
 -->

<!-- Помилки валідації
Для того щоб відобразити користувачу помилки валідації, використовується компонент ErrorMessage.



import { ErrorMessage } from "formik";



Додамо його до розмітки форми поруч із кожним полем, наприклад, створимо таку групу.



<div>
  <label htmlFor={nameFieldId}>Username</label>
  <Field type="text" name="username" id={nameFieldId} />
  <ErrorMessage name="username" component="span" />
</div>



Є два момента:

Значення атрибута name компонентів ErrorMessage та Field повинно співпадати. Це потрібно для того, щоб ErrorMessage виводиво повідомлення про помилку валідації для пов'язаного поля.
За замовчуванням ErrorMessage відображає текст без тега, це не зручно, оскільки текст неможливо стилізувати. Проп component вказує, в якому тезі рендерити текст помилки.


Компонент ErrorMessage можна стилізувати, як і будь-який інший з бібліотеки Formik. Наприклад, передаючи йому проп className із іменем класу з CSS-модуля.



 <ErrorMessage className={css.error} name="username" component="span" />



Додамо виведення помилок валідації для всіх полів форми фідбеку. На цьому все, форма готова, розмітка набрана, поля валідуються, користувачеві виводяться повідомлення про помилки валідації, при відправці форми маємо об'єкт значень всіх її полів.



import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  message: Yup.string().min(3, "Too short").max(256, "Too long").required("Required"),
  level: Yup.string().oneOf(["good", "neutral", "bad"]).required("Required"),
});

const initialValues = {
  username: "",
  email: "",
  message: "",
  level: "good",
};

const FeedbackForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const msgFieldId = useId();
  const levelFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form>
        <div>
          <label htmlFor={nameFieldId}>Username</label>
          <Field type="text" name="username" id={nameFieldId} />
          <ErrorMessage name="username" component="span" />
        </div>

        <div>
          <label htmlFor={emailFieldId}>Email</label>
          <Field type="email" name="email" id={emailFieldId} />
          <ErrorMessage name="email" component="span" />
        </div>

        <div>
          <label htmlFor={msgFieldId}>Message</label>
          <Field as="textarea" name="message" id={msgFieldId} rows="5" />
          <ErrorMessage name="message" component="span" />
        </div>

        <div>
          <label htmlFor={levelFieldId}>Service satisfaction level</label>
          <Field as="select" name="level" id={levelFieldId}>
            <option value="good">Good</option>
            <option value="neutral">Neutral</option>
            <option value="bad">Bad</option>
          </Field>
          <ErrorMessage name="level" component="span" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
 -->
