import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPageComponent } from './tasks-page.component';
import { TaskService, Task } from '../services/task.service';
import { BehaviorSubject } from 'rxjs';

// 🎭 1️⃣ CRÉER LE MOCK (fausse version du service)
class MockTaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string): void {
    const newTask: Task = { 
      id: Math.random(), 
      title, 
      completed: false 
    };
    const tasks = this.tasksSubject.value;
    this.tasksSubject.next([...tasks, newTask]);
  }

  deleteTask(id: number): void {
    const tasks = this.tasksSubject.value.filter(task => task.id !== id);
    this.tasksSubject.next(tasks);
  }

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }
}

describe('TasksPageComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPageComponent],
      providers: [TaskService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('TasksPageComponent avec Mock', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;
  let mockService: MockTaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPageComponent],
      providers: [
        // 🎭 2️⃣ UTILISER LE MOCK au lieu du vrai service
        { provide: TaskService, useClass: MockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(TaskService) as any;
    fixture.detectChanges();
  });

  it('devrait utiliser le mock pour ajouter une tâche', (done) => {
    // ACT : On fixe le signal et on appelle la méthode du composant
    component.newTaskTitle.set('Tâche mockée');
    component.addTask();

    // ASSERT : Le mock a bien simulé l'ajout
    mockService.tasks$.subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Tâche mockée');
      expect(tasks[0].completed).toBe(false);
      done();
    });
  });

  it('devrait supprimer une tâche avec le mock', (done) => {
    // ARRANGE
    component.newTaskTitle.set('Tâche à supprimer');
    component.addTask();
    
    mockService.tasks$.subscribe((tasks: Task[]) => {
      if (tasks.length === 1) {
        // ACT
        const taskId = tasks[0].id as number;
        component.deleteTask(taskId);

        // ASSERT
        mockService.tasks$.subscribe((updatedTasks: Task[]) => {
          if (updatedTasks.length === 0) {
            expect(updatedTasks.length).toBe(0);
            done();
          }
        });
      }
    });
  });

  it('devrait afficher les tâches du mock dans le template', (done) => {
    // ARRANGE
    component.newTaskTitle.set('Tâche 1');
    component.addTask();
    component.newTaskTitle.set('Tâche 2');
    component.addTask();

    // ACT & ASSERT
    component.tasks$.subscribe((tasks: Task[]) => {
      if (tasks.length === 2) {
        expect(tasks.length).toBe(2);
        expect(tasks[0].title).toBe('Tâche 1');
        expect(tasks[1].title).toBe('Tâche 2');
        done();
      }
    });
  });
});
