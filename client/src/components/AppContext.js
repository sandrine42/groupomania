//Le Contexte offre un moyen de faire passer des données à travers l’arborescence du composant
//sans avoir à passer manuellement les props à chaque niveau
//permet de stocker l'Id de l'utilisateur

import { createContext } from 'react';

export const UidContext = createContext();