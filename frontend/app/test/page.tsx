"use client"

import { userAgent } from "next/server";

export default function Page() {

    const {user,value} = tester();

    return <div>{user.age}{value}</div>;
}


function tester(){
const user = {
    name: "kismat",
    age: 22
}
    return {
    user,
        value:5
    }
}
