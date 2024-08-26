export const durationToMilliseconds = (duration: string): number => {
  const match = duration.match(/^(\d+)([mhd])$/)
  if (!match) {
    throw new Error('Invalid duration format')
  }
  const value = parseInt(match[1], 10)
  const unit = match[2]
  
  switch (unit) {
    case 'm': // minutos
      return value * 60 * 1000
    case 'h': // horas
      return value * 60 * 60 * 1000
    case 'd': // días
      return value * 24 * 60 * 60 * 1000
    default:
      throw new Error('Unknown time unit')
  }
}