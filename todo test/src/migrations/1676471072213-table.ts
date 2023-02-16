import { MigrationInterface, QueryRunner } from "typeorm";

export class table1676471072213 implements MigrationInterface {
    name = 'table1676471072213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("todo_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "todo_text" character varying NOT NULL, CONSTRAINT "PK_180c2378dde266c191bd4ea61a0" PRIMARY KEY ("todo_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
