export interface CommandOption {
    label: string;
    value: string;
    icon?: string;
    routerLink?: string;
    route?: string;
    action?: () => void;
}

export interface CommandItem {
    label: string;
    icon?: string;
    options: CommandOption[];
}

export interface CommandMenuConfig {
    /** Placeholder del input de búsqueda */
    placeholder?: string;
    /** Icono del botón */
    icon?: string;
    /** Atajo de teclado a mostrar */
    shortcut?: string;
    /** Ancho del menú */
    width?: string;
    /** Clase CSS del botón */
    buttonClass?: string;
    /** Estado deshabilitado */
    disabled?: boolean;
}

export interface CommandConfig {
    visible: boolean;
    width: string;
    placeholder: string;
}
