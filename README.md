# Logique réactive du flux de données

Utilisation de BehavioSubsject (défini dans # Point clés retenus ) ainsi que la variable tasks qui est abonnées au flux

# Mise à jour des données

Dans home.component la méthode addTask appel addTask de TaskService qui vas mettre à jour la liste puis avec la fonction next() met la liste à jour et la vue mise à jour

# Point clés retenus :

next() --> permet de mettre automatiquement l'élement concerner à jour

signe "$" --> convention utilisé pour l'utilisation des observable

BehavioSubsject --> permet de stocker l'état courant d'une valeur & de la retourner au abonnés