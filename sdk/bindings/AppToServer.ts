// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { InitializeRequest } from "./InitializeRequest";
import type { SignTransactionsRequest } from "./SignTransactionsRequest";

export type AppToServer = { type: "InitializeRequest" } & InitializeRequest | { type: "SignTransactionsRequest" } & SignTransactionsRequest;