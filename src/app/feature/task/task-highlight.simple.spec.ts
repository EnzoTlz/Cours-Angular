import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskHighlight } from './task-highlight';

describe('TaskHighlight', () => {
    
    // Tests simples sans TestBed
    it('devrait initialiser title avec une chaîne vide', () => {
        const component = new TaskHighlight();
        expect(component.title).toBe('');
    });

    it('devrait permettre de changer le titre', () => {
        const component = new TaskHighlight();
        component.title = 'Tâche en avant';
        expect(component.title).toBe('Tâche en avant');
    });

});

describe('TaskHighlight avec TestBed', () => {
    let component: TaskHighlight;
    let fixture: ComponentFixture<TaskHighlight>;

    beforeEach(async () => {
        // Configuration du module de test
        await TestBed.configureTestingModule({
            imports: [TaskHighlight]
        }).compileComponents();

        // Création du composant
        fixture = TestBed.createComponent(TaskHighlight);
        component = fixture.componentInstance;
    });

    it('devrait afficher le titre dans le DOM', () => {
        // ARRANGE : Définir le titre
        component.title = 'Ma tâche';
        
        fixture.detectChanges();

        // ASSERT : Vérifier le DOM
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('h2')?.textContent)
            .toContain('Ma tâche');
    });

    it('devrait mettre à jour le DOM quand le titre change', () => {
        // ARRANGE
        component.title = 'Première tâche';
        fixture.detectChanges();

        // ACT - Changer le titre
        component.title = 'Deuxième tâche';
        fixture.detectChanges();

        // ASSERT
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('h2')?.textContent)
            .toContain('Deuxième tâche');
    });

    it('devrait afficher une chaîne vide par défaut', () => {
        // ACT
        fixture.detectChanges();

        // ASSERT
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('h2')?.textContent).toBe('');
    });

});

describe('TaskHighlight Component avec @Input', () => {
    let component: TaskHighlight;
    let fixture: ComponentFixture<TaskHighlight>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskHighlight]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskHighlight);
        component = fixture.componentInstance;
    });

    it('devrait être créé', () => {
        expect(component).toBeTruthy();
    });

    it('devrait afficher le titre passé en @Input', () => {
        // ARRANGE : Définir la valeur de @Input
        component.title = 'Apprendre Angular';
        
        // ACT : Déclencher la détection de changements
        fixture.detectChanges();
        
        // ASSERT : Vérifier que le titre s'affiche
        const element = fixture.nativeElement;
        const h2 = element.querySelector('h2');
        expect(h2.textContent).toBe('Apprendre Angular');
    });

    it('devrait avoir un titre vide par défaut', () => {
        expect(component.title).toBe('');
    });

    it('devrait afficher le header "Tâche mise en avant" toujours', () => {
        // ARRANGE
        fixture.detectChanges();

        // ASSERT
        const element = fixture.nativeElement;
        const h3 = element.querySelector('h3');
        expect(h3?.textContent).toBe('Tâche mise en avant');
    });

    it('devrait mettre à jour le titre dans le DOM quand @Input change', () => {
        // ARRANGE
        component.title = 'Tâche 1';
        fixture.detectChanges();
        
        let h2 = fixture.nativeElement.querySelector('h2');
        expect(h2.textContent).toBe('Tâche 1');

        // ACT : Changer la valeur de @Input
        component.title = 'Tâche 2';
        fixture.detectChanges();

        // ASSERT
        h2 = fixture.nativeElement.querySelector('h2');
        expect(h2.textContent).toBe('Tâche 2');
    });

    it('devrait supporter des titres longs', () => {
        // ARRANGE
        const longTitle = 'Ceci est une très longue tâche qui doit être mise en avant';
        component.title = longTitle;
        
        // ACT
        fixture.detectChanges();

        // ASSERT
        const element = fixture.nativeElement;
        const h2 = element.querySelector('h2');
        expect(h2.textContent).toBe(longTitle);
    });
});
