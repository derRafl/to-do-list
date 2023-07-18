import { Checkpoint } from "./checkpoint";

export interface List {
    name: string;
    checkpoints: Checkpoint[];
    isExpanded?: boolean;
}
