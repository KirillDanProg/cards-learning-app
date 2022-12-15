import {createTheme} from '@mui/material/styles';
import {blueGrey, grey, red} from "@mui/material/colors";
import {PaletteMode, ThemeProvider} from "@mui/material";
import * as React from "react";
import {FC} from "react";

// export class ThemeModeToggle {
//     private _mode: PaletteMode = "light";
//
//     get mode(): PaletteMode {
//         return this._mode;
//     }
//
//     set mode(value: PaletteMode) {
//         this._mode = value;
//     }
//
// }

interface IColorModeContext {
    toggleColorMode: () => void
    mode: "dark" | "light"
}

export const ColorModelContex = React.createContext<IColorModeContext>({
        toggleColorMode: () => {

        },
        mode: "light"
})






// @ts-ignore
export const ColorModelContextProvider= ({ children }) => {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => prevMode === 'light' ? 'dark' : 'light',);
            },
            mode,
        }),
        [mode],
    );

     const theme = React.useMemo(
        () =>  createTheme({
            palette: {
                mode,
                primary: blueGrey,
                secondary: grey,
                contrastThreshold: 3,
                tonalOffset: 0.2,
            },
            typography: {
                fontFamily: "Montserrat",
            },

        }), [mode])

    return (
        <ColorModelContex.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModelContex.Provider>
    )
}

export const useColorMode = () => React.useContext(ColorModelContex)

