// ФОРМА С РЕАЛЬНОЙ ОТПРАВКОЙ НА EMAIL
function setupRealFeedbackForm() {
    const form = document.getElementById('feedback-form');
    if (!form) return;

    form.addEventListener('submit', async function (event) {
        console.log('Форма отправляется!'); // Добавь для отладки
        event.preventDefault();

        // Получаем данные
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;

        // Проверка
        if (!name || !email || !message) {
            alert('❌ Заполните все поля!');
            return false; // Добавь return false
        }

        // Показываем загрузку
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправляем...';
        submitBtn.disabled = true;

        try {
            // ОТПРАВКА НА FORMSFREE (ИСПРАВЛЕННЫЙ URL)
            const response = await fetch('https://formspree.io/f/mykkzjgy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: 'Новое сообщение с сайта Смешарики'
                })
            });

            if (response.ok) {
                alert('✅ Сообщение отправлено! Мы ответим вам в ближайшее время.');
                form.reset();
            } else {
                const errorData = await response.json();
                console.error('Ошибка Formspree:', errorData);
                alert('❌ Ошибка отправки. Попробуйте ещё раз.');
            }

        } catch (error) {
            console.error('Ошибка:', error);
            alert('❌ Ошибка сети. Проверьте интернет-соединение.');
        } finally {
            // Возвращаем кнопку в исходное состояние
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }

        return false; // Важно! Останавливаем отправку формы
    });
}

// НАЧАЛО СКРИПТА
document.addEventListener('DOMContentLoaded', function () {
    console.log('Сайт Смешариков загружен! 🎉');

    // НАСТРАИВАЕМ ФОРМУ - ИСПРАВЬ НАЗВАНИЕ!
    setupRealFeedbackForm(); // ← ЭТО ВАЖНО!

    // Потом всё остальное
    setupCardHovers();
    setupMap();
});

// ... остальной код (setupCardHovers и setupMap) оставь как есть ...

