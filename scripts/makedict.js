const readline = require('readline')
const { v4: uuidv4 } = require('uuid')

const rl = readline.createInterface({
  input: process.stdin
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
  const [src, ...dst] = tokens

  const srcWord = { id: uuidv4(), value: src }
  const dstWords = dst.map((word) => ({ id: uuidv4(), value: word }))

  dstWords.forEach((word) => {
    // генерация кода вставки в таблицу маппинга
    console.log(`INSERT INTO dict_map(src_id, dst_id) VALUES('${srcWord.id}', '${word.id}');`)
    console.log(`INSERT INTO dict_ru_en(id, word) VALUES('${word.id}', '${word.value}');`)
  })
}))
