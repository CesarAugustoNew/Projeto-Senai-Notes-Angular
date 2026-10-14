import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { ThemeToggle } from '../../components/theme-toggle/theme-toggle';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../toast/toast.service';

interface CreateUserResponse {
  [key: string]: unknown;
}

// Validador do formulário inteiro: compara senha e confirmação.
function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ThemeToggle],
  templateUrl: './new-user-screen.html',
  styleUrls: ['./new-user-screen.css']
})
export class NewUserScreen {
  form: FormGroup;

  // Signal pelo mesmo motivo do login: garante que a UI (botão)
  // reflita corretamente o estado depois de um `await`, mesmo com
  // provideZonelessChangeDetection() habilitado no app.
  isSubmitting = signal(false);

  // Fica true quando a API demora mais de 4s para responder
  // (ex.: Render "acordando" depois de ~15 min sem uso).
  isWakingUp = signal(false);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // Mesma regra do back-end (UsuarioRequest): mínimo 6 caracteres
      // e ao menos uma letra maiúscula — validar aqui já avisa o
      // usuário na hora, sem precisar esperar a resposta da API.
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.pattern(/[A-Z]/)]
      ],
      // Digitar a senha duas vezes evita criar a conta com um erro de digitação.
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordsMatch });
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }

  private mensagemDeErroDaSenha(): string | null {
    const senha = this.password;
    if (!senha || !senha.errors) return null;
    if (senha.errors['required']) return 'Informe uma senha.';
    if (senha.errors['minlength']) return 'A senha deve ter no mínimo 6 caracteres.';
    if (senha.errors['pattern']) return 'A senha deve ter ao menos uma letra maiúscula.';
    return null;
  }

  async onSignUpClick(): Promise<void> {
    if (!this.form.valid) {
      const erroSenha = this.mensagemDeErroDaSenha();
      const mensagem = erroSenha
        ?? (this.form.errors?.['passwordMismatch'] && this.confirmPassword?.value
          ? 'As senhas não coincidem.'
          : 'Preencha os campos corretamente.');
      this.toast.error(mensagem);
      this.form.markAllAsTouched();
      return;
    }

    if (this.isSubmitting()) {
      return;
    }

    const name = String(this.name?.value || '');
    const email = String(this.email?.value || '');
    const password = String(this.password?.value || '');

    this.isSubmitting.set(true);
    const wakeTimer = setTimeout(() => this.isWakingUp.set(true), 4000);

    try {
      await firstValueFrom(
        this.http.post<CreateUserResponse>(`${environment.apiUrl}/users`, { name, email, password })
          .pipe(timeout(60000))
      );

      this.toast.success('Usuário cadastrado com sucesso!');
      this.router.navigateByUrl('/login');
    } catch (error) {
      let message = 'Erro ao cadastrar o usuario, tente novamente.';

      if ((error as { name?: string })?.name === 'TimeoutError') {
        message = 'O servidor demorou demais para responder. Tente novamente em instantes.';
      } else {
        const httpError = error as HttpErrorResponse;
        // Erros de validação de campo (ex.: senha sem maiúscula) vêm em
        // "fields", não no "error" genérico — mostra o primeiro deles
        // quando existir, senão cai no "error" genérico (ex.: e-mail
        // duplicado, que já é uma mensagem pronta e específica).
        const fields = httpError?.error?.fields as Record<string, string> | undefined;
        const primeiroCampoComErro = fields ? Object.values(fields)[0] : undefined;

        if (primeiroCampoComErro) {
          message = primeiroCampoComErro;
        } else if (typeof httpError?.error?.error === 'string') {
          message = httpError.error.error;
        }
      }

      this.toast.error(message);
    } finally {
      clearTimeout(wakeTimer);
      this.isWakingUp.set(false);
      this.isSubmitting.set(false);
    }
  }
}
