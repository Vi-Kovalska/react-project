  <!--                                                      MODUL 1 -->
  <!-- Компоненти
  Інтерфейс користувача складається з невеликих елементів, таких як кнопки, текст і зображення. React дозволяє вам об'єднувати їх у багаторазово використовувані компоненти - основні будівельні блоки React-застосунків, за допомогою яких інтерфейс розділяється на незалежні частини. Любий інтерфейс (дизайн) можна розбити на компоненти.

   -->
  <!-- React-застосунок можна уявити як дерево компонентів. На верхньому рівні стоїть кореневий компонент - App, у якому вкладена довільна кількість інших компонентів. Кожен компонент повинен повернути розмітку, тим самим вказуючи, який HTML ми хочемо відрендерити в DOM.

<!-- Оголошення компонента В коді компонент - це функція, яка отримує об'єкт
властивостей, який називається props, і повертає React-елементи (HTML розмітку).
-->
<!-- Компоненти React є звичайними функціями JavaScript, але їхні імена мають починатися з великої літери, інакше вони не працюватимуть! Назви компонентів з маленької літери зарезервовані для HTML-елементів. Якщо ви спробуєте назвати компонент product, а не Product, під час рендеру React проігнорує його та відрендерить тег <product></product>. -->

<!-- як створити компонент:
Крок 1. Експортуйте компонент
Префікс export default— це стандартний синтаксис JavaScript (не специфічний для React). Це дозволяє позначити головну функцію у файлі, щоб потім можна було імпортувати її з інших файлів.  -->
<!-- Крок 2: Визначте функцію
 function Profile() { }визначаєте функцію JavaScript із назвою Profile. -->
<!-- Крок 3: Додайте розмітку
Компонент повертає <img />тег з атрибутами srcі alt. <img />написаний як HTML, але насправді під капотом це JavaScript! Цей синтаксис називається JSX і дозволяє вставляти розмітку в JavaScript.

Інструкції повернення можна записати в один рядок, як у цьому компоненті:

return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
Але якщо ваша розмітка не в тому самому рядку, що й returnключове слово, ви повинні взяти її в дужки:

return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
підводний камінь
Без дужок будь-який код у рядках після return ігноруватиметься ! -->

<!-- Using components -->
<!-- function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile /> -->
<!-- Що бачить браузер
Зверніть увагу на різницю в корпусі:

<section>є малим регістром, тому React знає, що ми посилаємося на тег HTML.
<Profile />починається з великої літери P, тому React знає, що ми хочемо використовувати наш компонент під назвою Profile. -->

<!-- Компоненти вкладення та організації -->
<!-- Оскільки Profileкомпоненти відображаються всередині Gallery— навіть кілька разів! — ми можемо сказати, що Galleryце батьківський компонент, відтворюючи кожен Profileяк «дочірній». Це частина магії React: ви можете визначити компонент один раз, а потім використовувати його в багатьох місцях і скільки завгодно разів.

підводний камінь
Компоненти можуть відтворювати інші компоненти, але ви ніколи не повинні вкладати їх визначення:

export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
} -->
<!-- Замість цього визначте кожен компонент на верхньому рівні:

export default function Gallery() {
  // ...
}

// ✅ Declare components at the top level
function Profile() {
  // ...
}
Коли дочірньому компоненту потрібні деякі дані від батьківського компонента, передайте його через властивості замість визначень вкладення. -->

<!-- JSX -->
<!-- JavaScript відповідає за HTML! Ось чому в React логіка рендерингу та розмітка живуть разом в одному місці — компонентах. -->
<!-- JSX і React — це дві різні речі. Вони часто використовуються разом, але ви можете  використовувати їх незалежно один від одного. JSX — це розширення синтаксису, а React — бібліотека JavaScript.
Кожен компонент React — це функція JavaScript, яка може містити певну розмітку, яку React відображає у браузері.  -->
<!-- JSX дуже схожий на HTML, але він дещо суворіший і може відображати динамічну інформацію.  -->

<!-- Перетворення HTML в JSX
Припустімо, що у вас є якийсь (ідеальний) HTML:

<h1>Hedy Lamarr's Todos</h1>
<img
  src="https://i.imgur.com/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
І ви хочете помістити це у свій компонент:

export default function TodoList() {
  return (
    // ???
  )
}
Якщо скопіювати та вставити як є, це не працюватиме!-->
<!-- Правила JSX
1. Повернути єдиний кореневий елемент
Щоб повернути кілька елементів із компонента, оберніть їх одним батьківським тегом.

Наприклад, ви можете використовувати <div>:

<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
Якщо ви не хочете додавати щось додаткове <div>до розмітки, ви можете написати <>замість </>цього:

<>
  <h1>Hedy Lamarr's Todos</h1>
  <img
    src="https://i.imgur.com/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
Цей порожній тег називається фрагментом. Фрагменти дозволяють групувати речі, не залишаючи слідів у дереві HTML браузера. -->
<!-- Фрагмент (fragment) - порожній тег, що дозволяє групувати речі, не залишаючи слідів у дереві HTML браузера.-->
<!-- JavaScript. Ви не можете повернути два об’єкти з функції, не обернувши їх у масив. Це пояснює, чому ви також не можете повернути два теги JSX, не обернувши їх в інший тег або фрагмент. -->

