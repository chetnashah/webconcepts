## Managing parts of server state on the client

So it seems that we have always been treating this server state like any other client state. Except that when it comes to server state (think: A list of articles that you fetch, the details of a User you want to display, ...), your app does not own it. We have only borrowed it to display the most recent version of it on the screen for the user. It is the server who owns the data.

## embraces the stale-while-revalidate caching strategy.

## Can do retries for you
