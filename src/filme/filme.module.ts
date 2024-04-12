import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Filme } from "./model/filme.model";
import { FilmeController } from "./controller/filme.controller";
import { FilmeService } from "./service/filme.service";

@Module({
    imports: [TypeOrmModule.forFeature([Filme])],
    providers: [FilmeService],
    controllers: [FilmeController],
  })
  export class FilmeModule {}