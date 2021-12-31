import colors from '../colors.module.scss';

export const DEFAULT_THEME = 'default';

const AppThemes = {
  default: {
    dashboard: {
      appLogoContainer: {
        background: colors.dashboardAppLogoBackground
      }
    },
    header: {
      background: colors.appHeaderBackground
    },
    sider: {
      background: colors.appSiderBackground
    },
    footer: {
      background: colors.appFooterBackground
    }
  }
};

export const getAppTheme = (themeId = DEFAULT_THEME) => {
  return AppThemes[themeId];
};