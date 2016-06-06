export function hasValidTimes(predictions) {
  return predictions
    .filter(({ route, label, times }) => Array.isArray(times))
    .length > 0;
}

export function hasOnlyValidTimes(predictions) {
  return predictions
    .filter(({ route, label, times }) => Array.isArray(times))
    .length === predictions.length;
}
