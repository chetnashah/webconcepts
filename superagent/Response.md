
## Response interface

```ts
    interface Response extends NodeJS.ReadableStream {
        accepted: boolean;// 202 == status
        badRequest: boolean; // 400 == status
        body: any; // parsed response body based on Content-Type
        charset: string;
        clientError: boolean;// 4xx == status
        error: false | HTTPError;
        files: any;
        forbidden: boolean;// 403 == status
        get(header: string): string;
        get(header: "Set-Cookie"): string[];
        header: any;
        headers: any;
        info: boolean; // 1xx == status
        links: Record<string, string>;
        noContent: boolean;// 204 == status || 1223 == status
        notAcceptable: boolean;// 406 == status
        notFound: boolean;// 404 == status
        ok: boolean;// 2xx == status
        redirect: boolean;
        serverError: boolean; // 5xx
        status: number;
        statusCode: number;
        statusType: number;
        text: string; // unparsed response body string
        type: string; // Content-type
        unauthorized: boolean; // 401 == status
        xhr: any;
        redirects: string[];
    }

```