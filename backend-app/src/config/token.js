module.exports = {
    secret: process.env.AUTH_SECRET || "67556B58703272357538782F413F4428472B4B6250655368566D597133743677",
    expiresIn: process.env.AUTH_EXPIRES_IN ||"6d",
    rounds: process.env.AUTH_ROUNDS || 10
}