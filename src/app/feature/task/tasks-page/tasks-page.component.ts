import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})
export class TasksPageComponent {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;

  addTask(title: string): void {
    this.taskService.addTask(title);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}
