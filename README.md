# Commandes utilisés :

ng new TaskBoard --routing --style=css                        
ng serve
ng g c header                                                     
ng g c home
ng g c about


# Routes fonctionnelles

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent }
];
