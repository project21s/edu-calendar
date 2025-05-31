// Функция для очистки HTML и извлечения текста
function cleanHtmlToText(htmlContent) {
  if (!htmlContent) return '';
  
  // Создаем временный элемент для парсинга HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Извлекаем только текст, убирая все HTML теги
  let text = tempDiv.textContent || tempDiv.innerText || '';
  
  // Убираем лишние пробелы и переносы строк
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

// Функция для создания URL Google Calendar
function createGoogleCalendarUrl(title, datetime, location, description) {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  
  // Парсим дату и время
  let startDate = '';
  let endDate = '';
  
  if (datetime) {
    // Формат: "31 May 17:00 - 22:00"
    const dateTimeMatch = datetime.match(/(\d{1,2})\s+(\w+)\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
    
    if (dateTimeMatch) {
      const [, day, monthName, startTime, endTime] = dateTimeMatch;
      
      // Словарь месяцев
      const months = {
        'January': '01', 'Jan': '01',
        'February': '02', 'Feb': '02',
        'March': '03', 'Mar': '03',
        'April': '04', 'Apr': '04',
        'May': '05',
        'June': '06', 'Jun': '06',
        'July': '07', 'Jul': '07',
        'August': '08', 'Aug': '08',
        'September': '09', 'Sep': '09',
        'October': '10', 'Oct': '10',
        'November': '11', 'Nov': '11',
        'December': '12', 'Dec': '12'
      };
      
      const month = months[monthName] || '01';
      const currentYear = new Date().getFullYear();
      
      // Парсим время начала и окончания
      const [startHours, startMinutes] = startTime.split(':');
      const [endHours, endMinutes] = endTime.split(':');
      
      // Формат для Google Calendar (YYYYMMDDTHHMMSS)
      const dayPadded = day.padStart(2, '0');
      startDate = `${currentYear}${month}${dayPadded}T${startHours.padStart(2, '0')}${startMinutes.padStart(2, '0')}00`;
      endDate = `${currentYear}${month}${dayPadded}T${endHours.padStart(2, '0')}${endMinutes.padStart(2, '0')}00`;
    }
  }
  
  // Формируем описание события
  let eventDetails = 'Создано автоматически из edu.21-school.ru';
  if (description) {
    eventDetails = `${description}\n\n${eventDetails}`;
  }
  
  const params = new URLSearchParams({
    text: title || 'Событие',
    dates: startDate && endDate ? `${startDate}/${endDate}` : '',
    details: eventDetails,
    location: location || ''
  });
  
  return `${baseUrl}&${params.toString()}`;
}

// Функция для создания URL Яндекс.Календаря
function createYandexCalendarUrl(title, datetime, location, description) {
  const baseUrl = 'https://calendar.yandex.ru/event';
  
  // Парсим дату и время для Яндекс
  let startDateTime = '';
  let endDateTime = '';
  
  if (datetime) {
    const dateTimeMatch = datetime.match(/(\d{1,2})\s+(\w+)\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
    
    if (dateTimeMatch) {
      const [, day, monthName, startTime, endTime] = dateTimeMatch;
      
      const months = {
        'January': '01', 'Jan': '01',
        'February': '02', 'Feb': '02',
        'March': '03', 'Mar': '03',
        'April': '04', 'Apr': '04',
        'May': '05',
        'June': '06', 'Jun': '06',
        'July': '07', 'Jul': '07',
        'August': '08', 'Aug': '08',
        'September': '09', 'Sep': '09',
        'October': '10', 'Oct': '10',
        'November': '11', 'Nov': '11',
        'December': '12', 'Dec': '12'
      };
      
      const month = months[monthName] || '01';
      const currentYear = new Date().getFullYear();
      
      // Формат даты для Яндекс: YYYY-MM-DD
      const dayPadded = day.padStart(2, '0');
      const dateFormatted = `${currentYear}-${month}-${dayPadded}`;
      
      startDateTime = `${dateFormatted}T${startTime}:00`;
      endDateTime = `${dateFormatted}T${endTime}:00`;
    }
  }
  
  // Формируем описание события
  let eventDetails = 'Создано автоматически из edu.21-school.ru';
  if (description) {
    eventDetails = `${description}\n\n${eventDetails}`;
  }
  
  const params = new URLSearchParams({
    name: title || 'Событие',
    start_ts: startDateTime ? new Date(startDateTime).getTime() / 1000 : '',
    end_ts: endDateTime ? new Date(endDateTime).getTime() / 1000 : '',
    description: eventDetails,
    location: location || ''
  });
  
  return `${baseUrl}?${params.toString()}`;
}

// Функция для создания URL Outlook Calendar
function createOutlookCalendarUrl(title, datetime, location, description) {
  const baseUrl = 'https://outlook.live.com/calendar/0/deeplink/compose';
  
  // Парсим дату и время для Outlook
  let startDateTime = '';
  let endDateTime = '';
  
  if (datetime) {
    const dateTimeMatch = datetime.match(/(\d{1,2})\s+(\w+)\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
    
    if (dateTimeMatch) {
      const [, day, monthName, startTime, endTime] = dateTimeMatch;
      
      const months = {
        'January': '01', 'Jan': '01',
        'February': '02', 'Feb': '02',
        'March': '03', 'Mar': '03',
        'April': '04', 'Apr': '04',
        'May': '05',
        'June': '06', 'Jun': '06',
        'July': '07', 'Jul': '07',
        'August': '08', 'Aug': '08',
        'September': '09', 'Sep': '09',
        'October': '10', 'Oct': '10',
        'November': '11', 'Nov': '11',
        'December': '12', 'Dec': '12'
      };
      
      const month = months[monthName] || '01';
      const currentYear = new Date().getFullYear();
      
      // Формат даты для Outlook: ISO 8601
      const dayPadded = day.padStart(2, '0');
      const dateFormatted = `${currentYear}-${month}-${dayPadded}`;
      
      startDateTime = `${dateFormatted}T${startTime}:00`;
      endDateTime = `${dateFormatted}T${endTime}:00`;
    }
  }
   
  // Формируем описание события
  let eventDetails = 'Создано автоматически из edu.21-school.ru';
  if (description) {
    eventDetails = `${description}\n\n${eventDetails}`;
  }
  
  const params = new URLSearchParams({
    subject: title || 'Событие',
    startdt: startDateTime,
    enddt: endDateTime,
    body: eventDetails,
    location: location || ''
  });
  
  return `${baseUrl}?${params.toString()}`;
}

// Функция для создания .ics файла
function createICSFile(title, datetime, location) {
  // Парсим дату из формата "31 May 17:00 - 22:00"
  const parseDateTime = (dateTimeStr) => {
    const currentYear = new Date().getFullYear();
    const [datePart, timePart] = dateTimeStr.split(' ');
    
    // Разбираем дату
    const day = datePart;
    const month = timePart;
    
    // Разбираем время
    const timeMatch = dateTimeStr.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
    if (!timeMatch) return null;
    
    const [, startHour, startMin, endHour, endMin] = timeMatch;
    
    // Создаем даты
    const monthNames = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    const monthIndex = monthNames[month] !== undefined ? monthNames[month] : 4; // По умолчанию May
    
    const startDate = new Date(currentYear, monthIndex, parseInt(day), parseInt(startHour), parseInt(startMin));
    const endDate = new Date(currentYear, monthIndex, parseInt(day), parseInt(endHour), parseInt(endMin));
    
    return { startDate, endDate };
  };

  const dates = parseDateTime(datetime);
  if (!dates) return null;

  // Форматируем дату для ICS (UTC)
  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDateStr = formatICSDate(dates.startDate);
  const endDateStr = formatICSDate(dates.endDate);
  const now = formatICSDate(new Date());

  // Создаем содержимое ICS файла
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ICS Event Exporter//EN',
    'BEGIN:VEVENT',
    `UID:${now}@student.21-school.ru`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDateStr}`,
    `DTEND:${endDateStr}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return icsContent;
}

// Функция для загрузки файла
function downloadICS(filename, content) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  URL.revokeObjectURL(url);
}

// Функция для транслитерации кирилицы в латиницу
function transliterate(text) {
  const translitMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
    'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
  };
  
  return text.split('').map(char => translitMap[char] || char).join('');
}

// Функция для создания безопасного имени файла
function createSafeFilename(title) {
  // Транслитерируем кирилицу
  let filename = transliterate(title);
  
  // Заменяем небезопасные символы на подчеркивания
  filename = filename.replace(/[^a-zA-Z0-9\-_\s]/g, '_');
  
  // Заменяем пробелы на подчеркивания
  filename = filename.replace(/\s+/g, '_');
  
  // Удаляем множественные подчеркивания
  filename = filename.replace(/_+/g, '_');
  
  // Убираем подчеркивания в начале и конце
  filename = filename.replace(/^_+|_+$/g, '');
  
  // Ограничиваем длину
  if (filename.length > 50) {
    filename = filename.substring(0, 50);
  }
  
  return filename || 'event';
}

// Функция для создания кнопки
function createDownloadButton(title, datetime, location) {
  const button = document.createElement('button');
  button.textContent = '📅 Скачать .ics';
  button.className = 'ics-download-btn';
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const icsContent = createICSFile(title, datetime, location);
    if (icsContent) {
      const filename = `${createSafeFilename(title)}.ics`;
      downloadICS(filename, icsContent);
    } else {
      alert('Ошибка: не удалось распарсить дату');
    }
  });
  
  return button;
}

