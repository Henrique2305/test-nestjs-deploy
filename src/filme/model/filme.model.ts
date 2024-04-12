import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { filmeDTO } from "./dto/filme.dto";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Filme {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    duracaoEmMinutos: number;

    @Column()
    anoLancamento: number;

    @Column()
    genero: string;

    static convertToModel(dto: filmeDTO): Filme {
        const filme = new Filme();
        filme.nome = dto.nome;
        filme.duracaoEmMinutos = dto.duracaoEmMinutos;
        filme.anoLancamento = dto.anoLancamento;
        filme.genero = dto.genero;
        return filme;
    }
}