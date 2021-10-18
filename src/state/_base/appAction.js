import uuid from 'uuid';

const newAppAction = (action) => {
  const { type, storePath, ...others } = action;
  return {
    id: uuid.v4(),
    type: type,
    storePath: storePath,
    ...others
  };
};

export const createActions = (actions) => {
  return arrToObj(actions,
    (action) => action.type,
    (item) => newAppAction(action)
  );
};