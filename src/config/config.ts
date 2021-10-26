import * as dotenv from "dotenv";

const result = dotenv.config();

if (result.error) {
    throw result.error
}

export default {
    db:{
        // host:"mcs-develop.cqswmi0mxqiq.us-west-1.rds.amazonaws.com",
        host:process.env.DB_HOST,
        // host:"mcs-staging-cluster.cqswmi0mxqiq.us-west-1.rds.amazonaws.com",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
}

