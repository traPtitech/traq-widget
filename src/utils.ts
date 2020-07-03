const pad0 = (n: number, count: number) => ('' + n).padStart(count, '0')

export const dateToString = (date: string): string => {
  const d = new Date(date)
  const day = `${d.getFullYear()}/${pad0(d.getMonth() + 1, 2)}/${pad0(
    d.getDate(),
    2
  )}`
  const time = `${pad0(d.getHours(), 2)}:${pad0(d.getMinutes(), 2)}`

  return `${day} ${time}`
}
