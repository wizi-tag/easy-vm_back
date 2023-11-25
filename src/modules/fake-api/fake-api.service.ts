import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeApiService {
    async dockerPs() {
        // return dockerContainerModel.findAll();
        // returns {containerId, image, command, created, status, name};
    }

    async virshListAll() {
        // return virtualMachineModel.findAll();
        // returns {id, name, status};
    }
}