<!-- 2. Закрийте всі теги
JSX вимагає, щоб теги були явно закриті: самозакриваючі теги, як-от, <img>мають стати <img />, а теги-обгортки, як-от, <li>orangesмають бути записані як <li>oranges</li>. -->

<!-- 3. CamelCase
JSX перетворюється на JavaScript, а атрибути, написані в JSX, стають ключами об’єктів JavaScript. У ваших власних компонентах ви часто захочете прочитати ці атрибути в змінні. Але JavaScript має обмеження на імена змінних. Наприклад, їх імена не можуть містити тире або бути зарезервованими словами на зразок class.

Ось чому в React багато атрибутів HTML і SVG написані в CamelCase. Наприклад, замість stroke-widthви використовуєте strokeWidth. Оскільки classце зарезервоване слово, у React ви пишете classNameзамість цього, назване відповідною властивістю DOM :

<img
  src="https://i.imgur.com/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  className="photo"
/> -->
<!-- підводний камінь
З історичних причин aria-*атрибути data-*записуються як у HTML з тире. -->

<!-- 4.У межах JSX можна використовувати будь-який валідний вираз, заключаючи його у фігурні дужки. Все інше буде розглядатися як текст. Винесемо значення ціни в змінну price і використаємо її для того, щоб підставити значення змінної в JSX.

// src/components/Product.jsx

export default function Product() {
	const price = 999;

  return (
    <>
      <h2>Tacos</h2>
	  <img src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640" alt="Tacos With Lime" width="640" />
      <p>Price: {price} credits</p>
    </>
  );
};



Значення атрибутів вказуються в подвійних лапках, якщо це звичайний рядок, та у фігурних дужках, якщо значення відрізняється від рядка або знаходиться в змінній.
// src/components/Product.jsx

export default function Product() {
	const price = 999;
	const imgUrl = "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640";

  return (
    <>
      <h2>Tacos</h2>
	  <img src={imgUrl} alt="Tacos With Lime" width="640" />
      <p>Price: {price} credits</p>
    </>
  );
}; -->

<!--                            Import and export  -->
<!-- Для кожного компонента створюється окремий файл, тому необхідно експортувати компонент із його файлу. -->
<!-- // src/Product.jsx

export default function Product() {
  return (
    <div>
      <h2>Tacos</h2>
	  <p>Price: 999 credits</p>
    </div>
  );
};



Зверніть увагу, що ім'я файлу компонента Product.jsx збігається з назвою самого компонента Product. Це неофіційний стандарт, якого ми будемо дотримуватися. -->
<!-- Так як компонент це головна сутність модуля, то давайте домовимось використовувати для нього експорт за замовчуванням (export default).


На практиці всі компоненти, а в майбутньому і файли стилів для них, будемо зберігати у папці components, яку створимо всередині папки src. -->

<!--                                               Властивості компонента (props) -->
<!-- Props – це інформація, яку ви передаєте тегу JSX. -->
<!-- Кожен батьківський компонент може передавати деяку інформацію своїм дочірнім компонентам, надаючи їм атрибути. Реквізити можуть нагадувати вам атрибути HTML, але ви можете передати через них будь-яке значення JavaScript, включаючи об’єкти, масиви та функції. -->

<!-- Без пропсів компонент завжди повертає однакову розмітку, як, наприклад, наш компонент Product.
Будь-який компонент, в тому числі Product, оголошує один параметр - props, це завжди буде об'єкт, що містить усі передані пропси.



// src/components/App.jsx

import Product from "./Product";

export default function App() {
  return (
    <div>
      <h1>Best selling</h1>

      <Product
        name="Tacos With Lime"
        imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
        price={10.99}
      />
      <Product
        name="Fries and Burger"
        imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?dpr=2&h=480&w=640"
        price={14.29}
      />
    </div>
  );
}



В самому компоненті Product використаємо отримані пропси в розмітці.



// src/components/Product.jsx

export default function Product(props) {
  return (
    <div>
      <h2>{props.name}</h2>
	  <img src={props.imgUrl} alt={props.name} width="480" />
	  <p>Price: {props.price} credits</p>
    </div>
  );
}; -->

<!-- Пропси використовуються для передачі динамічних значень для компонента, наприклад, для використання в JSX-розмітці, використовуючи синтаксис {}. -->

<!-- Оскільки props – це об'єкт, ми можемо деструктуризувати його у підписі функції. Це робить код чистішим і читабельнішим.



// src/components/Product.jsx

export default function Product({ name, imgUrl, price }) {
  return (
    <div>
      <h2>{name}</h2>
	  <img src={imgUrl} alt={name} width="480" />
	  <p>Price: {price} credits</p>
    </div>
  );
}; -->

<!--                                Значення пропсів за замовчуванням
Що, якщо компонент очікує яке-небудь значення, а його не передали? Під час звернення до властивості об'єкта props отримаємо undefined. Для того щоб вказати значення властивостей за замовчуванням, використовується синтаксис значень за замовчуванням під час деструктуризації пропсів. -->

<!-- Пересилання реквізитів із синтаксисом поширення JSX
Іноді передача реквізиту дуже повторюється:

function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}

