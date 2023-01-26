import {Post} from "./Post";
import {Filters, InputData, MergeAttrs, PickOther, Sort} from "../src";
import {PostVote} from "./PostVote";

const a: MergeAttrs<Post> = {
    content: undefined,
    id: 0,
    locale: "",
    title: undefined,
}

const b: MergeAttrs<PostVote> = {
    agree: undefined,
    id: 0,
}

const c: Filters<Post> = {
    id: {
        $in: [1, 3]
    },
    content: {
        $contains: ""
    },
    title: {
        $contains: ""
    },
    user: {
        username: {
            $eq: ""
        }
    },
    $or: [{
        content: {
            $contains: ""
        },
        title: {
            $in: [""]
        },
        user: {
            id: {
                $eq: 1
            }
        }
    }]
}

const d: Sort<MergeAttrs<Post>> = "content"

const e: keyof PickOther<Post["attributes"]> = "comments"

const f: InputData<Post> = {
    content: "",
    locale: "",
    user: {
        id: 1
    }
}
