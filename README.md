Saturn.io
=========

FYI, it's pretty hacky for now, but it theoretically works... or at least some features do.

Ignore the sidebar that shows up when you're not logged in. Log in first and then use it.

One important thing is to create the cron job tasks once you log in for the first time:

<table>
  <tr>
    <th>Controller</th><th>Method</th><th>Interval</th>
  </tr>
  <tr>
    <td>AnalysisController</td><td>analyze</td><td>10</td>
  </tr>
  <tr>
    <td>TwitterController</td><td>stream</td><td>10</td>
  </tr>
  <tr>
    <td>TopicController</td><td>analyze_trending</td><td>300</td>
  </tr>
</table>
