import React from 'react';
import { useAppTheme } from "../../state/ui/theme/themeHook";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { Themes, DEFAULT_THEME } from "../../constants/constants";

const propTypes = {
    theme: PropTypes.string
};

const defaultProps = {

};

const findAppTheme = (theme, appTheme) => {
    return Themes[theme]?.src || Themes[appTheme]?.src || Themes[DEFAULT_THEME]?.src;
};

const AppThemeProvider = (props) => {
    const appTheme = useAppTheme();
    const theme = findAppTheme(props.theme, appTheme);
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
};

AppThemeProvider.propTypes = propTypes;

AppThemeProvider.defaultProps = defaultProps;

export default AppThemeProvider;