import {
  Component,
  input,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import {
  CodeHighlightService,
  SupportedLanguage,
} from '../../../core/services/code-highlight.service';
import { CopyButtonComponent } from '../copy-button/copy-button.component';

/**
 * Fragmento de código con su lenguaje
 */
export interface CodeSnippet {
  language: SupportedLanguage;
  label: string;
  code: string;
}

/**
 * Componente para visualizar código con tabs, syntax highlighting y botón de copiar
 * Soporta múltiples fragmentos de código (HTML, TS, SCSS)
 */
@Component({
  selector: 'app-code-viewer',
  standalone: true,
  imports: [MatTabsModule, CopyButtonComponent, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-viewer">
      <mat-tab-group
        [selectedIndex]="selectedTab()"
        (selectedIndexChange)="selectedTab.set($event)"
        class="code-tabs"
      >
        @for (snippet of snippets(); track snippet.label) {
          <mat-tab [label]="snippet.label">
            <div class="code-container">
              <div class="code-header">
                <span class="language-badge">{{ snippet.language | uppercase }}</span>
                <app-copy-button [textToCopy]="snippet.code" />
              </div>
              <pre
                class="code-block"
              ><code [innerHTML]="highlightedCode()[snippet.label]"></code></pre>
            </div>
          </mat-tab>
        }
      </mat-tab-group>
    </div>
  `,
  styles: `
    .code-viewer {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--sys-outline-variant);
      background: var(--sys-surface-container);
    }

    .code-tabs {
      ::ng-deep .mat-mdc-tab-header {
        background: var(--sys-surface-container-high);
        border-bottom: 1px solid var(--sys-outline-variant);
      }

      ::ng-deep .mat-mdc-tab-body-wrapper {
        background: var(--sys-surface-container-lowest);
      }
    }

    .code-container {
      position: relative;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      background: var(--sys-surface-container);
      border-bottom: 1px solid var(--sys-outline-variant);
    }

    .language-badge {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--sys-on-surface-variant);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .code-block {
      margin: 0;
      padding: 16px;
      overflow-x: auto;
      font-family: 'Roboto Mono', 'Consolas', 'Monaco', monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      tab-size: 2;
      color: var(--sys-on-surface);

      code {
        display: block;
        white-space: pre;
      }

      /* Syntax highlighting classes */
      :deep(.code-keyword) {
        color: var(--sys-primary);
        font-weight: 500;
      }

      :deep(.code-string) {
        color: var(--sys-tertiary);
      }

      :deep(.code-comment) {
        color: var(--sys-outline);
        font-style: italic;
      }

      :deep(.code-decorator) {
        color: var(--sys-secondary);
      }

      :deep(.code-type) {
        color: var(--sys-primary);
      }

      :deep(.code-number) {
        color: var(--sys-error);
      }

      :deep(.code-tag) {
        color: var(--sys-primary);
      }

      :deep(.code-attribute) {
        color: var(--sys-secondary);
      }

      :deep(.code-binding) {
        color: var(--sys-tertiary);
        font-weight: 500;
      }

      :deep(.code-variable) {
        color: var(--sys-secondary);
      }

      :deep(.code-selector) {
        color: var(--sys-primary);
      }

      :deep(.code-atrule) {
        color: var(--sys-tertiary);
        font-weight: 500;
      }
    }
  `,
})
export class CodeViewerComponent {
  private readonly highlightService = inject(CodeHighlightService);

  /** Fragmentos de código a mostrar */
  readonly snippets = input.required<CodeSnippet[]>();

  /** Tab seleccionado */
  readonly selectedTab = signal(0);

  /** Código resaltado por label */
  readonly highlightedCode = computed(() => {
    const result: Record<string, string> = {};
    for (const snippet of this.snippets()) {
      result[snippet.label] = this.highlightService.highlight(snippet.code, {
        language: snippet.language,
        showLineNumbers: false,
      });
    }
    return result;
  });
}
