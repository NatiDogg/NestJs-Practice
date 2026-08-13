import { SetMetadata } from "@nestjs/common"
import { Role } from "prisma/generated/prisma/enums"


export const ROLES_KEY = "roles"

//roles decorator marks the routes with the roles that are allowed to access them using metadata
// the role guard will later reads this meta data to check if the user has permission


export const Roles = (...roles: Role[])=> SetMetadata(ROLES_KEY, roles)