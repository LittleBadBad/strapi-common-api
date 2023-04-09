const {createStrapiClient} = require("../dist");

const {strapiClient, user, auth} = createStrapiClient()

auth.login({identifier: "littlebadbad", password: "123456"})
    .then(r => {
        strapiClient.defaults.headers["authorization"] = `Bearer ${r.jwt}`;
        return user.me({populate: ["image"]})
    }).then(r => {
    console.log(r);
})