type JwtSecretsType = {
    access: string;
    refresh: string;
    security: string;
}

export const jwtSecrets = {
    access: process.env.JWT_ACCESS_SECRET,
    refresh: process.env.JWT_REFRESH_SECRET,
    security: process.env.JWT_SECURITY_SECRET,
}