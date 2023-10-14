
## Response interface

```ts
    interface Response extends NodeJS.ReadableStream {
        accepted: boolean;
        badRequest: boolean;
        body: any;
        charset: string;
        clientError: boolean;
        error: false | HTTPError;
        files: any;
        forbidden: boolean;
        get(header: string): string;
        get(header: "Set-Cookie"): string[];
        header: any;
        headers: any;
        info: boolean;
        links: Record<string, string>;
        noContent: boolean;
        notAcceptable: boolean;
        notFound: boolean;
        ok: boolean;
        redirect: boolean;
        serverError: boolean;
        status: number;
        statusCode: number;
        statusType: number;
        text: string;
        type: string;
        unauthorized: boolean;
        xhr: any;
        redirects: string[];
    }

```