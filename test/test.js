const {createStrapiClient} =require("../dist");

const {strapiClient,user,auth}=createStrapiClient()

auth.login({identifier:"littlebadbad",password:"123456"})
.then(r=>{
    strapiClient.interceptors.request.use(config=>{
        config.headers["authorization"] = `Bearer ${r.jwt}`;
        return config
    })
    return user.me()
}).then(r=>{
    //{
    //   "id": 1,
    //   "username": "littlebadbad",
    //   "email": "littlebadbad@qq.com",
    //   "provider": "local",
    //   "confirmed": true,
    //   "blocked": false,
    //   "createdAt": "2023-03-19T04:59:03.199Z",
    //   "updatedAt": "2023-04-09T07:51:53.183Z",
    //   "name": "littlebadbad",
    //   "bio": "# bio test\n\n1234567\n\n## bio test\n\n1234567\n7654321\n\n### bio test\n\n1234567890"
    // }

    console.log(r);
})