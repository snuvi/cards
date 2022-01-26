const readline = require('readline')
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const { v4: uuidv4 } = require('uuid')

const rl = readline.createInterface({
  input: fs.createReadStream(argv.f),
  crlfDelay: Infinity
})

rl.on('line', (data => {
  // убираем пробелы до и после строки
  let line = data.trim()
  // если строка пустая то не обрабатываем ее
  if (!line.length) {
    return
  }
  // меняем первый пробел в строке на запятую - потому что после слова-источника запятая пропущена
  line  = line.replace(/\s/, ',')
  // разбиваем текущую строку по запятым, и убираем оставшиеся пробелы по краям в каждом слове
  // после этого фильтруем пустые слова
  const tokens = line.split(',').map((s) => s.trim()).filter((s) => s.length)
  // Если лексем меньше одной (то есть нет даже английского слова то выходим из обработки текущей строки)
  if (tokens.length < 1) {
    return
  }
  // слово для перевода всегда идет первым (то есть по индексу 0)
  // остальные слова это переводы (dst)
  const [src, ...dst] = tokens
  // инициализация об'екта английского слова-источника
  const srcWord = { id: uuidv4(), value: src }
  // инициализация об'ектов слов-переводов английского слова источника
  const translations = dst.map((word) => ({ id: uuidv4(), value: word }))
  // Генерация кода для вставки в таблицу английского словаря
  console.log(`INSERT INTO dict_en(id, word) VALUES('${srcWord.id}', '${srcWord.value}');`)
  // проход по всем словам перевода (для srcWord)
  translations.forEach((word) => {
    // генерация кода вставки в таблицу русского словаря
    console.log(`INSERT INTO dict_ru(id, word) VALUES('${word.id}', '${word.value}');`)
    // генерация кода вставки в таблицу маппинга ru_en
    console.log(`INSERT INTO dict_map_en_ru(id_en, id_ru) VALUES('${srcWord.id}', '${word.id}');`)
  })
}))
