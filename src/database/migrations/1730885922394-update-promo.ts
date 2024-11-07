import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromo1730885922394 implements MigrationInterface {
    name = 'UpdatePromo1730885922394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`code\` \`code\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promo-codes\` CHANGE \`code\` \`code\` varchar(255) NOT NULL`);
    }

}