еякі компоненти пересилають усі свої атрибути своїм нащадкам, як це Profileвідбувається з Avatar. Оскільки вони не використовують жодних своїх пропів напряму, може мати сенс використовувати більш стислий синтаксис «розповсюдження»:

function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
Це пересилає всі Profileатрибути до Avatarбез перерахування кожного з їхніх імен. -->

<!--                                                    Передача JSX як дітей
 існує **props.children** і що значенням цього пропса буде те, що знаходиться між відкриваючим і закриваючим тегом компонента.

Коли ви вкладаєте вміст у тег JSX, батьківський компонент отримає цей вміст у проп під назвою children. Наприклад, Cardнаведений нижче компонент отримає childrenвластивість, налаштовану на <Avatar />і візуалізує його в обгортці div: -->
<!-- function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
  <p>Hi</p>       or you can pass any other component in component Card або ти можеш передати б-я компонент у Card
    </Card>
  );
} -->

<!-- Props статичні властивості але їх можна змінити попросивши батьківський елемент передати інші властивості

Цей приклад показує, що компонент може отримувати різні атрибути з часом. Реквізит не завжди статичний! Тут timeопора змінюється щосекунди, і вона colorзмінюється, коли ви вибираєте інший колір. Реквізити відображають дані компонента в будь-який момент часу, а не лише на початку.

Проте реквізити є незмінними — термін з інформатики означає «незмінний». Коли компоненту потрібно змінити свої властивості (наприклад, у відповідь на взаємодію користувача або нові дані), йому доведеться «попросити» батьківський компонент передати йому інші властивості — новий об’єкт! Тоді його старі атрибути будуть відкинуті вбік, і зрештою механізм JavaScript відновить зайняту ними пам’ять.

Не намагайтеся «змінити реквізит». Коли вам потрібно відповісти на введення користувача (наприклад, змінити вибраний колір), вам потрібно буде «встановити стан», про який ви можете дізнатися в « Стан: пам’ять компонента». -->

<!-- Умовний рендеринг


Умовний рендеринг в React - це механізм, який дозволяє відображати різний контент або компоненти на основі умови. Це часто використовується для динамічної зміни відображення компонентів в залежності від різних обставин, наприклад, значень пропсів.



Оператор &&



Логічний оператор && використовується для рендера розмітки лише у випадку, якщо умова виконується, тобто приводиться до true.

умова && розмітка



Зліва ставиться умова рендеру, справа JSX розмітка, що буде відрендерена якщо умова зліва наближається до true. В іншому випадку результатом виразу буде false - значення, яке не рендериться.



Якщо за умови нічого не повинно бути відрендерено, можна повернути null, undefined або false. Ці значення не будуть відображені.


У JSX вираз обгортається в {}, щоб відобразити його результат.



<div>
	{умова && розмітка}
</div>



Будемо рендерити повідомлення про непрочитані листи лише в разі, якщо масив повідомлень не є порожнім, тобто його довжина більше нуля.



const Mailbox = ({ username, messages }) => {
  return (
    <>
      <p>Hello {username}</p>
      {messages.length > 0 && (
        <p>You have {messages.length} unread messages</p>
      )}
    </>
  );
};



Якщо умова приводиться до true, то результатом виразу буде правий операнд, тобто JSX-розмітка.
В іншому випадку результатом буде false - значення, яке не рендериться.


Тернарний оператор



Використовується, якщо в результаті перевірки умови потрібно відобразити різну розмітку.



умова ? вміст_якщо_умова_true : вміст_якщо_умова_false



У JSX вираз обгортається в {}, щоб відобразити його результат.



<div>
	{умова ? вміст_якщо_умова_true : вміст_якщо_умова_false}
</div>



Якщо умова приводиться до true, відображається розмітка після ?, інакше – розмітка після :.


Будемо рендерити різні повідомлення про непрочитані листи, в залежності від довжини масиву messages. Для цього всередині тега абзацу додаємо JSX-вираз і повертаємо рядок.



const Mailbox = ({ name, unreadMessages }) => {
  return (
    <div>
      <p>Hello {name}</p>
      <p>
        {unreadMessages.length > 0
          ? `You have ${unreadMessages.length} unread messages`
          : "No unread messages"}
      </p>
    </div>
  );
};



У випадку, коли за умови потрібно відобразити різну розмітку, ми робимо те саме, але результатом виразу є JSX.

const Mailbox = ({ username, messages }) => {
  return (
    <div>
      <p>Hello {username}</p>
      {messages.length > 0 ? (
        <div>
          <p>You have {messages.length} unread messages</p>
          <MessageList messages={messages} />
        </div>
      ) : (
        <p>No unread messages</p>
      )}
    </div>
  );
}; -->

<!--                                                              Колекції
Для того щоб відрендерити колекцію елементів, використовується масив даних і метод map(). Callback-функція map() для кожного елемента колекції повертає розмітку.

[1, 2, 3].map(item => {
	return <p>{item}</p>;
})

Отже, ми отримуємо масив React-елементів, який можна рендерити. Для цього в JSX ми обгортаємо цей вираз у фігурні дужки {}.
<div>
	{[1, 2, 3].map(item => {
		return <div>{item}</div>;
	})}
</div> -->

