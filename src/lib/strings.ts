export function safe(v?: string): string{
    return v !== undefined && v !== "" ? v : "[not provided]";
}

export function safeJoin(list) {
    return [...new Set(list)].map(x => safe(x)).join(",");
}

export function sep(platform: string): string {
    return platform === "windows" ? "\\" : "/";
}
