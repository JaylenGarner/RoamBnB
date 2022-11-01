const formatDate = (date) => {
  let index
  const dateArr = date.split('')

  for (let i = 0; i < dateArr.length; i++) {
    let el = dateArr[i]

    if (el === 'T') {
      index = i;
      break
    }
  }

  return dateArr.slice(0, index).join('')
}

const monthConverter = (month) => {
  if (month === '01') return 'January'
  if (month === '02') return 'February'
  if (month === '03') return 'March'
  if (month === '04') return 'April'
  if (month === '05') return 'May'
  if (month === '06') return 'June'
  if (month === '07') return 'July'
  if (month === '08') return 'August'
  if (month === '09') return 'September'
  if (month === '10') return 'October'
  if (month === '11') return 'November'
  if (month === '12') return 'December'
}

const dateConverter = (date) => {
  const formattedDate = formatDate(date)
  const dateObj = {}

  const split = formattedDate.split('-')
  dateObj.year = split[0]
  dateObj.month = monthConverter(split[1])
  return dateObj;
}

export const getMonth = (date) => {
  const dateObj = dateConverter(date)
  return dateObj.month
}

export const getYear = (date) => {
  const dateObj = dateConverter(date)
  return dateObj.year
}