<!--                      Ключі елементів
React використовує ключі, щоб визначити, які з елементів в колекції необхідно оновити, уникнувши перестворення всіх елементів колекції при найменших змінах.
Ключі повідомляють React, якому елементу масиву відповідає кожен компонент, щоб він міг зіставити їх пізніше. Це стає важливим, якщо ваші елементи масиву можуть переміщатися (наприклад, через сортування), бути вставленими або видаленими.

Ключі повинні бути:
- Унікальними — ключ елемента повинен бути унікальним лише всередині однієї колекції. Глобально унікальні ключі не мають сенсу.
- Стабільними — ключ елемента не повинен змінюватися з часом, зі зміною порядку елементів або після оновлення сторінки.-->
<!-- Найкращий спосіб задати ключ — використовувати статичний рядок, який однозначно ідентифікує елемент списку серед інших. Найчастіше використовуються ідентифікатори об'єктів, створених базою даних, – постійні, незмінні значення. Але також підходить будь-яке унікальне значення якої-небудь властивості об'єкта.
!Якщо об'єкти масиву не мають унікальних значень властивостей і колекція не редагується (наприклад, користувач не може видалити або змінити порядок елементів), можна використовувати індекси масиву.-->

<!-- Documentation from React
Часто потрібно відобразити кілька подібних компонентів із колекції даних. Ви можете використовувати методи масиву JavaScript для роботи з масивом даних.
Використаємо filter()та map()з React для фільтрації та перетворення вашого масиву даних у масив компонентів. -->
<!-- utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
} -->
<!-- data.js
export const people = [{
  id: 0, // Used in JSX as a key
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1, // Used in JSX as a key
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2, // Used in JSX as a key
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3, // Used in JSX as a key
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4, // Used in JSX as a key
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
 -->
<!-- App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
 const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const listItems = chemists.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
 -->
<!-- Відображення кількох вузлів DOM для кожного елемента списку -->
<!-- Що ви робите, коли кожному елементу потрібно відобразити не один, а кілька вузлів DOM?

Короткий синтаксис <>...</>Fragment не дозволить вам передати ключ, тому вам потрібно або згрупувати їх в один <div>, або використати трохи довший і чіткіший <Fragment>синтаксис:

import { Fragment } from 'react';
// ...
const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
Фрагменти зникають із DOM, тому буде створено плоский список <h1>, <p>, <h1>, <p>тощо. -->
<!-- підводний камінь -->
<!--  Індекс як ключ часто призводить до непомітних і заплутаних помилок.
Hе створюйте ключі на льоту, наприклад, за допомогою key={Math.random()}. Це призведе до того, що ключі ніколи не збігатимуться між рендерами, що призведе до того, що всі ваші компоненти та DOM щоразу створюватимуться заново. -->
<!-- Зауважте, що ваші компоненти не отримають keyяк проп. Він використовується лише як підказка самим React. Якщо вашому компоненту потрібен ідентифікатор, ви повинні передати його як окремий проп: <Profile key={id} userId={id} />. -->

<!-- EXERSIZE 1 -->
<!-- Розбиття списку усіх людей на дві частини: «Хіміки» та «Усі інші». Ви можете використати filter()двічі, створивши два окремих масиви, а потім mapповерх обох-->
<!-- import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <h2>Chemists</h2>
      <ul>
        {chemists.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
      <h2>Everyone Else</h2>
      <ul>
        {everyoneElse.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </article>
  );
} -->
<!-- Завдання 2 із 4 :Вкладені списки в одному компоненті
Складіть список рецептів із цього масиву! Для кожного рецепту в масиві відобразіть його назву як <h2>, а інгредієнти — у <ul>. -->
<!-- data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
 -->
<!--
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>

    </div>
  );
} -->
<!-- Завдання 3 із 4 :Вилучення компонента елемента списку
Цей RecipeListкомпонент містить два вкладених mapвиклики. Щоб спростити це, витягніть Recipe із нього компонент, який прийматиме id, nameта ingredients props. Де ви розміщуєте зовнішній вигляд keyі чому? -->
<!--
import { recipes } from './data.js';

function Recipe({ id, name, ingredients }) { return ( <div> <h2>{name}</h2> <ul>
{ingredients.map(ingredient => <li key={ingredient}> {ingredient} </li> )} </ul>
</div> ); }

export default function RecipeList() { return ( <div> <h1>Recipes</h1>
{recipes.map(recipe => <Recipe {...recipe} key={recipe.id} /> )} </div> ); } -->
<!-- Зверніть увагу, що key вказано на <Recipe> самому собі, а не на корені, <div>повернутому з Recipe. Це тому, що це keyнеобхідно безпосередньо в контексті навколишнього масиву. Раніше у вас був масив <div>s, тому для кожного з них потрібен був key, але тепер у вас є масив <Recipe>s. Іншими словами, коли ви витягуєте компонент, не забудьте залишити поза keyмежами JSX, який ви копіюєте та вставляєте. -->

<!-- Завдання 4 із 4 :Список із роздільником -->
<!-- Ваше завдання — вставити <hr />роздільник між кожним абзацом. Ваша кінцева структура має виглядати так:
<article>
  <p>I write, erase, rewrite</p>
  <hr />
  <p>Erase again, and then</p>
  <hr />
  <p>A poppy blooms.</p>
