import { Injectable } from '@angular/core';

/**
 * Tipos de lenguaje soportados para el resaltado
 */
export type SupportedLanguage = 'html' | 'typescript' | 'scss' | 'css' | 'bash';

/**
 * Configuración para el resaltado de código
 */
export interface HighlightConfig {
  language: SupportedLanguage;
  showLineNumbers?: boolean;
}

/**
 * Token identificado en el código
 */
interface Token {
  type: string;
  value: string;
}

/**
 * Servicio para resaltar sintaxis de código sin dependencias externas
 * Implementación custom basada en expresiones regulares
 */
@Injectable({ providedIn: 'root' })
export class CodeHighlightService {
  /**
   * Patrones para cada tipo de token por lenguaje
   */
  private readonly patterns: Record<SupportedLanguage, RegExp[]> = {
    typescript: [
      // Strings
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
      // Keywords
      /\b(import|export|from|const|let|var|function|class|interface|type|enum|extends|implements|new|return|if|else|for|while|switch|case|break|continue|try|catch|finally|throw|async|await|static|private|public|protected|readonly|abstract|as|instanceof|typeof|void|null|undefined|true|false|this|super)\b/g,
      // Decorators
      /(@\w+)/g,
      // Types/Classes
      /\b([A-Z][a-zA-Z0-9]*)\b/g,
      // Numbers
      /\b(\d+\.?\d*)\b/g,
      // Comments
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      // Operators
      /(=>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%<>!=])/g,
    ],
    html: [
      // Tags
      /(<\/?[a-zA-Z][\w-]*)/g,
      // Attributes
      /\s([a-zA-Z][\w-]*)(?==)/g,
      // Attribute values
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
      // Angular bindings
      /(\[[\w.]+\]|\([\w.]+\)|\*\w+|#\w+)/g,
      // Comments
      /(<!--[\s\S]*?-->)/g,
      // Closing >
      /(\/?>)/g,
    ],
    scss: [
      // Variables
      /(\$[\w-]+)/g,
      // Selectors
      /([.#][\w-]+)/g,
      // Properties
      /([\w-]+)(?=\s*:)/g,
      // Values
      /:\s*([^;{]+)/g,
      // At-rules
      /(@[\w-]+)/g,
      // Comments
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      // Strings
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    ],
    css: [
      // Selectors
      /([.#][\w-]+)/g,
      // Properties
      /([\w-]+)(?=\s*:)/g,
      // At-rules
      /(@[\w-]+)/g,
      // Comments
      /(\/\*[\s\S]*?\*\/)/gm,
      // Strings
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    ],
    bash: [
      // Commands
      /^(\w+)/gm,
      // Flags
      /(--?[\w-]+)/g,
      // Strings
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
      // Variables
      /(\$\w+)/g,
      // Comments
      /(#.*$)/gm,
    ],
  };

  /**
   * Clases CSS para cada tipo de token
   */
  private readonly tokenClasses: Record<string, string> = {
    keyword: 'code-keyword',
    string: 'code-string',
    comment: 'code-comment',
    decorator: 'code-decorator',
    type: 'code-type',
    number: 'code-number',
    operator: 'code-operator',
    tag: 'code-tag',
    attribute: 'code-attribute',
    binding: 'code-binding',
    variable: 'code-variable',
    selector: 'code-selector',
    property: 'code-property',
    atrule: 'code-atrule',
    command: 'code-command',
    flag: 'code-flag',
  };

  /**
   * Resalta el código según el lenguaje especificado
   */
  highlight(code: string, config: HighlightConfig): string {
    if (!code) return '';

    // Escapar HTML primero
    let escapedCode = this.escapeHtml(code);

    // Aplicar resaltado según lenguaje
    escapedCode = this.applyHighlighting(escapedCode, config.language);

    // Agregar números de línea si se solicita
    if (config.showLineNumbers) {
      escapedCode = this.addLineNumbers(escapedCode);
    }

    return escapedCode;
  }

  /**
   * Escape caracteres HTML especiales
   */
  private escapeHtml(code: string): string {
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Aplica resaltado basado en el lenguaje
   */
  private applyHighlighting(code: string, language: SupportedLanguage): string {
    switch (language) {
      case 'typescript':
        return this.highlightTypeScript(code);
      case 'html':
        return this.highlightHtml(code);
      case 'scss':
      case 'css':
        return this.highlightStyles(code);
      case 'bash':
        return this.highlightBash(code);
      default:
        return code;
    }
  }

  /**
   * Resalta código TypeScript
   */
  private highlightTypeScript(code: string): string {
    // Orden importante: primero comentarios y strings para no procesar su contenido
    let result = code;

    // Comments
    result = result.replace(
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      `<span class="${this.tokenClasses['comment']}">$1</span>`
    );

    // Strings (después de comentarios)
    result = result.replace(
      /(&quot;(?:[^&]|&(?!quot;))*&quot;|&#039;(?:[^&]|&(?!#039;))*&#039;|`(?:[^`\\]|\\.)*`)/g,
      `<span class="${this.tokenClasses['string']}">$1</span>`
    );

    // Decorators
    result = result.replace(
      /(@\w+)/g,
      `<span class="${this.tokenClasses['decorator']}">$1</span>`
    );

    // Keywords
    const keywords =
      /\b(import|export|from|const|let|var|function|class|interface|type|enum|extends|implements|new|return|if|else|for|while|switch|case|break|continue|try|catch|finally|throw|async|await|static|private|public|protected|readonly|abstract|as|instanceof|typeof|void|null|undefined|true|false|this|super)\b/g;
    result = result.replace(
      keywords,
      `<span class="${this.tokenClasses['keyword']}">$1</span>`
    );

    // Types/Classes (PascalCase)
    result = result.replace(
      /\b([A-Z][a-zA-Z0-9]*)\b/g,
      `<span class="${this.tokenClasses['type']}">$1</span>`
    );

    // Numbers
    result = result.replace(
      /\b(\d+\.?\d*)\b/g,
      `<span class="${this.tokenClasses['number']}">$1</span>`
    );

    return result;
  }

  /**
   * Resalta código HTML/Angular templates
   */
  private highlightHtml(code: string): string {
    let result = code;

    // Comments
    result = result.replace(
      /(&lt;!--[\s\S]*?--&gt;)/g,
      `<span class="${this.tokenClasses['comment']}">$1</span>`
    );

    // Tags opening
    result = result.replace(
      /(&lt;\/?)([\w-]+)/g,
      `<span class="${this.tokenClasses['tag']}">$1$2</span>`
    );

    // Tags closing >
    result = result.replace(
      /(\/?&gt;)/g,
      `<span class="${this.tokenClasses['tag']}">$1</span>`
    );

    // Angular bindings
    result = result.replace(
      /(\[[\w.]+\]|\([\w.]+\)|\*\w+|#\w+)/g,
      `<span class="${this.tokenClasses['binding']}">$1</span>`
    );

    // Attribute values
    result = result.replace(
      /(&quot;[^&]*&quot;)/g,
      `<span class="${this.tokenClasses['string']}">$1</span>`
    );

    return result;
  }

  /**
   * Resalta código SCSS/CSS
   */
  private highlightStyles(code: string): string {
    let result = code;

    // Comments
    result = result.replace(
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      `<span class="${this.tokenClasses['comment']}">$1</span>`
    );

    // Variables SCSS
    result = result.replace(
      /(\$[\w-]+)/g,
      `<span class="${this.tokenClasses['variable']}">$1</span>`
    );

    // At-rules
    result = result.replace(
      /(@[\w-]+)/g,
      `<span class="${this.tokenClasses['atrule']}">$1</span>`
    );

    // Selectors
    result = result.replace(
      /([.#&][\w-]+)/g,
      `<span class="${this.tokenClasses['selector']}">$1</span>`
    );

    return result;
  }

  /**
   * Resalta código Bash
   */
  private highlightBash(code: string): string {
    let result = code;

    // Comments
    result = result.replace(
      /(#.*$)/gm,
      `<span class="${this.tokenClasses['comment']}">$1</span>`
    );

    // Strings
    result = result.replace(
      /(&quot;[^&]*&quot;|&#039;[^&]*&#039;)/g,
      `<span class="${this.tokenClasses['string']}">$1</span>`
    );

    // Variables
    result = result.replace(
      /(\$\w+)/g,
      `<span class="${this.tokenClasses['variable']}">$1</span>`
    );

    // Flags
    result = result.replace(
      /(--?[\w-]+)/g,
      `<span class="${this.tokenClasses['flag']}">$1</span>`
    );

    return result;
  }

  /**
   * Agrega números de línea al código
   */
  private addLineNumbers(code: string): string {
    const lines = code.split('\n');
    return lines
      .map(
        (line, index) =>
          `<span class="line-number">${index + 1}</span>${line}`
      )
      .join('\n');
  }
}
