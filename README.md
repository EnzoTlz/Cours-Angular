## Sequence 5 - Optimisations

OnPush: Verification change detection seulement si @Input change
- TaskHighlight
- TaskEditComponent
- TasksPageComponent
- HeaderComponent

TrackBy: Dans le template pour optimiser les listes
- `@for (task of tasks; track task.id)`

Resultat: Performances nettement ameliorees 