#!/bin/bash

# Chemin vers le fichier config.js
CONFIG_FILE="public/config.js"

# Commence à écrire dans le fichier config.js
echo "export default {" > $CONFIG_FILE

# Parcourt toutes les variables d'environnement
for var in $(printenv | awk -F= '{print $1}')
do
  # Récupère la valeur de la variable d'environnement
  value=$(printenv $var)

  # Écrit la variable et sa valeur dans config.js
  echo "  $var: \"$value\"," >> $CONFIG_FILE
done

# Termine le fichier config.js
echo "}" >> $CONFIG_FILE

echo "Fichier $CONFIG_FILE généré avec succès."