let log = [];

export function recordMutation(entry) {
  const timestamp = new Date().toISOString();
  log.push({ entry, timestamp });
  if (log.length > 100) log.shift(); // keep last 100
}

export function getMutationLog() {
  return [...log]; // shallow copy
}

export function clearMutationLog() {
  log = [];
}
