export type ApiErrorCallback = (code: number, message: string) => void;

export abstract class ApiService {
    constructor(protected readonly errorCb: ApiErrorCallback) {}

    protected async apiRequest(url: string, info?: RequestInit, token?: string): Promise<any | null> {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        if (token) {
            headers.append("Authorization", token);
        }
        let rawRes;
        try {
            rawRes = await fetch(url, {
                ...info,
                headers,
            });
        } catch {
            rawRes = null;
        }
        if (!rawRes) {
            this.errorCb(503, "Network request failed");
        } else if (rawRes.status === 401 || rawRes.status === 403) {
            this.errorCb(403, "Unauthorized");
            return null;
        } else if (rawRes.status === 400) {
            const res = await rawRes.json();
            this.errorCb(400, res.message);
            return null;
        } else if (rawRes.status === 200) {
            return rawRes.json();
        } else {
            this.errorCb(500, "Unknown error");
            return null;
        }
    }
}
