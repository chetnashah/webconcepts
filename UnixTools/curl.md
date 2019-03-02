
Universal tool to make http requests

1. specify method with `-X`
2. specify headers with `-H`.
3. specify body with `-d`

e.g.
```sh
curl -X POST http://localhost:3000 -H 'Content-Type: application/json' -d '{"hello": "World"}'
```

**Note**: single quotes do not work on windows.
Instead one can write down body in text file and use @filename.txt for body.

e.g. on Windows
```cmd
curl -X POST http://localhost:3000 -H "Content-Type: application/json" -d @restdata.json
```

4. save the curl result to a file with `-o filename`.

5. follow redirects using `-L`.

6. show verbose data with `-vvv`

7. forms and files with curl:




