export default (file) => {
  return navigator.serviceWorker.register(file);
}
