import {DnsGossip, SeedGossip} from "./gossipTypes";
import {EventBus} from "./eventBus";
import {CertCnChanged, CertificateTypeChanged, ClusteringChanged} from "../esdbConfig/domain/events";
import {ensureCaDomainMatch, ok, error, validateGossip} from "@/lib/validate";

export default class Gossip {
    type: string;
    message: string;
    method: string;
    showGossip: boolean;
    dnsName: string;

    constructor(type: string, message: string, subscribe: boolean) {
        this.type                = type;
        this.message             = message;
        this.method              = DnsGossip;
        this.showGossip          = true;
        this.dnsName             = "";

        if (subscribe) {
            EventBus.$on(ClusteringChanged, x => this.changeClustering(x));
            EventBus.$on(CertCnChanged, x => this.certCn = x);
        }
    }

    changeClustering(cluster: boolean): void {
        this.showGossip = cluster;
    }

    isDnsGossip(): boolean {
        return this.showGossip && this.method === DnsGossip;
    }

    setMethod(method: string): void {
        this.method = method;
    }

    async validateGossip(nodes, value, callback) {
        if (!this.isDnsGossip()) return ok(callback);

        if (!ensureCaDomainMatch(this.dnsName, this.certCn)) {
            return error(callback, "Certificate CN mismatch");
        }

        return await validateGossip(nodes, value, callback);
    }

    isValid(gossipPort: number): boolean {
        return !this.isDnsGossip() || (this.dnsName !== "" && gossipPort > 0);
    }
}
