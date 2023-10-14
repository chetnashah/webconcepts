## API Chaining

May functions return `this` to ease the API chaining part.


## Request interface

```ts
    interface Request extends Promise<Response> {
        abort(): void;
        accept(type: string): this;
        attach(
            field: string,
            file: MultipartValueSingle,
            options?: string | { filename?: string | undefined; contentType?: string | undefined },
        ): this;
        auth(user: string, pass: string, options?: { type: "basic" | "auto" }): this;
        auth(token: string, options: { type: "bearer" }): this;
        buffer(val?: boolean): this;
        ca(cert: string | string[] | Buffer | Buffer[]): this;
        cert(cert: string | string[] | Buffer | Buffer[]): this;
        clearTimeout(): this;
        connect(override: string | { [hostname: string]: false | string | { host: string; port: number } }): this;
        disableTLSCerts(): this;
        end(callback?: CallbackHandler): void;
        field(name: string, val: MultipartValue): this;
        field(fields: { [fieldName: string]: MultipartValue }): this;
        get(field: string): string;
        http2(enable?: boolean): this;
        key(cert: string | string[] | Buffer | Buffer[]): this;
        ok(callback: (res: Response) => boolean): this;
        on(name: "error", handler: (err: any) => void): this;
        on(name: "progress", handler: (event: ProgressEvent) => void): this;
        on(name: "response", handler: (response: Response) => void): this;
        on(name: string, handler: (event: any) => void): this;
        parse(parser: Parser): this;
        part(): this;
        pfx(cert: string | string[] | Buffer | Buffer[] | { pfx: string | Buffer; passphrase: string }): this;
        pipe(stream: NodeJS.WritableStream, options?: object): stream.Writable;
        query(val: object | string): this;
        redirects(n: number): this;
        responseType(type: string): this;
        retry(count?: number, callback?: CallbackHandler): this;
        send(data?: string | object): this;
        serialize(serializer: Serializer): this;
        set(field: object): this;
        set(field: string, val: string): this;
        set(field: "Cookie", val: string[]): this;
        timeout(ms: number | { deadline?: number | undefined; response?: number | undefined }): this;
        trustLocalhost(enabled?: boolean): this;
        type(val: string): this;
        unset(field: string): this;
        use(fn: Plugin): this;
        withCredentials(on?: boolean): this;
        write(data: string | Buffer, encoding?: string): boolean;
        maxResponseSize(size: number): this;
    }
```