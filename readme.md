Commencez deja par cloner le repertoire et ensuite faire un npm install pour installer toutes les dependances
Les packages les plus important de ce projet sont
- openai
- Tesseract

* Openai est utiliser a partir de la librairie Langchain pour faire des embedds et ensuite des prompts sur le texte (mais cette fonctionnalité n'est pas encore terminéé)
* Tesseract va permettre de faire l'OCR avec Javascript parce que la librairie Langchain ne propose pas de methode pour l'OCR

## Fonctionnement de l'application

Rendez vous dans le fichier `index.js.` Il existe deux routes, une roite en get et une en post. C'et le post qui va nous interesser pour l'instant.
La route /upload-file va nous permettre de pouvoir uploadé un fichier image qui contient du texte.
une fois le fichier uploadé on va deja commencer par stocké l'image dans le dossier /uploads a la racine du projet ...

* il faut deja `modifier le chemin absolu` pour le stockage du fichier à la ligne 45 dans index.js

Ensuite on utilise la methode `recognize` de Tesseract pour reconnaitre le texte qui est sur l'image qui a été uploadé, ensuite on va utiliser une methode javascript pour retiré les caractères spéciaux contenu dans le texte qui à été recuperé et on l'affiche à la fin du process.


### ORACLEREVOLUTION