// Функция для создания кнопок
function createCalendarButtons(title, datetime, location, description) {
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'calendar-buttons-container';
  
  // Кнопка Google Calendar
  const googleButton = document.createElement('button');
  googleButton.innerHTML = '📅 Google';
  googleButton.className = 'google-calendar-btn';
  
  googleButton.addEventListener('click', function(e) {
    e.preventDefault();
    const url = createGoogleCalendarUrl(title, datetime, location, description);
    window.open(url, '_blank');
  });
  
  // Кнопка Яндекс.Календарь - не работает дата старта и окончания
  // const yandexButton = document.createElement('button');
  // yandexButton.innerHTML = '🗓️ Яндекс';
  // yandexButton.className = 'yandex-calendar-btn';
  
  // yandexButton.addEventListener('click', function(e) {
  //   e.preventDefault();
  //   const url = createYandexCalendarUrl(title, datetime, location, description);
  //   window.open(url, '_blank');
  // });
  
  // Кнопка Outlook Calendar
  const outlookButton = document.createElement('button');
  outlookButton.innerHTML = '📧 Outlook';
  outlookButton.className = 'outlook-calendar-btn';
  
  outlookButton.addEventListener('click', function(e) {
    e.preventDefault();
    const url = createOutlookCalendarUrl(title, datetime, location, description);
    window.open(url, '_blank');
  });

  // кнопка загрузки ics
  const icsButton = createDownloadButton(title, datetime, location);
  
  buttonContainer.appendChild(googleButton);
  // buttonContainer.appendChild(yandexButton);
  buttonContainer.appendChild(outlookButton);
  buttonContainer.appendChild(icsButton);
  
  return buttonContainer;
}

