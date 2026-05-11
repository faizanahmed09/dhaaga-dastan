import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    cookieOptions: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
    http: {
      storeCors: process.env.STORE_CORS || "",
      adminCors: process.env.ADMIN_CORS || "",
      authCors: (() => {
        const origins = (process.env.AUTH_CORS || "").split(",").filter(Boolean);
        const re = new RegExp(origins.join("|") || ".*");
        (re as any).split = () => [re];
        return re as any;
      })(),
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: !!process.env.RAILWAY_PROJECT_ID || process.env.DISABLE_MEDUSA_ADMIN === "true",
    path: "/admin",
  },
  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL || `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${process.env.S3_BUCKET}`,
              access_key_id: process.env.S3_ACCESS_KEY_ID || process.env.SUPABASE_ACCESS_KEY,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY || process.env.SUPABASE_SECRET_KEY,
              region: process.env.S3_REGION || "us-east-1",
              bucket: process.env.S3_BUCKET || "medusa-products",
              endpoint: process.env.S3_ENDPOINT || `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/s3`,
              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },
  ],
})
