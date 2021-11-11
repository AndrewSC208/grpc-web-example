import * as grpcWeb from 'grpc-web';

import {
  Blank,
  Counter,
  Counters,
  Id} from './counter_pb';

export class CounterServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  create(
    request: Counter,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Id) => void
  ): grpcWeb.ClientReadableStream<Id>;

  read(
    request: Blank,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Counters) => void
  ): grpcWeb.ClientReadableStream<Counters>;

  update(
    request: Counter,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Id) => void
  ): grpcWeb.ClientReadableStream<Id>;

  delete(
    request: Counter,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Id) => void
  ): grpcWeb.ClientReadableStream<Id>;

}

export class CounterServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  create(
    request: Counter,
    metadata?: grpcWeb.Metadata
  ): Promise<Id>;

  read(
    request: Blank,
    metadata?: grpcWeb.Metadata
  ): Promise<Counters>;

  update(
    request: Counter,
    metadata?: grpcWeb.Metadata
  ): Promise<Id>;

  delete(
    request: Counter,
    metadata?: grpcWeb.Metadata
  ): Promise<Id>;

}

