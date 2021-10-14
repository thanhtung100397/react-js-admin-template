import uuid from 'uuid';

const newAppAction = (storePath, actionType, payload) => ({
  storePath: storePath,
  type: actionType,
  id: uuid.v4(),
  payload: payload
});

export const createActions = (actions) => {

};