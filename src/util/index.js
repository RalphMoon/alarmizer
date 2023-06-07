export const padToString = function (number) {
  return (number < 10 ? '0' : '') + number;
};

export const formatLocalDate = function () {
  const current = new Date();

  return current.getFullYear()
      + '-' + padToString(current.getMonth() + 1)
      + '-' + padToString(current.getDate())
      + 'T' + padToString(current.getHours())
      + ':' + padToString(current.getMinutes())
      + ':' + padToString(current.getSeconds());
};

export const formatCurrent = function (dateString) {
  const formatted = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(dateString));

  return formatted;
};

export const formatAlarm = function (dateString) {
  const formatted = new Intl.DateTimeFormat('ko', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));

  return formatted;
};

export const formatMessage = function (dateString) {
  const formatted = new Intl.DateTimeFormat('ko', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));

  return formatted;
};
