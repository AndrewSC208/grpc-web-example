// most likeley will need to initialize the rpc methods with some middleware and re-export the classes
import {CounterServiceClient} from "counter_rpc_service";

const {origin} = window;

export const CounterService = new CounterServiceClient(origin);