</article>
Хайку містить лише три рядки, але ваше рішення має працювати з будь-якою кількістю рядків. Зауважте, що <hr />елементи з’являються лише між елементами <p>, а не на початку або в кінці! -->
<!-- Ви можете написати ручний цикл, вставляючи <hr />та <p>...</p>у вихідний масив по ходу: -->
<!-- const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  let output = [];

  // Fill the output array
  poem.lines.forEach((line, i) => {
    output.push(
      <hr key={i + '-separator'} />
    );
    output.push(
      <p key={i + '-text'}>
        {line}
      </p>
    );
  });
  // Remove the first <hr />
  output.shift();

  return (
    <article>
      {output}
    </article>
  );
}

 -->
 <!-- (Це рідкісний випадок, коли індекс як ключ прийнятний, оскільки рядки вірша ніколи не змінюватимуться.) -->

<!--                                               2 variant of decision   (2 варіант рішення) -->
<!-- Крім того, ви можете відобразити колекцію фрагментів, які містять <hr />і <p>...</p>. Однак <>...</>скорочений синтаксис не підтримує передачу ключів, тому вам доведеться написати <Fragment>явно: -->
<!-- import { Fragment } from 'react';

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, i) =>
        <Fragment key={i}>
          {i > 0 && <hr />}
          <p>{line}</p>
        </Fragment>
      )}
    </article>
  );
}
 -->

<!--                                                           Рендер додатка в DOM
Для того, щоб відрендерити всі компоненти додатка в DOM, в пакеті react-dom є методи createRoot(container) та render(element), які працюють разом. Це виконується в файлі main.jsx. -->
<!-- // src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



Метод createRoot приймає посилання на існуючий DOM-елемент, у нашому випадку це div#root з index.html, і створює корінь, в який буде рендеритися додаток.
Метод render приймає посилання на компонент, який потрібно відрендерити. Ми завжди рендеримо App - кореневий компонент додатка.

Достатньо використовувати лише один виклик render для того, щоб відрендерити найвищий компонент в ієрархії (App), що призведе до рендеру всіх інших компонентів додатка.

Суворий режим
що таке <React.StrictMode>, в який вкладений компонент App? Це вбудований компонент, який сповіщає :
- про використання застарілих методів і функцій в React, які можуть бути вилучені в майбутніх версіях.
- про виявлення побічних ефектів під час рендерингу компонентів, що може призвести до непередбачуваної поведінки.
- про потенційні проблеми в render-методах, такі як виклик нечистих функцій під час рендерингу.
- про виявлення помилок у функціях обробки подій та їх інших частинах життєвого циклу компонентів.
 -->

<!--                                              SPA (Single Page Application) - односторінковий застосунок-->
<!-- Сучасний підхід – сайт, на якому користувач ніколи не переходить на інші HTML-сторінки. Інтерфейс, замість запиту HTML-документів з сервера, перемальовується в браузері, на одній і тій самій сторінці, без перезавантаження. Такий додаток називається SPA -->
<!-- MPA (Multi Page Aplication) так ми писали раныше для кожної сторінки створ HTML-сторінку-->
<!-- У сучасній веб-розробці змінилися фундаментальні речі - те, як ми проектуємо та створюємо веб-застосунки.
Візьмемо довільний веб-сайт, наприклад, для роботи з колекцією рецептів, розкладом тренувань тощо. Завжди є набір сторінок: домашня, профіль, сторінка колекції та сторінка одного елемента колекції. -->

<!--                                                       Типізація пропсів -->
<!-- Опис типів пропсів може заощадити час на дебаг і допомагати при неуважності У майбутньому буде необхідно виділити час і ознайомитися з TypeScript, а для початку вистачить невеликої бібліотеки.

!Опис типів пропсів не є обов'язковим. Крім того, що типізація пропсів може заощадити час при виявленні помилок, весь процес типізації займає час розробника, так як це додатковий код. Використовуйте цю можливість лише за бажанням. -->
<!-- Пакет prop-types надає низку валідаторів для перевірки коректності отриманих типів даних під час виконання коду, повідомляючи про невідповідності в консолі.


npm install --save-dev prop-types


Використаємо prop-types і опишемо пропси компонента Product. Все, що необхідно зробити, це описати типи пропсів, які компонент отримує, в спеціальній властивості propTypes.

// src/components/Product.jsx

import PropTypes from 'prop-types';

const Product = ({
  name,
  imgUrl = "https://dummyimage.com/640x480/2a2a2a/ffffff&text=Product+image+placeholder",
  price,
}) => (
  <div>
		<img src={imgUrl} alt={name} width="480" />
		<h2>{name}</h2>
    <p>Price: {price} credits</p>
  </div>
);

// Опис типів пропсів компонента
Product.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  price: PropTypes.number.isRequired,
};

export default Product;


Перевірка пропсів за допомогою prop-types відбувається тільки під час розробки. -->

<!--                                                                 СТИЛІ
                                                           Вбудовані стилі
Існує кілька способів стилізації компонентів, найпростіший, але в той же час найбільш обмежений – це вбудовані стилі. Для цього використовується атрибут style, який у React приймає не рядок, а об'єкт стилів.
// src/components/App.jsx

export const App = () => {
  return (
    <p
      style={{
        margin: 8,
        padding: "12px 16px",
        borderRadius: 4,
        backgroundColor: "gray",
        color: "white",
      }}
    >
      Please update your email!
    </p>
  );
};

 обов'язкових правил вбудованих стилів:
