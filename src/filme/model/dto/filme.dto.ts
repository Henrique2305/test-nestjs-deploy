import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class filmeDTO {

    @ApiProperty({ description: 'Nome do filme' })
    @IsNotEmpty()
    nome: string;

    @ApiProperty({ description: 'Duração em minutos do filme' })
    @IsNumber()
    duracaoEmMinutos: number;

    @ApiProperty({ description: 'Ano de lançamento do filme' })
    @IsNumber()
    anoLancamento: number;

    @ApiProperty({ description: 'Gênero do filme' })
    @IsNotEmpty()
    genero: string;
}