## Séquence 4 — Tests Unitaires Angular

### 📚 Ce que j'ai appris

#### 1. Pourquoi tester ?
- Les tests permettent de **vérifier que le code fonctionne comme prévu** et de détecter les régressions rapidement
- Sans tests, le risque est de **déployer des bugs en production** et de perdre beaucoup de temps en débogage manuel
- Exemple concret : Quand j'ai modifié le service TaskService, les tests m'ont immédiatement alerté que j'avais cassé la méthode `deleteTask()`. Sans tests, ce bug aurait atteint la production!

#### 2. Outils utilisés
- **Jasmine** : Framework de test qui fournit la syntaxe `describe()`, `it()`, `expect()` pour écrire les assertions
- **Karma** : Test runner qui exécute les tests dans un navigateur réel (Chrome) et rapporte les résultats
- **TestBed** : Utilitaire Angular qui crée un environnement de test configuré avec dépendances et providers

#### 3. Concepts clés maîtrisés
- **AAA Pattern** : 
  - **Arrange** : Préparer les données et l'état initial
  - **Act** : Exécuter l'action à tester
  - **Assert** : Vérifier que le résultat est correct
- **Mocks** : Versions simulées de services pour tester un composant isolément. Exemple : MockTaskService remplace TaskService réel pour ne tester que le composant

#### 4. Types de tests pratiqués
- ✅ Test d'une classe simple (TaskHighlight - instantiation directe)
- ✅ Test d'un service (TaskService avec TestBed, getTasks(), addTask())
- ✅ Test d'un composant avec TestBed (TasksPageComponent avec provider)
- ✅ Test des @Input (TaskHighlight reçoit title et l'affiche)
- ✅ Test des @Output (TaskEditComponent émet onSave et onCancel)
- ✅ Test du DOM (querySelector pour vérifier le rendu HTML)

#### 5. Erreurs courantes rencontrées

Oublier `detectChanges()` Le DOM n'est pas mis à jour, le test trouve `undefined` Appeler `fixture.detectChanges()` après chaque modification 
`NullInjectorError: No provider for TaskService` Le composant ne peut pas injecter le service Ajouter le service dans `providers: [TaskService]` du TestBed 
Tests qui dépendent les uns des autres Un test échoue d'autres tests échouent aussi Utiliser `beforeEach()` pour réinitialiser l'état avant chaque test 
Import path ends with '.ts' Erreur de compilation TypeScript Retirer l'extension `.ts` des imports: `from './file'` pas `from './file.ts'` 

#### 6. Commandes importantes
ng test                           
ng test --code-coverage         
ng test --code-coverage --watch=false

#### 7. Code Coverage atteint
- Objectif recommandé : 70-80%
- **Mon résultat : 100% Statements, 100% Functions, 100% Lines, 66.66% Branches** 

#### 8. Difficultés rencontrées et solutions
Je n'ai pas eu de difficulté particulière avec le TP, nous étions bien guidés.

#### 9. Points à approfondir
- Tests d'intégration (plusieurs composants ensemble)


#### Tests implémentés
- TaskService
  -  `addTask()` - ajoute une tâche
  -  `deleteTask()` - supprime une tâche
  -  `toggleTask()` - marque comme terminée
  -  `getTasks()` - retourne la liste
  -  `clearTasks()` - vide la liste
- TaskHighlight Component
  -  Classe simple (instantiation directe)
  -  @Input title
  -  Rendu dans le DOM
  -  Mise à jour du DOM quand @Input change
- TasksPageComponent
  -  Création du composant
  -  Test avec service réel
  -  Test avec Mock Service
- TaskEditComponent
  -  @Output onSave émis
  -  @Output onCancel émis
  -  Validation du titre (pas d'émission si vide)
- AppComponent
  -  provideRouter pour tests
  -  Vérification du template
- HeaderComponent
  -  Router links testés

#### Résultats finaux
- **Tests réussis** : 33 / 33 
- **Code coverage** : 
  - Statements: 100%
  - Functions: 100%
  - Lines: 100%
  - Branches: 66.66%
- **Temps d'exécution** : 0.131 secondes

### 💡 Réflexion personnelle

 Avant, je pensais que les tests c'était "une perte de temps", mais maintenant je comprends que c'est "un investissement qui épargne du temps à long terme". 

La première fois que un test m'a attrapé un bug que je n'aurais jamais trouvé manuellement, j'ai réalisé l'importance. Le concept du Mock a été particulièrement illuminant - pouvoir tester un composant indépendamment de ses dépendances c'est puissant.

