import { notification } from 'antd';
import './AppNotification.scss';

const defaultConfig = (config) => ({
  className: 'app-notification',
  duration: 2, // time in seconds before notification is closed
  placement: 'topRight', // position of notification, values 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  ...config
});

const AppNotification = {
  info: (title, message) => {
    notification.info(defaultConfig({
      message: title,
      description: message
    }));
  },

  success: (title, message) => {
    notification.success(defaultConfig({
      message: title,
      description: message
    }));
  },

  warning: (title, message) => {
    notification.warning(defaultConfig({
      message: title,
      description: message
    }));
  },

  error: (title, message) => {
    notification.error(defaultConfig({
      message: title,
      description: message
    }));
  },

  open: (config) => {
    notification.open(config);
  }
};

export default AppNotification;