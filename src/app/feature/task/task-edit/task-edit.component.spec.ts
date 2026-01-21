import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskEditComponent } from './task-edit.component';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    component.title = 'Tâche initiale';
    component.taskId = 1;
    fixture.detectChanges();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it('devrait émettre onSave avec les bonnes données', () => {
    // ARRANGE : Espionner l'événement @Output
    let savedData: any;
    component.onSave.subscribe((data) => {
      savedData = data;
    });

    // ACT : Appeler la méthode save
    component.save('Nouvelle tâche');

    // ASSERT : Vérifier les données émises
    expect(savedData.id).toBe(1);
    expect(savedData.title).toBe('Nouvelle tâche');
  });

  it('devrait émettre onCancel quand on annule', () => {
    // ARRANGE : Espionner l'événement @Output
    let cancelled = false;
    component.onCancel.subscribe(() => {
      cancelled = true;
    });

    // ACT : Appeler la méthode cancel
    component.cancel();

    // ASSERT : Vérifier que l'événement a été émis
    expect(cancelled).toBe(true);
  });

  it('ne devrait pas émettre onSave si le titre est vide', () => {
    // ARRANGE
    let emitted = false;
    component.onSave.subscribe(() => {
      emitted = true;
    });

    // ACT : Titre vide (espaces)
    component.save('   ');

    // ASSERT
    expect(emitted).toBe(false);
  });

  it('devrait avoir les bonnes valeurs @Input par défaut', () => {
    // ARRANGE & ACT
    const newComponent = new TaskEditComponent();

    // ASSERT
    expect(newComponent.title).toBe('');
    expect(newComponent.taskId).toBe(0);
  });

  it('devrait émettre onSave avec les bonnes données depuis le template', () => {
    // ARRANGE
    let savedData: any;
    component.onSave.subscribe((data) => {
      savedData = data;
    });

    // Modifier le titre à travers l'input (simulation)
    component.title = 'Tâche modifiée';
    component.taskId = 5;
    fixture.detectChanges();

    // ACT
    component.save('Tâche finale');

    // ASSERT
    expect(savedData.id).toBe(5);
    expect(savedData.title).toBe('Tâche finale');
  });

  it('ne devrait pas émettre onSave avec un titre contenant seulement des espaces', () => {
    // ARRANGE
    let emitted = false;
    component.onSave.subscribe(() => {
      emitted = true;
    });

    // ACT - Plusieurs cas de titre vide
    component.save('');
    expect(emitted).toBe(false);

    component.save('   ');
    expect(emitted).toBe(false);

    component.save('\t\n');
    expect(emitted).toBe(false);
  });
});