- Імена властивостей, що складаються з двох і більше слів, наприклад background-color, обов'язково повинні бути записані в camelCase нотації (backgroundColor), як при зверненні до властивостей об'єкта style у DOM-елемента.
- До числових значень більшості властивостей буде автоматично додано суфікс px. Якщо необхідно використовувати одиниці відмінні від px, або
значення складається з кількох частин, воно вказується як рядок.

Винесемо об'єкт стилів у змінну, щоб підвищити читабельність JSX розмітки.
// src/components/App.jsx
const alertStyles = {
  margin: 8,
  padding: "12px 16px",
  borderRadius: 4,
  backgroundColor: "gray",
  color: "white",
};

export const App = () => {
  return (
    <>
      <p style={alertStyles}>Please update your email!</p>
      <p style={alertStyles}>There was an error during transaction!</p>
      <p style={alertStyles}>Payment received, thank you for your purchase!</p>
    </>
  );
};


Створимо компонент Alert який буде рендерити абзац тексту та приховає у собі майбутню логіку вибору кольору фону.
//src/components/Alert.jsx

const alertStyles = {
  margin: 8,
  padding: "12px 16px",
  borderRadius: 4,
  backgroundColor: "gray",
  color: "white",
};

export const Alert = ({ children }) => {
  return <p style={alertStyles}>{children}</p>;
};

<!--                                                               Динамічні стилі
Зробимо так, щоб залежно від типу оповіщення, у компоненті Alert змінювався колір фону абзацу. Для цього додамо йому обов'язковий пропс variant з кількома можливими значеннями.

// src/components/App.jsx

import { Alert } from "./Alert";

const App = () => {
  return (
    <>
      <Alert variant="info">
        Would you like to browse our recommended products?
      </Alert>
      <Alert variant="error">
        There was an error during your last transaction
      </Alert>
      <Alert variant="success">
        Payment received, thank you for your purchase
      </Alert>
      <Alert variant="warning">
        Please update your profile contact information
      </Alert>
    </>
  );
};


Логіку вибору кольору винесемо у функцію getBgColor(variant), яка буде повертати рядок із назвою кольору залежно від значення параметра variant.
// src/components/Alert.jsx

const alertStyles = {
  margin: 8,
  padding: "12px 16px",
  borderRadius: 4,
  color: "white",
};

const getBgColor = variant => {
  switch (variant) {
    case "info":
      return "blue";
    case "success":
      return "green";
    case "error":
      return "red";
    case "warning":
      return "orange";
    default:
      throw new Error(`Unsupported variant prop value - ${variant}`);
  }
};

export const Alert = ({ variant, children }) => {
  return (
    <p
      style={{
        ...alertStyles,
        backgroundColor: getBgColor(variant),
      }}
    >
      {children}
    </p>
  );
};

На прикладу відбувається створення фінального значення атрибуту style - базові стилі з alertStyles та динамічне значення backgroundColor залежно від пропсу variant. Такий підхід застосовується у разі коли значення однієї і більше властивостей залежить від пропсів. Наприклад, якщо посилання на зображення для background-image передається як пропс. -->

<!--                                                          Ванільний CSS
Оформлення компонента можна винести до таблиці стилів. У цьому випадку стилі кожного компонента оголошуються в окремому CSS-файлі з розширенням .css. Ім'я файлу складається з імені компонента та розширення. Наприклад, для компонента Alert, файл стилів буде називатися Alert.css.
/* src/components/Alert.css */
.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: gray;
  color: white;
}

Всередині файлу стилів можна написати будь-який валідний CSS код. Хорошою практикою буде писати CSS тільки для HTML-розмітки компонента до якого належить цей файл стилів.

Стилі компонента імпортуються у файл оголошення компонента, після чого CSS-класи описані у таблиці стилів доступні для використання. У React HTML-атрибуту class відповідає JSX-атрибут className, куди можна передати рядок з перерахуванням усіх класів елемента.
// src/components/Alert.jsx
import "./Alert.css";

const Alert = ({ children }) => {
  return <p className="alert">{children}</p>;
};


На стадії збирання проекту Vite мінімізує CSS та автоматично додає вендорні префікси використовуючи Autoprefixer. Сучасний синтаксис та можливості CSS покриваються поліфілами для можливості підтримки старих браузерів. Тому розробнику не потрібно турбуватися про це. -->

<!--                                                              Композиція класів
Додамо CSS класи для кожного типу оповіщення, щоб контролювати колір фону абзацу в залежності від значення пропсу variant. Для зручності назвемо класи аналогічно варіантам значення пропсу.
/* src/components/Alert.css */

.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  color: white;
}

.alert.info {
  background-color: blue;
}

.alert.success {
  background-color: green;
}

.alert.error {
  background-color: red;
}

.alert.warning {
  background-color: orange;
}



Процес обчислення фінального значення атрибуту className залежить від розробника та поточного завдання. Наприклад, використовуємо масив рядків та метод join щоб отримати рядок класів.
// src/components/Alert.jsx

import "./Alert.css";

const Alert = ({ variant, children }) => {
  const classNames = ["alert", variant];

  return <p className={classNames.join(" ")}>{children}</p>;
};


