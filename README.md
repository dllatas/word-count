# Assignment

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
