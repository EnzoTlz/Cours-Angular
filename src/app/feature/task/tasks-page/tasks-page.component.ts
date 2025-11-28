import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css'
})

export class TasksPageComponent {
  taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
  count = 0;
  intervalId: any;

  addTask(title: string){
    this.taskService.addTask(title);
  }

}