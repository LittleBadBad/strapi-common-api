import {Post} from "./Post";
import {collection, Filters, InputData, MergeAttrs, PickOther, Populate, Sort} from "../src";
import {PostVote} from "./PostVote";
import {Article} from "./Article";
import {Query} from "../dist";

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

const g: keyof PickOther<Article["attributes"]> = "blocks"

const h: Populate<Article> = {
    author: {
        populate: ["avatar"]
    },
    category: {
        populate: ["articles"]
    }
}

const i: Query<Article> = {
    populate: {
        author: {
            populate: ["avatar"]
        }
    }
}
const j: Article["attributes"]["author"]["data"] = {attributes: {articles: {data: []}}, id: 0}

collection.getMany<Article>('articles', {
    filters: {
        slug: {
            $eq: ""
        }
    },
    populate: {
        author: {
            populate: ["avatar", "s"]
        }
    }
})
