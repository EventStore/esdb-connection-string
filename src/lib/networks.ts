import * as axios from "axios";

export function isValidDns(domain: string): boolean {
    const re = /^((?:(?:\w[.\-+]?)*\w)+)((?:(?:\w[.\-+]?){0,62}\w)+)\.(\w{2,6})$/;
    return domain === undefined || domain === "localhost" || domain.match(re) !== undefined;
}

export function isValidIpAddress(ipAddress: string): boolean {
    const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipAddress === undefined || ipAddress.match(ipFormat) !== undefined;
}

export function isValidAddress(address: string): boolean {
    return isValidIpAddress(address) || isValidDns(address);
}

export async function resolveDns(dnsName: string) {
    if (dnsName === "" || !isValidDns(dnsName)) return undefined;

    const url = `https://dns.google/resolve?name=${dnsName}`;
    const response = await axios.default.get(url);
    return response.data.Status === 0 ? response.data.Answer.map(x => x.data) : undefined;
}

