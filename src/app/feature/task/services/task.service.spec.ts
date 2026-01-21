import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    service.clearTasks();  // État propre
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devrait ajouter une tâche', () => {
    service.addTask('Apprendre les tests');
    
    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Apprendre les tests');
    expect(tasks[0].completed).toBe(false);
  });

  it('devrait supprimer une tâche', () => {
    service.addTask('Tâche temporaire');
    const taskId = service.getTasks()[0].id;
    
    service.deleteTask(taskId);
    
    expect(service.getTasks().length).toBe(0);
  });

  it('devrait marquer une tâche comme terminée', () => {
    service.addTask('Tâche à terminer');
    const taskId = service.getTasks()[0].id;
    
    service.toggleTask(taskId);
    
    const task = service.getTasks()[0];
    expect(task.completed).toBe(true);
  });

  it('devrait nettoyer les tâches', () => {
    service.addTask('Tâche 1');
    service.addTask('Tâche 2');
    
    service.clearTasks();
    
    expect(service.getTasks().length).toBe(0);
  });
});
