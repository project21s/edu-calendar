#!/bin/bash

# Скрипт для упаковки файлов manifest.json, content.js, styles.css в ZIP архив

# Настройки
FILES=("manifest.json" "content.js" "styles.css")
ARCHIVE_NAME="extension.zip"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔧 Упаковка файлов в ZIP архив..."

# Проверяем наличие команды zip
if ! command -v zip &> /dev/null; then
    echo -e "${RED}Ошибка: команда 'zip' не найдена. Установите zip пакет.${NC}"
    exit 1
fi

# Проверяем существование всех файлов
missing_files=()
for file in "${FILES[@]}"; do
    if [[ ! -f "$file" ]]; then
        missing_files+=("$file")
    fi
done

if [[ ${#missing_files[@]} -gt 0 ]]; then
    echo -e "${RED}Ошибка: следующие файлы не найдены:${NC}"
    for file in "${missing_files[@]}"; do
        echo -e "${RED}  - $file${NC}"
    done
    exit 1
fi

# Удаляем существующий архив если есть
if [[ -f "$ARCHIVE_NAME" ]]; then
    echo -e "${YELLOW}Удаляем существующий архив $ARCHIVE_NAME${NC}"
    rm "$ARCHIVE_NAME"
fi

# Создаем ZIP архив
echo "📦 Создаем архив $ARCHIVE_NAME..."
zip -q "$ARCHIVE_NAME" "${FILES[@]}"

# Проверяем успешность операции
if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ Архив успешно создан: $ARCHIVE_NAME${NC}"
    
    # Показываем размер архива
    size=$(ls -lh "$ARCHIVE_NAME" | awk '{print $5}')
    echo -e "${GREEN}📊 Размер архива: $size${NC}"
    
    # Показываем содержимое архива
    echo -e "${GREEN}📋 Содержимое архива:${NC}"
    zip -l "$ARCHIVE_NAME"
else
    echo -e "${RED}❌ Ошибка при создании архива${NC}"
    exit 1
fi