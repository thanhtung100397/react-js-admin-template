import { notification } from 'antd';
import './AppNotification.scss';

const NotificationType = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

const defaultConfig = {
  className: 'app-notification',
  duration: 2, // time in seconds before notification is closed
  placement: 'topRight', // position of notification, values 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
};

const newNotification = async (type, config) => {
  let func = notification[type];
  if (!func) {
    func = notification.open;
  }
  return new Promise((resolve, reject) => {
    try {
      func({
        ...defaultConfig,
        ...config,
        onClose: () => {
          config.onClose && config.onClose();
          resolve();
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const AppNotification = {
  info: (title, message) => newNotification(NotificationType.INFO, {
    message: title,
    description: message
  }),

  success: (title, message) => newNotification(NotificationType.SUCCESS, {
    message: title,
    description: message
  }),

  warning: (title, message) => newNotification(NotificationType.WARNING, {
    message: title,
    description: message
  }),

  error: (title, message) => newNotification(NotificationType.ERROR, {
    message: title,
    description: message
  }),

  open: (title, message) => newNotification(undefined, {
    message: title,
    description: message
  }),
};

export default AppNotification;