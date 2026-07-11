import { Injectable, effect, signal } from '@angular/core';

const STORAGE_KEY = 'theme';

/*
  Serviço simples de tema, compartilhado entre as telas de login,
  cadastro e notas.

  Usa um signal (em vez de uma propriedade comum) de propósito: este
  projeto roda com `provideZonelessChangeDetection()`, então mudanças
  de estado feitas fora de um evento do template (ex.: depois de um
  `await`) só dão retriggar a UI automaticamente quando passam por um
  signal, effect, async pipe etc. Um `effect` reage à mudança do
  signal e aplica a classe `dark-theme` no <html>, funcionando em
  qualquer uma das telas sem precisar duplicar lógica.
*/
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const dark = this.isDark();
      document.documentElement.classList.toggle('dark-theme', dark);
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.isDark.set(!this.isDark());
  }

  private getInitialTheme(): boolean {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
      return salvo === 'dark';
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }
}
