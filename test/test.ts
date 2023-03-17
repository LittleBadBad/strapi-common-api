import {Post} from "./Post";
import {Comment} from "./Comment";
import {collection, Filters, InputData, MergeAttrs, PickOther, Populate, Sort} from "../src";
import {PostVote} from "./PostVote";
import {Article} from "./Article";
import {Query} from "../dist";
import {Category} from "./Category";

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
        },
    },
    $or: [{
        content: {
            $contains: ""
        },

        title: {
            $in: [""]
        },
        user: {
            username: ""
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
            populate: ["avatar", "articles"]
        }
    }
})

collection.getMany<Category>("categories", {
    populate: {
        articles: {
            populate: {}
        }
    }
})

type P = Populate<Post>

const p1: P = "deep"
const p2: P = ["deep", 10]
const p3: P = 10
const p4: P = "*"
const p5: P = ["user", "comments"]
const p6: P = {
    comments: {
        populate: ["user", "post", "comment_votes"]
    },
    post_likes: {
        populate: ["user"]
    }
}

type F = Filters<Post>

const f1: F = {
    user: {
        username: {
            $eq: "littlebadbad",
            $null: true,
            $containsi: "little",
            $startsWith: "l"
        }
    },
    $and: [
        {content: {$contains: "hello"}},
        {title: {$contains: "hi"}}
    ],
    comments: {
        content: {
            $startsWith: "haha"
        },
        user: {
            username: {
                $startsWith: "l"
            }
        }
    },
    $not: {
        user: {
            username: {
                $startsWith: "a"
            }
        }
    }

}
