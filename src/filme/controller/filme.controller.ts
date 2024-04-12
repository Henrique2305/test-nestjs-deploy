import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Filme } from "../model/filme.model";
import { FilmeService } from "../service/filme.service";
import { Request } from "express";
import { filmeDTO } from "../model/dto/filme.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@Controller("filmes")
export class FilmeController {
    constructor(
        private filmeService: FilmeService
    ) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(300)
    @UseGuards(AuthGuard)
    @Get()
    async listarTodosFilmes(@Req() req: Request): Promise<Filme[]> {
        return await this.filmeService.findAll()
    }

    @UseGuards(AuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async criarFilme(@Req() req: Request, @Body() filme: filmeDTO): Promise<Filme> {
        try {
            return await this.filmeService.save(filme);
        } catch (error) {
            const errorObject = {
                message: 'Erro ao salvar o filme',
                err: error,
                method: req.method,
                url: req.originalUrl
            }
            if (error instanceof HttpException) {
                throw error
            } else {
                throw new BadRequestException(errorObject)
            }   
        }
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(300)
    @UseGuards(AuthGuard)
    @Get(":id")
    async obterFilme(@Req() req: Request, @Param("id") id: number): Promise<Filme> {
       try {
            return await this.filmeService.find(+id);
       } catch (error) {
            const errorObject = {
                message: 'Erro ao buscar o filme',
                err: error,
                method: req.method,
                url: req.originalUrl
            }

            if (error instanceof HttpException) {
                throw error
            } else {
                throw new BadRequestException(errorObject)
            }  
       }
    }

    @UseGuards(AuthGuard)
    @Put(":id")
    async atualizarFilme(@Req() req: Request, @Param("id") id: number, @Body() filme: filmeDTO): Promise<Filme> {
        try {
            return await this.filmeService.update(+id, filme);
        } catch (error) {
            const errorObject = {
                message: 'Erro ao atualizar o filme',
                err: error,
                method: req.method,
                url: req.originalUrl
            }

            if (error instanceof HttpException) {
                throw error
            } else {
                throw new BadRequestException(errorObject)
            } 
        }
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async removerFilme(@Req() req: Request, @Param("id") id: number) {
        try {
            await this.filmeService.remove(+id);
        } catch (error) {
            const errorObject = {
                message: 'Erro ao remover o filme',
                err: error,
                method: req.method,
                url: req.originalUrl
            }

            if (error instanceof HttpException) {
                throw error
            } else {
                throw new BadRequestException(errorObject)
            }
        }
    }
}