// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { AppMetadata } from "./AppMetadata";
import type { Device } from "./Device";
import type { PendingRequest } from "./PendingRequest";

export interface NotificationPayload { token: string, sessionId: string, appMetadata: AppMetadata, device: Device, request: PendingRequest, }