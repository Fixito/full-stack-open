# Exercice 1

Si on se concentre sur le développement d'une application en React pour une équipe de six personnes, voici un texte adapté pour ton fichier exercise1.md, en français :

Lors de la mise en place d'un pipeline CI/CD pour une application développée en React par une équipe de six personnes, il est crucial de sélectionner des outils appropriés à chaque étape du processus. Pour la linting, ESLint est largement utilisé dans la communauté React pour identifier les patterns problématiques dans le code JavaScript/JSX. Il aide à maintenir un code propre et conforme aux bonnes pratiques.

En ce qui concerne le testing, Jest, couplé avec React Testing Library, est préféré pour tester les applications React. Jest offre une configuration simple pour tester le JavaScript, tandis que React Testing Library permet de tester les composants React de manière plus fidèle à leur utilisation dans un navigateur, en se concentrant sur leur comportement plutôt que sur leurs détails d'implémentation.

Pour la construction (ou le bundling), Webpack est souvent choisi pour ses capacités robustes et sa flexibilité. Il permet de préparer les bundles de l'application, en optimisant les ressources comme le JavaScript, les CSS et les images pour la production.

Au-delà de Jenkins et GitHub Actions, il existe plusieurs alternatives pour la mise en place de CI. GitLab CI/CD offre une solution intégrée dans GitLab, avec une configuration aisée via un fichier .gitlab-ci.yml. CircleCI est une autre option populaire, appréciée pour sa rapidité et sa capacité de personnalisation. Travis CI est également un choix fiable, surtout pour les projets open source.

Le choix entre un environnement auto-hébergé ou basé sur le cloud pour le CI/CD dépend de divers facteurs. Un environnement cloud, comme AWS CodeBuild ou Google Cloud Build, peut fournir une plus grande échelle et flexibilité, idéales pour des équipes en développement rapide. Cependant, un environnement auto-hébergé pourrait être préféré pour des raisons de conformité, de sécurité, ou pour un contrôle total sur les ressources. Cette décision nécessite une évaluation des besoins spécifiques de l'équipe en termes de confidentialité, coûts et complexité de l'infrastructure.
