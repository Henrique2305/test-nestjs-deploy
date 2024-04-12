import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Filme } from "../model/filme.model";
import { Repository } from "typeorm";
import { filmeDTO } from "../model/dto/filme.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class FilmeService {
    constructor(
        @InjectRepository(Filme)
        private filmeRepository: Repository<Filme>,
        
        @Inject(CACHE_MANAGER)
        private cacheService: Cache
    ) {}

    async findAll(): Promise<Filme[]> {
        const cachedData = await this.cacheService.get<Filme[]>("tudo");

        if (cachedData) {
            return cachedData;
        }

        const filmes = await this.filmeRepository.find();
        await this.cacheService.set("tudo", filmes);
        console.log('data set to cache');
        return filmes;
    }

    async save(data: filmeDTO): Promise<Filme> {
        return this.filmeRepository.save(Filme.convertToModel(data));
    }

    async find(id: number): Promise<Filme> {
        const cachedData = await this.cacheService.get<Filme>(id.toString());

        if (cachedData) {
            console.log('data from cache');
            return cachedData;
        }

        const filmeBuscado = await this.filmeRepository.findOneBy({id});

        if (!filmeBuscado) {
            throw new NotFoundException("Filme não encontrado");
        }

        await this.cacheService.set(id.toString(), filmeBuscado);
        console.log('data set to cache');
        return filmeBuscado;
    } 

    async update(id:number, dto: filmeDTO): Promise<Filme> {
        const filmeBuscado = await this.find(id);
        const filmeAtualizado = Filme.convertToModel(dto);

        filmeAtualizado.id = filmeBuscado.id;
        
        await this.filmeRepository.save(filmeAtualizado);

        return filmeAtualizado;
    }

    async remove(id: number): Promise<void> {
        const filmeBuscado = await this.find(id);
        
        if (!filmeBuscado) {
            throw new NotFoundException("Filme não encontrado");
        }

        await this.filmeRepository.delete(id);
    }
}