function setupCardHovers() {
    const cards = document.querySelectorAll('.character-card');

    // Данные о персонажах
    const charactersData = {
        'крош': {
            name: 'Крош',
            desc: 'Весёлый и энергичный кролик',
            psychology: 'Крош — экстраверт, всегда в центре внимания. Его энергия заразительна, но иногда он действует не подумав.',
            personality: {
                temperament: 'Сангвиник',
                strengths: 'Оптимизм, активность, дружелюбие',
                weaknesses: 'Импульсивность, невнимательность',
                catchphrase: 'Йоу! Давайте веселиться!',
                hobbies: 'Экстрим, приключения, танцы'
            }
        },
        'ёжик': {
            name: 'Ёжик',
            desc: 'Умный и осторожный ёж',
            psychology: 'Ёжик — интроверт-мыслитель. Всегда всё анализирует, старается избегать риска. Лучший друг Кроша.',
            personality: {
                temperament: 'Меланхолик',
                strengths: 'Интеллект, осторожность, ответственность',
                weaknesses: 'Мнительность, тревожность',
                catchphrase: 'Надо подумать...',
                hobbies: 'Чтение, коллекционирование, шахматы'
            }
        },
        'пин': {
            name: 'Пин',
            desc: 'Гениальный пингвин-изобретатель',
            psychology: 'Пин — инженерный гений. Мыслит системно, любит порядок. Немного отстранён от социальной жизни.',
            personality: {
                temperament: 'Флегматик',
                strengths: 'Логика, изобретательность, терпение',
                weaknesses: 'Социальная неловкость, перфекционизм',
                catchphrase: 'Так, момент...',
                hobbies: 'Изобретения, техника, черчение'
            }
        },
        'лосяш': {
            name: 'Лосяш',
            desc: 'Учёный-философ',
            psychology: 'Лосяш — учёный-философ. Живёт в мире идей, иногда отрываясь от реальности. Уважаем всеми за мудрость.',
            personality: {
                temperament: 'Меланхолик-флегматик',
                strengths: 'Мудрость, эрудиция, спокойствие',
                weaknesses: 'Рассеянность, забывчивость',
                catchphrase: 'Интересная теория...',
                hobbies: 'Наука, философия, наблюдение за звёздами'
            }
        },
        'нюша': {
            name: 'Нюша',
            desc: 'Модная и романтичная свинка',
            psychology: 'Нюша — творческая натура с ярким воображением. Мечтает о любви и красивой жизни. Эмоциональна и экспрессивна.',
            personality: {
                temperament: 'Холерик',
                strengths: 'Творчество, чувство стиля, эмпатия',
                weaknesses: 'Капризность, зависимость от мнения',
                catchphrase: 'Это же так романтично!',
                hobbies: 'Мода, косметика, журналы, мечтания'
            }
        },
        'бараш': {
            name: 'Бараш',
            desc: 'Поэтичный и мечтательный баран',
            psychology: 'Бараш — тонкая творческая душа. Видит красоту в мелочах, но склонен к меланхолии. Влюблён в Нюшу.',
            personality: {
                temperament: 'Меланхолик',
                strengths: 'Чувствительность, творчество, романтизм',
                weaknesses: 'Пессимизм, неуверенность',
                catchphrase: 'Как грустно...',
                hobbies: 'Поэзия, музыка, наблюдение за облаками'
            }
        },
        'совунья': {
            name: 'Совунья',
            desc: 'Заботливая сова-доктор',
            psychology: 'Совунья — материнская фигура для всех Смешариков. Практична, заботлива, но иногда чрезмерно опекает. Имеет медицинский склад ума и любит порядок во всём.',
            personality: {
                temperament: 'Флегматик',
                strengths: 'Забота, практичность, ответственность, терпение',
                weaknesses: 'Гиперопека, излишняя тревожность, консервативность',
                catchphrase: 'Надо принять витаминки!',
                hobbies: 'Медицина, забота о других, приготовление полезной еды'
            }
        },
        'кар-карыч': {
            name: 'Кар-Карыч',
            desc: 'Бывалый ворон-путешественник',
            psychology: 'Кар-Карыч — эксцентричный романтик. Живёт воспоминаниями о былой славе авиатора, любит приукрашивать истории. Несмотря на возраст, сохранил авантюрный дух.',
            personality: {
                temperament: 'Сангвиник-холерик',
                strengths: 'Опыт, обаяние, оптимизм, коммуникабельность',
                weaknesses: 'Хвастовство, ностальгия, забывчивость',
                catchphrase: 'В моё время...',
                hobbies: 'Воспоминания, путешествия, рассказывание баек'
            }
        },
        'копатыч': {
            name: 'Копатыч',
            desc: 'Трудолюбивый медведь-огородник',
            psychology: 'Копатыч — приземлённый трудяга. Ценит простые радости жизни: землю, растения, физический труд. Медлителен, но основателен во всём. Имеет глубокую связь с природой.',
            personality: {
                temperament: 'Флегматик-меланхолик',
                strengths: 'Трудолюбие, надежность, связь с природой, практичность',
                weaknesses: 'Медлительность, упрямство, нелюбовь к переменам',
                catchphrase: 'Земля-матушка...',
                hobbies: 'Огородничество, земледелие, выращивание растений'
            }
        }
    };

    cards.forEach(card => {
        const characterName = card.querySelector('.character-card__name').textContent.toLowerCase();
        const charData = charactersData[characterName];

        if (!charData) {
            console.log('Нет данных для персонажа:', characterName);
            return;
        }

        const popup = document.createElement('div');
        popup.className = 'character-popup';
        popup.style.cssText = `
            position: fixed;
            display: none;
            background: white;
            border: 3px solid #FF6B6B;
            border-radius: 15px;
            padding: 20px;
            width: 350px;
            max-width: 90vw;
            z-index: 9999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            font-family: Arial, sans-serif;
            color: #333;
            pointer-events: none;
        `;

        popup.innerHTML = `
            <div style="border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-bottom: 15px;">
                <h4 style="margin: 0; color: #2c3e50; font-size: 22px;">${charData.name}</h4>
                <p style="margin: 5px 0 0 0; color: #666; font-style: italic;">${charData.desc}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
                <p style="margin: 0 0 10px 0; font-weight: bold; color: #4CAF50;">Психологический портрет:</p>
                <p style="margin: 0; line-height: 1.5; background: #f9f9f9; padding: 10px; border-radius: 8px;">${charData.psychology}</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                <p style="margin: 5px 0; font-size: 15px;"><strong>👤 Темперамент:</strong> ${charData.personality.temperament}</p>
                <p style="margin: 5px 0; font-size: 15px;"><strong>✅ Сильные стороны:</strong> ${charData.personality.strengths}</p>
                <p style="margin: 5px 0; font-size: 15px;"><strong>❌ Слабые стороны:</strong> ${charData.personality.weaknesses}</p>
            </div>
            
            <div style="background: #FFF3CD; padding: 10px; border-radius: 8px; border-left: 4px solid #FFC107;">
                <p style="margin: 5px 0; font-size: 15px;"><strong>💬 Любимая фраза:</strong> <em>"${charData.personality.catchphrase}"</em></p>
                <p style="margin: 5px 0; font-size: 15px;"><strong>🎯 Хобби:</strong> ${charData.personality.hobbies}</p>
            </div>
            
            <div style="text-align: center; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #ddd;">
                <p style="margin: 0; font-size: 12px; color: #888;">Информация появляется при наведении</p>
            </div>
        `;

        document.body.appendChild(popup);

        let hoverTimer;
        let isPopupShowing = false;

        function showPopup() {
            clearTimeout(hoverTimer);
            if (isPopupShowing) return;

            hoverTimer = setTimeout(() => {
                const rect = card.getBoundingClientRect();

                let top = rect.top - popup.offsetHeight - 15;
                let left = rect.left + (rect.width / 2) - (popup.offsetWidth / 2);

                if (top < 10) {
                    top = rect.bottom + 15;
                }

                if (left < 10) left = 10;
                if (left + popup.offsetWidth > window.innerWidth) {
                    left = window.innerWidth - popup.offsetWidth - 10;
                }

                popup.style.top = top + 'px';
                popup.style.left = left + 'px';
                popup.style.display = 'block';
                isPopupShowing = true;
            }, 150);
        }

        function hidePopup() {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                popup.style.display = 'none';
                isPopupShowing = false;
            }, 300);
        }

        card.addEventListener('mouseenter', showPopup);

        card.addEventListener('mouseleave', function (e) {
            const relatedTarget = e.relatedTarget;
            if (relatedTarget && (relatedTarget === popup || popup.contains(relatedTarget))) {
                return;
            }
            hidePopup();
        });

        popup.addEventListener('mouseleave', hidePopup);

        card.addEventListener('click', function (e) {
            e.preventDefault();

            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.display = 'block';
            isPopupShowing = true;

            setTimeout(() => {
                popup.style.display = 'none';
                isPopupShowing = false;
            }, 5000);
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.character-card')) {
            document.querySelectorAll('.character-popup').forEach(popup => {
                popup.style.display = 'none';
            });
        }
    });
}

