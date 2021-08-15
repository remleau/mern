import { formatRelative, subDays } from "date-fns";
import { fr } from 'date-fns/locale';

export const formatDate = (date) => {
  if(date)
    return formatRelative(subDays(new Date(date), 0), new Date(), { locale: fr })

  return '-';
}

export const hasAllProperties = (obj, props) => {
  for (var i = 0; i < props.length; i++) {
    if (!obj.hasOwnProperty(props[i]))
      return false;
  }
  return true;
}