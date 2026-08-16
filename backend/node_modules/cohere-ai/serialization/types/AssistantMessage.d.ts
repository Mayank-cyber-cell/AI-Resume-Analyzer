import type * as Cohere from "../../api/index";
import * as core from "../../core";
import type * as serializers from "../index";
import { AssistantMessageV2Content } from "./AssistantMessageV2Content";
import { Citation } from "./Citation";
import { ToolCallV2 } from "./ToolCallV2";
export declare const AssistantMessage: core.serialization.ObjectSchema<serializers.AssistantMessage.Raw, Cohere.AssistantMessage>;
export declare namespace AssistantMessage {
    interface Raw {
        tool_calls?: ToolCallV2.Raw[] | null;
        tool_plan?: string | null;
        content?: AssistantMessageV2Content.Raw | null;
        citations?: Citation.Raw[] | null;
    }
}
