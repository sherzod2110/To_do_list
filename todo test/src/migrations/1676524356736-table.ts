import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676524356736 implements MigrationInterface {
    name = 'table1676524356736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "todo_text" TO "text"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "text" TO "todo_text"`);
    }

}
