import { effect, Injectable, signal } from '@angular/core';

/**
 * Type representing the possible theme identifiers.
 */
export type TThemeId =
    'sicof-light' |
    'sicof-light-medium' |
    'sicof-light-high' |
    'sicof-dark' |
    'sicof-dark-medium' |
    'sicof-dark-high' |
    'sicof-red-lt' |
    'sicof-orange-lt' |
    'sicof-yellow-lt' |
    'sicof-green-lt' |
    'sicof-blue-lt' |
    'sicof-chartreuse-lt' |
    'sicof-cyan-lt'

/**
 * Interface representing a theme object.
 * @property id - The unique identifier for the theme.
 * @property name - The display name of the theme.
 * @property className - The CSS class name associated with the theme.
 */
export type ITheme = {
    id: TThemeId;
    name: string;
    className: string;
};

@Injectable({
    providedIn: 'root'
})
/**
 * Service for managing application themes.
 * Provides functionality to set, retrieve, and persist themes.
 */
export class ThemeService {
    /**
     * Static array of available themes.
     * Contains predefined themes with their identifiers, names, and CSS class names.
     */
    static readonly themes: ITheme[] = [
        {
            id: 'sicof-light',
            name: 'Sicof Light',
            className: 'sicof-theme-light',
        },
        {
            id: 'sicof-light-medium',
            name: 'Sicof Light Med',
            className: 'sicof-theme-light-medium-contrast',
        },
        {
            id: 'sicof-light-high',
            name: 'Sicof Light High',
            className: 'sicof-theme-light-high-contrast',
        },
        {
            id: 'sicof-dark',
            name: 'Sicof Dark',
            className: 'sicof-theme-dark',
        },
        {
            id: 'sicof-dark-medium',
            name: 'Sicof Dark Med',
            className: 'sicof-theme-dark-medium-contrast',
        },
        {
            id: 'sicof-dark-high',
            name: 'Sicof Dark High',
            className: 'sicof-theme-dark-high-contrast',
        },
        {
            id: 'sicof-red-lt',
            name: 'Sicof Red Light',
            className: 'sicof-theme-red-light',
        },
        {
            id: 'sicof-orange-lt',
            name: 'Sicof Orange Light',
            className: 'sicof-theme-orange-light',
        },
        {
            id: 'sicof-yellow-lt',
            name: 'Sicof Yellow Light',
            className: 'sicof-theme-yellow-light',
        },
        {
            id: 'sicof-green-lt',
            name: 'Sicof Green Light',
            className: 'sicof-theme-green-light',
        },
        {
            id: 'sicof-blue-lt',
            name: 'Sicof Blue Light',
            className: 'sicof-theme-blue-light',
        },
        {
            id: 'sicof-chartreuse-lt',
            name: 'Sicof Chartreuse Light',
            className: 'sicof-theme-chartreuse-light',
        },
        {
            id: 'sicof-cyan-lt',
            name: 'Sicof Cyan Light',
            className: 'sicof-theme-cyan-light',
        }
    ];

    /**
     * Key used for storing the selected theme in localStorage.
     */
    readonly localStorageKey = 'app-theme';

    /**
     * Signal representing the currently selected theme.
     * Provides a readonly view of the theme state.
     */
    private _currentTheme = signal<ITheme | null>(null);

    /**
     * Readonly signal for accessing the current theme.
     */
    readonly currentTheme = this._currentTheme.asReadonly();

    /**
     * Constructor that initializes the theme service.
     * Automatically sets the theme to the default theme on instantiation.
     */
    constructor() {
        // Initialize theme to default on service creation
        this._currentTheme.set(this._getDefaultTheme());
    }

    /**
     * Getter for the default theme.
     * @returns The default theme object.
     */
    get defaultTheme(): ITheme {
        return this._getDefaultTheme();
    }

    /**
     * Sets the current theme.
     * @param theme - The theme to be applied.
     */
    setTheme(theme: ITheme): void {
        this._currentTheme.set(theme);
    }

    /**
     * Effect that synchronizes the current theme with localStorage and updates the document's class list.
     * Automatically triggered when the `currentTheme` signal changes.
     */
    private readonly _currentThemeEffect = effect(() => {
        const theme = this._currentTheme();
        if (!theme) {
            return;
        }
        localStorage.setItem(this.localStorageKey, theme.id);
        document.documentElement.classList.remove(
            ...ThemeService.themes.reduce((acc, item) => {
                if (theme.id !== item.id && !!item.className) {
                    acc.push(item.className);
                }

                return acc;
            }, [] as string[])
        );

        if (!!theme?.className) {
            document.documentElement.classList.add(theme.className);
        }
    });

    /**
     * Retrieves the default theme based on the value stored in localStorage.
     * Falls back to the 'sicof-light' theme if no valid theme is found.
     * @returns The default theme object.
     */
    private _getDefaultTheme(): ITheme {
        const themeId = (localStorage.getItem(this.localStorageKey) as TThemeId) ?? 'sicof-light';
        return ThemeService.themes.find(theme => theme.id === themeId) || ThemeService.themes[0];
    }
}