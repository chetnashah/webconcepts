
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

## Saving files with -O

You can let curl save the output to a file by adding the -O option. If you use the capital letter O, curl will save the output in a file with the same name as the remote file, i.e last name.

## Head inspect with -I

By specifying the -I or --head option, curl fetches only the HTTP header of the response, which allows you to inspect the status code and other information returned by the server




