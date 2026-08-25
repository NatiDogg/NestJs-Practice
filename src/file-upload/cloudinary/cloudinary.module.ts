import { Module } from "@nestjs/common";
import { CloudinaryServiceProvider } from "./cloundinaryService";
import { cloudinaryProvider } from "./cloudinaryProvider";

@Module({
     providers: [CloudinaryServiceProvider,cloudinaryProvider],
     exports: [CloudinaryServiceProvider]

})

export class CloudinaryModule{}
