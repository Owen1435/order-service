import { ClientEntity } from 'src/entity/client.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ClientEntity)
export class ClientRepository extends Repository<ClientEntity> {}