Додамо компоненту Alert два необов'язкові пропси outlined та elevated. Їх значеннями можуть бути тільки true, false або undefined. Якщо значення цих пропсів true, будемо додавати елементу <p> класи is-outlined та is-elevated.
/* src/components/Alert.css */

/* Весь попередній CSS код */

.alert.is-outlined {
  outline: 1px solid black;
}

.alert.is-elevated {
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,
    rgb(0 0 0 / 12%) 0px 1px 8px 0px;
}


Клас alert і якийсь із варіантів буде завжди, а класи для пропсів elevated та outlined додаємо тільки за потребою використовуючи блок if.
// src/components/Alert.jsx

import "./Alert.css";

const Alert = ({ variant, outlined, elevated, children }) => {
  const classNames = ["alert", variant];

  if (outlined) {
		classNames.push("is-outlined");
	}

  if (elevated) {
		classNames.push("is-elevated");
	}

  return <p className={classNames.join(" ")}>{children}</p>;
}; -->
<!-- Для обчислення фінального значення атрибуту className можна було використати блок if...else, інструкцію switch, тернарний оператор або будь-який інший синтаксис JavaScript, який дасть нам той же результат. Головне, щоб рядок з класами був складений правильно і не мав зайвих чи невалідних значень. -->

<!--                                                              Бібліотека clsx
Для вирішення більшості завдань, пов'язаних з безліччю класів, що задаються згідно з певними умовами, використовують бібліотеку clsx. Звичайно, JavaScript надає багатий синтаксис, але здебільшого пишуться непродуктивні рішення або код, що погано читається. Бібліотека стандартизує цей процес і робить його більш зручним за рахунок продуманого синтаксису.

npm install clsx

Функції clsx можна передати список виразів як набір аргументів. Вирази що приводяться до true, результат яких це рядок або число, буде додано у фінальний рядок класів.
import clsx from "clsx";

const className = clsx(
  "first",
  10,
  undefined && "second",
  true && "third",
  false ? "fourth" : "fifth"
);
console.log(className); // "first 10 third fifth"

Ось як виглядатиме код компонента Alert використовуючи бібліотеку clsx. Навіть у такому, відносно простому випадку, код виходить простіше і читабельніше.
// src/components/Alert.jsx
import clsx from "clsx";
import "./Alert.css";

const Alert = ({ variant, outlined, elevated, children }) => {
  return (
    <p
      className={clsx(
        "alert",
        variant,
        outlined && "is-outlined",
        elevated && "is-elevated"
      )}
    >
      {children}
    </p>
  );
};

Можна комбінувати варіативну та об'єктну форму функції clsx. Спочатку передаються класи, які будуть завжди, після чого в об'єкті налаштувань перераховуємо динамічні значення класів залежно від якихось обчислень. Нам здається, що така форма запису є більш декларативною та зрозумілою, тому рекомендуємо використовувати саме її.

// src/components/Alert.jsx
import clsx from "clsx";
import "./Alert.css";

const Alert = ({ variant, outlined, elevated, children }) => {
  return (
    <p
      className={clsx("alert", variant, {
        "is-outlined": outlined,
        "is-elevated": elevated,
      })}
    >
      {children}
    </p>
  );
}; -->

<!--                                                            CSS-модулі
CSS-модулі не є офіційною специфікацією і не реалізовані в браузерах. Це процес, що запускається під час збірки проєкту (наприклад, за допомогою Vite), який замінює імена класів на унікальні. Це дозволяє використовувати однакові імена класів у різних CSS-файлах без конфліктів. Цей підхід вирішує проблему глобальної області видимості в CSS.

Vite за замовчуванням підтримує CSS-модулі, все, що необхідно зробити це створювати файли стилів з розширенням .module.css, наприклад Alert.module.css. Всередині модуля CSS можна використовувати будь-який валідний CSS.

/* src/components/Alert.module.css */
.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: gray;
  color: white;
}


Синтаксис імпорту CSS-модуля нагадує імпорт файлу JavaScript модуля. У CSS-модулі є експорт за замовчуванням - об'єкт відповідності оригінального та згенерованих імен класів.
// src/components/Alert.jsx

// Синтаксис імпорту CSS-модуля
import css from "./Alert.module.css";

// Отримуємо об'єкт відповідності імен класів
console.log(css); // { alert: "Alert_alert_ax7yz" }

const Alert = ({ children }) => {
  // Звертаємось до властивості об'єкта на ім'я класу з файлу CSS-модуля
  return <p className={css.alert}>{children}</p>;
}; -->
<!-- Селектори тегів за замовчуванням будуть у глобальній області видимості, CSS-модулі генерують лише унікальні імена селекторів класу.

                                                       Бібліотека clsx
Додамо CSS класи для вже знайомих нам пропсів outlined та elevated. Імена класи, що складаються з декількох слів записують у CamelCase нотації. В протилежному випадку, оскільки вони стають властивостями об'єкта, звертатися до них доведеться через квадратні дужки, наприклад css["is-outlined"], що менш зручно.
/* src/components/Alert.module.css */
.alert {
  margin: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: gray;
  color: white;
}
.info {
  composes: alert;
  background-color: blue;
}
.success {
  composes: alert;
  background-color: green;
}
.error {
  composes: alert;
  background-color: red;
}
.warning {
  composes: alert;
  background-color: orange;
}
.alert.isOutlined {
  outline: 1px solid black;
}
.alert.isElevated {
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px,
    rgb(0 0 0 / 12%) 0px 1px 8px 0px;
}


