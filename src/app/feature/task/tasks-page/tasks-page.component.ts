import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export class TasksPageComponent {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
  
  // Compteur et progression
  taskCount$ = this.tasks$.pipe(map(tasks => tasks.length));
  completedCount$ = this.tasks$.pipe(map(tasks => tasks.filter(t => t.completed).length));
  progressPercent$ = this.tasks$.pipe(
    map(tasks => tasks.length === 0 ? 0 : Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100))
  );

  // Signaux pour la saisie
  newTaskTitle = signal('');
  editingId = signal<number | null>(null);
  editingTitle = signal('');
  inputError = signal(false);

  addTask(): void {
    const title = this.newTaskTitle().trim();
    if (title) {
      this.taskService.addTask(title);
      this.newTaskTitle.set('');
      this.inputError.set(false);
    } else {
      this.inputError.set(true);
      setTimeout(() => this.inputError.set(false), 600);
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  startEdit(id: number, currentTitle: string): void {
    this.editingId.set(id);
    this.editingTitle.set(currentTitle);
  }

  saveEdit(id: number): void {
    const newTitle = this.editingTitle().trim();
    if (newTitle && newTitle !== this.editingTitle()) {
      // On peut ajouter une méthode updateTask au service si besoin
      // Pour maintenant, on peut juste fermer l'édition
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editingTitle.set('');
  }
}