// КАРТА - РЕАЛЬНАЯ КАРТА ЯНДЕКС
function setupMap() {
    console.log('Загружаем Яндекс.Карту...');

    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.log('Ошибка: элемент с id="map" не найден!');
        return;
    }

    const latitude = 59.968137;
    const longitude = 30.316272;

    // РЕАЛЬНАЯ ИНТЕРАКТИВНАЯ КАРТА
    mapElement.innerHTML = `
        <iframe 
            src="https://yandex.ru/map-widget/v1/?ll=${longitude},${latitude}&z=16&pt=${longitude},${latitude},pm2rdl&l=map"
            width="100%" 
            height="400" 
            frameborder="0"
            style="
                border-radius: 15px;
                border: 3px solid #4CAF50;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            "
            allowfullscreen="true"
            title="Карта расположения студии Смешариков"
        ></iframe>
    `;

    // Добавляем информацию под картой
    const infoHTML = `
        <div style="
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            border-left: 5px solid #4CAF50;
        ">
            <h4 style="color: #2c3e50; margin-top: 0;">🎬 Студия «Смешарики»</h4>
            <p style="margin: 10px 0;"><strong>📍 Адрес:</strong> Санкт-Петербург, ул. Чапыгина, 6</p>
            <p style="margin: 10px 0; color: #666;">Здесь создавались все серии мультфильма с 2003 года</p>
            
            <div style="display: flex; gap: 15px; justify-content: center; margin-top: 15px;">
                <a href="https://yandex.ru/maps/-/CDqQIBV7" 
                   target="_blank"
                   style="
                        display: inline-block;
                        padding: 10px 20px;
                        background: #4CAF50;
                        color: white;
                        text-decoration: none;
                        border-radius: 25px;
                        font-weight: bold;
                        transition: all 0.3s;
                        flex: 1;
                        max-width: 200px;
                   "
                   onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(76, 175, 80, 0.3)';"
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                >
                    🗺️ Яндекс.Карты
                </a>
                
                <a href="https://www.google.com/maps?q=59.968137,30.316272" 
                   target="_blank"
                   style="
                        display: inline-block;
                        padding: 10px 20px;
                        background: #4285F4;
                        color: white;
                        text-decoration: none;
                        border-radius: 25px;
                        font-weight: bold;
                        transition: all 0.3s;
                        flex: 1;
                        max-width: 200px;
                   "
                   onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(66, 133, 244, 0.3)';"
                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                >
                    📍 Google Maps
                </a>
            </div>
        </div>
    `;

    mapElement.insertAdjacentHTML('afterend', infoHTML);

    console.log('Карта Яндекс загружена!');
}