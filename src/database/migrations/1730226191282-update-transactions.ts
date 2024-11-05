import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTransactions1730226191282 implements MigrationInterface {
    name = 'UpdateTransactions1730226191282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product-transactions\` ADD \`date\` datetime NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_a1d1c58c93952704867d87026c\` ON \`product-transactions\` (\`productId\`, \`quantity\`, \`date\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a1d1c58c93952704867d87026c\` ON \`product-transactions\``);
        await queryRunner.query(`ALTER TABLE \`product-transactions\` DROP COLUMN \`date\``);
    }

}
