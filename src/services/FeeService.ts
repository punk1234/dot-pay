import { BadRequestError } from "../exceptions";
import { FileSetupFeeConfigManager } from "../helpers";
import PerformanceTester from "../helpers/PerformanceTester";

/**
 * @class FeeService
 */
class FeeService {

    static async addSetupFeeConfigs(setupFeeConfigsString: string): Promise<void> {
        // split by line
        const setupFeeConfigs: string[] = setupFeeConfigsString.split("\n");
        console.log(setupFeeConfigs.length);

        // check that there are no duplicates using a set or something better
        this.checkThatSetupFeeConfigsHasNoDuplicates(setupFeeConfigs);

        this.checkThatSetupFeeConfigsDoesNotExist(setupFeeConfigs);

        PerformanceTester.run();

        // let manager: FileSetupFeeConfigManager = new FileSetupFeeConfigManager();
        // manager.saveRecords(["abc", "def", "ghi"]);
        // manager.updateRecords(["abc", "def", "ghi", "jkl"]);
        // console.log(manager.readAll());
    }

    private static checkThatSetupFeeConfigsHasNoDuplicates(setupFeeConfigs: string[]): void {
        const distinctSetupFeeConfigs: Set<string> = new Set(setupFeeConfigs);

        if(distinctSetupFeeConfigs.size !== setupFeeConfigs.length) {
            throw new BadRequestError("Setup fee configs has duplicates!!!");
        }
    }

    private static checkThatSetupFeeConfigsDoesNotExist(setupFeeConfigs: string[]) {
        const distinctSetupFeeConfigs: Set<string> = new Set(setupFeeConfigs);

        if(distinctSetupFeeConfigs.size !== setupFeeConfigs.length) {
            throw new BadRequestError("Setup fee configs has duplicates!!!");
        }
    }

}

export default FeeService;