import colors from '../colors.module.scss';

export const DEFAULT_THEME = 'default';

const STARTED_THEME = {
  pages: {

  },
  components: {
    header: {
      _css: {
        background: colors.appHeaderBackground,
        borderBottom: '1px solid #d8dbe0',
      },
    },

    sider: {
      _css: {
        background: colors.appSiderBackground,
      },
    },

    footer: {
      _css: {
        background: colors.appFooterBackground,
        borderTop: '1px solid #d8dbe0',
      },
    },

    content: {
      _css: {
        background: colors.appContentBackground,
      },
    },

    menu_sider: {

      head_container: {
        _css: {
          background: colors.appDashboardLogoContainerBackground
        },

        text: {
          _css: {
            color: colors.appDashboardAppNameTextColor,
          },
        },
      }
    },

    menu: {
      _css: {
        background: 'unset',
      },

      light: {

      },

      dark: {
        sub_menu: {
          _css: {
            background: colors.appMenuDarkModeSubMenuItemBackground,
          },

          text: {
            _css: {
              color: colors.appMenuDarkModeSubMenuItemTextColor,
            },
          },

          on_hover: {
            _css: {
              background: colors.appMenuDarkModeSubMenuItemBackgroundHover,
            },

            text: {
              _css: {
                color: colors.appMenuDarkModeSubMenuItemTextColorHover,
              },
            },
          },
        },

        item_group: {
          _css: {
            background: colors.appMenuDarkModeMenuItemGroupBackground,
          },

          text: {
            _css: {
              color: colors.appMenuDarkModeMenuItemGroupTextColor,
            }
          },
        },

        item: {
          _css: {
            background: colors.appMenuDarkModeMenuItemBackground,
          },

          text: {
            _css: {
              color: colors.appMenuDarkModeMenuItemTextColor,
            },
          },

          on_hover: {
            _css: {
              background: colors.appMenuDarkModeMenuItemBackgroundHover,
            },

            text: {
              _css: {
                color: colors.appMenuDarkModeMenuItemTextColorHover,
              },
            },
          },

          on_select: {
            _css: {
              background: colors.appMenuDarkModeMenuItemBackgroundSelected,
            },

            text: {
              _css: {
                color: colors.appMenuDarkModeMenuItemTextColorSelected,
              },
            },

            badge: {
              _css: {
                color: colors.appMenuDarkModeMenuItemSelectedBadgeColor,
              }
            }
          },
        },

        popup: {
          _css: {
            background: colors.appMenuDarkModePopupBackground,
          },

          sub_menu: {
            _css: {
              background: colors.appMenuDarkModePopupSubMenuItemBackground,
            },

            text: {
              _css: {
                color: colors.appMenuDarkModePopupSubMenuItemTextColor,
              },
            },

            on_hover: {
              _css: {
                background: colors.appMenuDarkModePopupSubMenuItemBackgroundHover,
              },

              text: {
                _css: {
                  color: colors.appMenuDarkModePopupSubMenuItemTextColorHover,
                },
              },
            },
          },

          item_group: {
            _css: {
              background: colors.appMenuDarkModePopupMenuItemGroupBackground,
            },

            text: {
              _css: {
                color: colors.appMenuDarkModePopupMenuItemGroupTextColor,
              }
            },
          },

          item: {
            _css: {
              background: colors.appMenuDarkModePopupMenuItemBackground,
            },

            text: {
              _css: {
                color: colors.appMenuDarkModePopupMenuItemTextColor,
              },
            },

            on_hover: {
              _css: {
                background: colors.appMenuDarkModePopupMenuItemBackgroundHover,
              },

              text: {
                _css: {
                  color: colors.appMenuDarkModePopupMenuItemTextColorHover,
                },
              },
            },

            on_select: {
              _css: {
                background: colors.appMenuDarkModePopupMenuItemBackgroundSelected,
              },

              text: {
                _css: {
                  color: colors.appMenuDarkModePopupMenuItemTextColorSelected,
                },
              },
            },
          },
        },
      }
    }
  }
}

const AppThemes = {
  default: STARTED_THEME
};

export const getAppTheme = (themeId = DEFAULT_THEME) => {
  return AppThemes[themeId];
};