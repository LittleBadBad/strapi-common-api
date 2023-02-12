# strapi-common-api

provide some common request api service functions and strapi types support for strapi based frontend apps

data types were generated by [types-4-strapi](https://www.npmjs.com/package/types-4-strapi)

see also [strapi](https://strapi.io), [typescript](https://www.typescriptlang.org/)

## install

```
npm install strapi-common-api -s
```

or

```
yarn add strapi-common-api
```

## usage

### types

err... there are too many types exported, here only introduce some key types

- Populate

strapi populate object type

- Query

query object followed by each strapi url, use `qs` library to stringify it, schema of query object follows
the [strapi api parameters](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/api-parameters.html)

includes: locale, filters, publicationState, pagination, sort, fields, populate

```typescript
// Post type was generated by types-4-strapi
import {Post} from "./Post";
import {Query} from "strapi-common-api"

export function getPosts(query?: Query<Post>): Promise<Return<Post[]>> {
    return strapiRequest.get(`/posts?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

// here your editor will give you some type hints
getPosts({
    filters: {
        title: {$contains: "test"}
    },
    populate: ["user"],
    sort:["updatedAt"]
})
```

### functions

#### collection type api

- getMany

get many resources

Params:

type – strapi content-type name

query – strapi query object

- getOne

get one resource

Params:

type – strapi content-type name

id – resources id

query – strapi query object

- post

add one resource

Params:

type – strapi content-type name

data – post data

query – strapi query object

- put

put one resource

Params:

type – strapi content-type name

id – resource id

data – post data

query – strapi query object

- remove

remove one resource

Params:

type – strapi content-type name

id – resource id

query – strapi query object

#### single type api

- get
- put
- remove

#### auth api

- login
- register
- forgotPassword
- resetPassword
- changePassword
- sendEmailConfirm
- emailConfirm

```typescript
import {auth, collection, single} from "strapi-common-api"
import {Post} from "./Post";
import {Global} from "./Global";

// here your editor will give you some hints on params and return data
auth.login({identifier, password})
    .then(({user, jwt}) => {
        // do something ...
    })

collection.getMany<Post>("posts", {
    filters: {
        title: {
            $eq: "test"
        }
    },
    populate: {// support multi-level populate
        user: {
            populate: ["avatar"]
        }
    }
}).then(({data, meta}) => {
    // do something ...
})

single.get<Global>("global").then(r => {
    // do something ...
})
```

### objects

- strapiRequest

based on [axios](https://axios-http.com/) module, you can customize your interceptors(such as add jwt token before
request) or some other params
