# Unomaly Hiring Assignment

- Your assignment can be found in [assignment.md](assignment.md).
- Include a `README` detailing if anything is needed to install/compile/test your code
- If completing the task demands too much of your time, we will gladly accept a partial delivery. We understand that life gets in the way.
- We encourage creativity in your solution and if you find any ambiguity in the instructions you are free to do as you see fit as long as you can provide good justifications for your choices. However, if you have any questions during your work, please don't hesitate to contact us.

## Whats in the box

A simple node-service that sets up an Express http-server (default port `8080`) for serving files and a socket.io WebSocket interface that broadcasts aggregated words at set time intervals.

There is also a very barebones index.html (in /www) that simply connects to said WebSocket on load and prints the incoming data in the browser console.

## Running it

1. Clone the repo
2. Do `npm install`
3. Edit `config.json` if needed
4. Do `npm start`

## Configuration

How to configure the service using `config.json`

- __port__: port used for the server
- __filename__: file to be processed for the dictionary
- __interval__: broadcast interval in seconds
- __batchSize__: array with min:max amount of words per batch
- __wordCount__: array with min:max count for word occurrence

## Broadcast data

```json
{
  "these": 2,
  "words": 5,
  "happened": 1
}
```
