const sendTag = (eventName: string, args: {[key: string]: string}) => {
  if(window == undefined) return;
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    'event': eventName,
    ...args
  });
};

export { sendTag }