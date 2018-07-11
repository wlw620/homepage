export default (registration) => {

  return registration.pushManager.subscribe({
    userVisibleOnly: true
  }).then((pushSubscription) => {
    return pushSubscription;
  });

}
