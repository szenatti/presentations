# Flight Performance Dataset — Demo Question Bank

## 1) Reliability & cancellations

### Example questions
- Which **routes** had the **highest cancellation rate** in a given month/year?
- How did the **cancellation rate trend** over time for a specific route (e.g., Adelaide–Perth)?
- Are cancellations **worse in certain months** (seasonality)? Show the top 3 months by cancellation rate.
- Compare **cancellations by departing port**: which airports have the worst cancellation rates?

---

## 2) On-time performance (departures vs arrivals)

### Example questions
- Which routes have the **best / worst departure on-time %**?
- Which routes have the biggest **gap between departure and arrival on-time %**?
- For a given port (e.g., Brisbane), are **departures** more on-time than **arrivals**?

---

## 3) Delay analysis (frequency and hotspots)

### Example questions
- What are the **top 10 routes by delayed departures count** in 2004?
- Which ports contribute most to delayed arrivals?
- For each route, what is the **delay share**, and how does it change over time?

---

## 4) Directionality & asymmetry (A→B vs B→A)

Because you have both directions (e.g., Adelaide–Brisbane and Brisbane–Adelaide):

### Example questions
- Is on-time performance **worse in one direction** than the other?
- Which route pairs show the **largest asymmetry** in cancellation rate?
- For a given city pair, does **arrival on-time %** differ materially by direction?

---

## 5) Seasonality & trend stories

### Example questions
- Show the **trend of on-time % over years** for the top 5 busiest routes.
- Identify routes with **improving** on-time performance over time (and those deteriorating).
- Which months have the **highest overall network delays** using “All Ports–All Ports”?

---

## 6) Volume & network concentration

### Example questions
- What are the **busiest routes** by sectors flown?
- How concentrated is traffic — do the top 10 routes account for what % of total flown sectors?
- Which ports have the highest total scheduled sectors?

---

## 7) Anomaly / outlier detection (great “wow” moments)

### Example questions
- Detect months where a route’s cancellation rate is **2x its normal** level.
- Flag routes where arrival delays spike unusually vs the prior 12-month average.
- Identify routes where scheduled sectors jump significantly month-to-month.

---

## 8) Executive summary questions (Agent-friendly)

### Example questions
- Summarise network performance for **Jan-2004**: cancellation rate, departure on-time %, arrival on-time %.
- Give me the **top 5 worst routes** and **top 5 best routes** for arrival on-time % last quarter.
- Which ports should we prioritise, based on combined delays + cancellations?

---

## 9) Comparison questions (very natural in chat)

### Example questions
- Compare **two routes** side-by-side across time (e.g., Adelaide–Perth vs Adelaide–Sydney).
- Compare **two ports** (Perth vs Sydney) for departure on-time % and cancellation rate.
- Compare “All Airlines” vs a specific airline (if you add airline-specific rows later).

---

## 10) Data quality & integrity checks (governance angle)

### Example questions
- Are there rows where `Sectors_Flown + Cancellations ≠ Sectors_Scheduled`?
- Are there routes where `Departures_On_Time + Departures_Delayed ≠ Sectors_Flown`?
- Do we have missing months for major routes?

---

# 12 ready-to-use demo prompts (copy/paste)

1. “Show the top 10 routes by cancellation rate in **Jan 2004**.”
2. “For **Adelaide–Perth**, chart cancellation rate and arrival on-time % over time.”
3. “Which routes have arrival on-time % below 80% but high volume (top quartile of flown sectors)?”
4. “Compare **Adelaide–Brisbane vs Brisbane–Adelaide**: which direction performs worse and when?”
5. “Which departing port has the worst departure on-time % across all routes in 2004?”
6. “List the 5 routes with the biggest gap between departure and arrival on-time % in 2004.”
7. “What month has the highest overall network cancellation rate using **All Ports–All Ports**?”
8. “Show the busiest routes by sectors flown, and their arrival on-time %.”
9. “Find anomalies: routes where cancellations spiked >2x their 12-month average.”
10. “Create a ranked list of ports to prioritise, using a score combining delays + cancellations.”
11. “Does on-time performance improve or worsen over years? Show a trend for the top 5 routes.”
12. “Check for any data consistency issues where totals don’t reconcile.”