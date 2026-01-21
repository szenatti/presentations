## Data source instructions
### 1) What each row represents (grain)
- One row = one monthly aggregate for a specific:
  - Route (Departing_Port → Arriving_Port)
  - Airline (including “All Airlines”)
  - Month/Year (Year + Month_Num; Month is a label)

### 2) Core concepts and how to interpret them
- “Sectors” represent flight legs (route segments).
- Counts in this dataset are aggregated totals for the month; they are not individual flight records.
- Use Year + Month_Num for time analysis. Treat Month (e.g., “Jan-04”) as a label only.

### 3) Column guidance (how the agent should use each field)
Dimensions
- Route: Human-readable route label; use for filtering and display.
- Departing_Port: Origin airport/port; use for grouping by origin.
- Arriving_Port: Destination airport/port; use for grouping by destination.
- Airline: Airline name; includes “All Airlines” which is already an aggregate.
- Year: Calendar year for the record.
- Month_Num: Calendar month number (1–12).
- Month: Text month label; use for display, not for sorting or date calculations.

Volumes and operational outcomes
- Sectors_Scheduled: Number of scheduled sectors for that route/airline/month.
- Sectors_Flown: Number of sectors actually operated (flown) for that route/airline/month.
- Cancellations: Number of scheduled sectors that did not operate (cancelled).

Punctuality counts
- Departures_On_Time: Count of sectors that departed on time.
- Arrivals_On_Time: Count of sectors that arrived on time.
- Departures_Delayed: Count of sectors that departed late.
- Arrivals_Delayed: Count of sectors that arrived late.

### 4) Denominators and rate calculations (critical)
When answering questions, always use the correct denominator:
- Cancellation rate uses scheduled sectors:
  - Cancellation Rate = Cancellations / Sectors_Scheduled
- On-time and delay performance use flown sectors:
  - Departure On-Time % = Departures_On_Time / Sectors_Flown
  - Arrival On-Time % = Arrivals_On_Time / Sectors_Flown
  - Departure Delay % = Departures_Delayed / Sectors_Flown
  - Arrival Delay % = Arrivals_Delayed / Sectors_Flown
- Completion rate:
  - Completion Rate = Sectors_Flown / Sectors_Scheduled

Always apply safe division:
- If the denominator is 0 or null, return null/blank rather than an error.

### 5) Aggregation rules (avoid common mistakes)
- Do not sum “All Airlines” with airline-specific rows. “All Airlines” is an aggregate category.
- If the dataset includes a network total row (e.g., “All Ports–All Ports”), treat it as a summary line. Do not combine it with route-level totals unless explicitly labelling it as “network total”.
- When ranking “best/worst”, prefer percentage measures (rates) and optionally apply a minimum volume threshold (e.g., Sectors_Flown >= N) to avoid small-sample distortions.

### 6) Directionality and route pairing
Routes are directional (A→B is different from B→A). When comparing city pairs:
- Compare both directions separately first.
- If you need a combined “city pair” view, create a derived key that sorts the ports alphabetically (e.g., MIN(portA, portB) + “–” + MAX(portA, portB)) and aggregate carefully.

### 7) Time-series best practices
- Create a proper month date key:
  - MonthStartDate = DATE(Year, Month_Num, 1)
- Use MonthStartDate for sorting, trend lines, rolling averages, and period comparisons.
- For seasonality questions, compare Month_Num across years (e.g., all Januaries).

### 8) Recommended derived measures (ready for the agent to use)
Reliability
- Cancellation Rate (%)
- Completion Rate (%)

Punctuality
- Departure On-Time (%)
- Arrival On-Time (%)
- Departure Delay (%)
- Arrival Delay (%)

Operational insights
- On-Time Gap = Arrival On-Time % − Departure On-Time %
  - Positive: arrivals perform better than departures
  - Negative: arrivals perform worse than departures

Prioritisation (optional scoring for ranking)
- Composite Impact Score (example):
  - Score = (Cancellation Rate * W1) + (Arrival Delay % * W2) + (Departure Delay % * W3)
  - Choose weights so cancellations have the highest impact if the goal is reliability.

### 9) Data validation checks (useful for trust and troubleshooting)
- Check that scheduled sectors approximately reconcile:
  - Sectors_Scheduled ≈ Sectors_Flown + Cancellations
- Check that flown sectors reconcile with punctuality counts:
  - Sectors_Flown ≈ Departures_On_Time + Departures_Delayed
  - Sectors_Flown ≈ Arrivals_On_Time + Arrivals_Delayed
If mismatches exist, treat them as data quality issues or definitional differences and call them out in the response.

### 10) Example question patterns the agent should support
- Rankings:
  - “Top 10 routes by cancellation rate in 2004”
  - “Worst arrival on-time % routes last year (min 100 sectors flown/month)”
- Trends:
  - “Trend of arrival on-time % for Adelaide→Perth over time”
  - “Seasonality: which month has the worst cancellation rate historically?”
- Comparisons:
  - “Compare Perth→Sydney vs Sydney→Perth on-time and cancellations”
  - “Which departing ports have the worst departure on-time %?”
- Anomalies:
  - “Flag routes where cancellations were 2x higher than their 12-month average”
  - “Identify months where arrival delays spiked unusually for a major route”

### 11) Response style expectations (how to present results)
- When asked “best/worst”, provide:
  - The metric definition used
  - A ranked list with values and volumes (e.g., sectors flown)
  - A short explanation of drivers (cancellations vs delays)
- When asked “over time”, provide:
  - A time series by MonthStartDate with key metrics
  - A summary of trend direction and notable outliers