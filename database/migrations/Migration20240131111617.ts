import { Migration } from '@mikro-orm/migrations';

export class Migration20240131111617 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" drop column "created_at";');

    this.addSql('alter table "auctions" drop column "created_at";');

    this.addSql('alter table "bids" drop column "created_at";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" add column "created_at" timestamptz(0) not null;');

    this.addSql('alter table "auctions" add column "created_at" timestamptz(0) not null;');

    this.addSql('alter table "bids" add column "created_at" timestamptz(0) not null;');
  }

}
