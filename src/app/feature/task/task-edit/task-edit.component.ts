import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-edit">
      <h3>Éditer la tâche</h3>
      <input #editInput [value]="title" />
      <button (click)="save(editInput.value)">Sauvegarder</button>
      <button (click)="cancel()">Annuler</button>
    </div>
  `
})
export class TaskEditComponent {
  @Input() title = '';
  @Input() taskId = 0;
  @Output() onSave = new EventEmitter<{id: number, title: string}>();
  @Output() onCancel = new EventEmitter<void>();

  save(newTitle: string) {
    if (newTitle.trim()) {
      this.onSave.emit({ id: this.taskId, title: newTitle });
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
