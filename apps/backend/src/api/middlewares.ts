import {
  defineMiddlewares,
  type MedusaNextFunction,
  type MedusaRequest,
  type MedusaResponse,
} from "@medusajs/framework/http"
import type { ConfigModule } from "@medusajs/framework/types"
import { parseCorsOrigins } from "@medusajs/framework/utils"
import cors from "cors"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/cloud*",
      middlewares: [
        (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
          const configModule: ConfigModule = req.scope.resolve("configModule")

          return cors({
            origin: parseCorsOrigins(configModule.projectConfig.http.adminCors),
            credentials: true,
          })(req, res, next)
        },
      ],
    },
  ],
})
