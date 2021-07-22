
const sagaLogger = (sagaId, action) => {
  console.log(`[SAGA WATCHER TRIGGERED] ${sagaId}`, {
    action: action
  });
};

export default sagaLogger;