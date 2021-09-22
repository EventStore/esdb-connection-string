import {isValidAddress} from "@/lib/networks";

export default class ClientNode {
    index: number;
    address: string;
    port: number;

    constructor(index: number) {
        this.index   = index;
        this.address = "";
        this.port    = 2113;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    setPort(port: number): void {
        this.port = port;
    }

    validateAddress(address: string): string | null {
        if (address === "") return "Node address required";
        if (!isValidAddress(address)) return "Invalid IP address or DNS name";
        return null;
    }

    isValid(): boolean {
        return this.address !== "" && this.port > 0;
    }
}
