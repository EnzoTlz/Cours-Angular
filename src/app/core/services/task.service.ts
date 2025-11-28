import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasks = [
    { id : 1, title: 'step 1'},
    { id : 2, title: 'step 2'},
    { id : 3, title: 'step 3'}
  ];
  private lastId = 3;

  private tasksSubsject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubsject.asObservable();

  addTask(title: string){
    const newTasks = { id: ++this.lastId,title};
    this.tasks = [...this.tasks, newTasks];
    this.tasksSubsject.next(this.tasks);
  }

}
