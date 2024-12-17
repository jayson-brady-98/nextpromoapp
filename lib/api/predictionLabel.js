export function getPredictionLabel(yhat) {
  if (!yhat || yhat < 0.3) return null;
  
  if (yhat >= 0.7) {
    return "Very Likely Sale";
  } else if (yhat >= 0.6) {
    return "Likely Sale"; 
  } else if (yhat >= 0.5) {
    return "Probable Sale";
  } else if (yhat >= 0.3) {
    return "Possible Sale";
  }
  return null;
}
