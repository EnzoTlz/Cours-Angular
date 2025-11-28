import { Component, inject } from '@angular/core';
import { TaskService } from '../core/services/task.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
  count = 0;
  intervalId: any;

  addTask(title: string){
    this.taskService.addTask(title);
  }

}