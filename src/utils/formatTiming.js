export function formatTiming(timing) {
  const timeOfDay = timing >= 1200 ? 'pm' : 'am';
  timing = timing % 1200;
  return (
    (Math.floor(timing / 100) || 12) +
    '.' +
    ((timing % 100) + '').padStart(2, '0') +
    ' ' +
    timeOfDay
  );
}
