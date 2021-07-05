INSERT INTO users(email, first_name, last_name, password_hash, avatar) VALUES
('ivanov@example.com', 'Иван', 'Иванов', '5f4dcc3b5aa765d61d8327deb882cf99', 'avatar1.jpg'),
('petrov@example.com', 'Пётр', 'Петров', 'mkdmcc3b5aa765d61d8327djnd82cf99', 'avatar2.jpg');

INSERT INTO categories(name) VALUES
('Деревья'),
('За жизнь'),
('Без рамки'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Программирование'),
('Железо');

ALTER TABLE articles DISABLE TRIGGER ALL;

INSERT INTO articles(title, announce, fullText, picture, user_id) VALUES
('Ёлки. История деревьев', 'Ёлки — это не просто красивое дерево.', 'Ёлки — это не просто красивое дерево. Это прочная древесина.', 'forest@1x.jpg', 1),
('Как перестать беспокоиться и начать жить', 'Вы можете достичь всего.', 'Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 'skyscraper@1x.jpg', 1),
('Как достигнуть успеха не вставая с кресла', 'Этот смартфон — настоящая находка.', 'Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.', 'sea@1x.jpg', 2);

ALTER TABLE articles ENABLE TRIGGER ALL;


ALTER TABLE article_categories DISABLE TRIGGER ALL;

INSERT INTO article_categories(article_id, category_id) VALUES
(1, 2),
(2, 4),
(3, 6);

ALTER TABLE article_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;

INSERT INTO comments(text, user_id, article_id) VALUES
('Это где ж такие красоты?', 1, 1),
('Совсем немного...', 2, 1),
('Согласен с автором!', 1, 2),
('Мне кажется или я уже читал это где-то?', 2, 2),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете', 1, 3),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 2, 3);

ALTER TABLE comments ENABLE TRIGGER ALL;
