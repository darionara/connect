// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { SignMessagesRequest } from "./SignMessagesRequest";
import type { SignTransactionsRequest } from "./SignTransactionsRequest";

export type PendingRequest = { type: "SignTransactions" } & SignTransactionsRequest | { type: "SignMessages" } & SignMessagesRequest;