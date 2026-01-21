import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'step 1', completed: false },
    { id: 2, title: 'step 2', completed: false },
    { id: 3, title: 'step 3', completed: false }
  ];
  private lastId = 3;

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string): void {
    const newTask: Task = { id: ++this.lastId, title, completed: false };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  clearTasks(): void {
    this.tasks = [];
    this.lastId = 0;
    this.tasksSubject.next([]);
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(this.tasks);
  }
}
