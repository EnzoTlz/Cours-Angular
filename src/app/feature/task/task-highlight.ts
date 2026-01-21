import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="task-highlight">
      <h3>Tâche mise en avant</h3>
      <h2>{{ title }}</h2>
    </div>
  `
})
export class TaskHighlight {
  @Input() title: string = '';
}