Тепер ми знову використовуємо бібліотеку clsx для складання фінального значення властивості className.
// src/components/Alert.jsx
import clsx from "clsx";
import css from "./Alert.module.css";

const Alert = ({ variant, outlined, elevated, children }) => {
  return (
    <p
       className={clsx(
        css[variant],
        outlined && css.isOutlined,
        elevated && css.isElevated
      )}
    >
      {children}
    </p>
  );
};
До властивостей об'єкта зазвичай звертаються як css.alert, але можна використовувати квадратні дужки, наприклад css["alert"]. Це корисно у випадку коли ім'я властивості зберігається у змінній, як у нас у пропсі variant. -->

<!--                                                       Нормалізація стилів
Ми використаєм сучасну бібліотеку modern-normalize для додавання стилів нормалізації до проекту. Спочатку додамо її як залежність проекту.

npm install modern-normalize

Після цього в файлі main.jsx ми імпортуємо стилі нормалізації. Це додасть стилі з файлу нормалізації до проекту.
import React from "react";
import ReactDOM from "react-dom/client";
// Імпорт стилів нормалізації
import "modern-normalize";
import App from "./components/App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

Крім стандартизації зовнішнього вигляду елементів, може бути корисно скинути або додати деякі глобальні стилі для елементів. Наприклад, відступи для списків та заголовків, стилі для зображень, стилі для елемента <body>, тощо. Це можна логічно зробити в файлі index.css. Тут ви можете додати будь-які необхідні вам глобальні стилі для тегів.
/* src/index.css */
body {
  font-family: sans-serif;
  line-height: 1.5;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}
ul,
ol {
  margin: 0;
  padding: 0;
}
img {
  display: block;
  max-width: 100%;
}-->

<!-- React Icons - це набір іконок, спеціально створений для використання в React-додатках. Вона дозволяє легко та зручно вбудовувати іконки в компоненти React, спрощуючи використання векторних графічних символів.
Додавання бібліотеки до проекту виконується за допомогою NPM-пакету:

npm install react-icons

Бібліотека включає в себе широкий спектр різноманітних іконок, представляючи популярні набори, такі як Font Awesome, Material Icons, Ionicons та багато інших.
додамо іконку користувача з набору "Hero Icons" ліворуч від його імені:



import { HiUser } from "react-icons/hi";

const UserMenu = ({ name }) => {
  return (
    <div>
      <p><HiUser /> {name}</p>
    </div>
  );
};



Ви можете легко налаштовувати зовнішній вигляд іконок, використовуючи стилі React, передаючи власні класи або інші параметри.
import { HiUser } from "react-icons/hi";

export default function UserMenu({ name }) {
  return (
    <div>
      <p><HiUser className="my-icon" size="24" /> {name}</p>
    </div>
  );
};

- Колір іконки вказується в додатковому класі CSS-властивістю color.
- Розмір іконки визначається числом в атрибуті size, це кількість пікселів.
- За замовчуванням розмір іконок - 16px.-->

<!-- Імена селекторів класів повинні бути унікальними у всьому додатку, щоб уникнути конфліктів CSS-правил з однаковими селекторами у різних компонентах. Це є одним із недоліків використання ванільного CSS.


Використання ванільного CSS теж не найкращий підхід і має ряд недоліків, особливо у великих проектах.
-Слабка масштабованість
-Обмежене повторне використання стилів
-Для динамічних значень необхідно використовувати вбудовані стилі
-Проблема глобального простору імен
-Необхідність використовувати якусь конвенцію іменування селекторів класу -->

<!--                                                 Повторне використання стилів(композиція компонентів)
В React не використовують одні й ті самі CSS-класи в різних компонентах, для цього є композиція компонентів. Наприклад, замість використання базового CSS-класу .button у компонентах <LoginButton> та <FollowButton>, краще створити компонент <Button> зі своїми власними стилями, які можуть відображатись у кількох варіантах. Тоді компоненти <LoginButton> та <FollowButton> можуть використовувати компонент <Button>, а не просто CSS-клас.

// Button.jsx
const Button = ({ variant, children }) => {
  // Базові стилі кнопки з кількома варіантами відображення
  return <button className={clsx("button", variant)}>{children}</button>;
};

// LoginButton.jsx
const LoginButton = () => {
  // Унікальна логіка кнопки логіна
  return <Button variant="primary">Login</Button>;
};

// FollowButton.jsx
const FollowButton = () => {
  // Унікальна логіка кнопки підписки
  return <Button variant="secondary">Follow</Button>;
}; -->

<!-- rafce - команда від доданого розширення вскод. Створить компонент з назвою що в назві модуля -->
<!-- коли вставляємо компонент нвтисни контр+пробіл після назви і вскод запропонує написати ІМПОРТ сам -->
<!-- натиснувши контр можна обрати компонент і перейти як за посиланням у його папку -->
<!-- ставите курсор put the cursor on строка the line and pressed ctrl+C than Ctrl+X - it immediately cuts the line -->
