use serde::{Deserialize, Serialize};
use ts_rs::TS;

use crate::structs::common::{MessageToSign, SignedMessage};

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct SignMessagesEvent {
    #[serde(rename = "requestId")]
    pub request_id: String,
    pub messages: Vec<MessageToSign>,
    #[ts(optional)]
    pub metadata: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct SignMessagesEventReply {
    #[serde(rename = "responseId")]
    pub response_id: String,
    #[serde(rename = "requestId")]
    pub request_id: String,
    #[serde(rename = "signedMessages")]
    pub signed_messages: Vec<SignedMessage>,
    #[ts(optional)]
    pub metadata: Option<String>,
}