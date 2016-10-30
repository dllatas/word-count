# Front-end assignment

_Dealing with log data is similar to the saying: "you can't see the forest for all the trees"._

The premise for this task is that the front-end receives an aggregated word count at fixed time intervals. The word counts are simply a JSON list of unique words and how many times each occurred during this interval - the count is reset after each broadcast.

Your task is to create a single-page application that visualizes this data in real-time, while preserving its history (since page load). Exactly how the realtime & historical data is visualized and navigated is completely up to you, but the focus should be on how common/uncommon words are. You basically have free reign of the libraries and methods you use, except for a few requirements. After all, the purpose of this test is to determine your creativity, technical know how and possibly your design abilities - depending on the particular skillset we're hiring you for.

So - feel free to build the application as you wish, as long as the end result is in the `/www` folder.

## Requirements

- SPA (single-page application)
- Socket.IO for the incoming data (WebSocket connection only)
- React.js for UI
- Documentation covering installation, usage, thoughts, decisions, motivations, etc.

## Qualities we assess

- Technical grasp
- Creativity in design
- Performance: memory/CPU footprint (Feel free to increase the frequency and batch-size of the service broadcasting to test this for yourself during development.)