// Основная функция поиска и добавления кнопок
function addCalendarButtons() {
  // Находим все div с классом MuiBox-root
  const muiBoxes = document.querySelectorAll('div.MuiBox-root');
  
  muiBoxes.forEach(box => {
    // Проверяем, есть ли уже кнопки в этом блоке
    if (box.querySelector('.calendar-buttons-container')) {
      return;
    }
    
    // Ищем нужные элементы внутри этого div
    const titleElement = box.querySelector('h3[data-testid="Agenda.ActivityAndExamDrawer.title"]');
    const datetimeElement = box.querySelector('p[data-testid="Agenda.ActivityAndExamDrawer.datetime"]');
    const locationElement = box.querySelector('span[data-testid="Agenda.ActivityAndExamDrawer.location"]');
    
    // Если найдены все необходимые элементы
    if (titleElement && datetimeElement && locationElement) {
      const title = titleElement.textContent.trim();
      const datetime = datetimeElement.textContent.trim();
      const location = locationElement.textContent.trim();
      
      // Ищем описание в следующем div с классом MuiPaper-root
      let description = '';
      const nextElement = box.nextElementSibling;
      if (nextElement && nextElement.classList.contains('MuiPaper-root')) {
        const tiptapElement = nextElement.querySelector('div.tiptap.ProseMirror');
        if (tiptapElement) {
          description = cleanHtmlToText(tiptapElement.innerHTML);
        }
      }
      
      // Создаем кнопки
      const buttons = createCalendarButtons(title, datetime, location, description);
      
      // Добавляем кнопки в конец div
      box.appendChild(buttons);
      
      console.log('Добавлена кнопка календаря для:', title);
      if (description) {
        console.log('С описанием:', description.substring(0, 100) + '...');
      }
    }
  });
}

// Запускаем поиск при загрузке страницы
addCalendarButtons();

// Также следим за изменениями DOM (для динамически загружаемого контента)
const observer = new MutationObserver(function(mutations) {
  let shouldCheck = false;
  
  mutations.forEach(function(mutation) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      shouldCheck = true;
    }
  });
  
  if (shouldCheck) {
    // Небольшая задержка для завершения рендеринга
    setTimeout(addCalendarButtons, 100);
  }
});

// Начинаем наблюдение за изменениями
observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('Расширение "Добавить в Google Календарь" загружено');