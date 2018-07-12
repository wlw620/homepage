const urlBase64ToUint8Array = (base64String) => {
  let padding = '='.repeat((4 - base64String.length % 4) % 4);
  let base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  let rawData = window.atob(base64);
  let outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default (registration) => {
  let convertedVapidKey = urlBase64ToUint8Array('BByfbpQaH5CBVOQmKGaIvN9svkZl1zjpg6-k2_bocLCmQ111S4-LLEWqpt0RnijShWkAaneVE08cYI-qKZJ2LAo');
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey
  }).then(function (pushSubscription) {
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });;
}
