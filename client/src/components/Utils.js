//Fonction qui permet de traiter la date envoyer par createdAt (timestamp de mongoDB)

export const dateParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const timestampParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
}

// IsEmpty, fonction pour pour déterminer si une value vide ou pas en fonction des 4 conditions
//ci-dessous
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
