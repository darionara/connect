// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Network } from "./Network";
import type { Version } from "./Version";

export interface GetInfoResponse { responseId: string, appName: string, network: Network, version: Version, appDescription: string | null, appIcon: string | null, additionalInfo: string | null, }