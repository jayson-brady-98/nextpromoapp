export function getPredictionLabel(yhat) {
  if (!yhat || yhat < 0.5) return null;
  
  if (yhat >= 0.7) {
    return "Very strong chance";
  } else if (yhat >= 0.6) {
    return "Strong chance"; 
  } else if (yhat >= 0.5) {
    return "Moderate chance";
  }
  
  return null;
}
