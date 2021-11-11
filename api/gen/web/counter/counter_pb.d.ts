import * as jspb from "google-protobuf"

export class Counter extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Counter.AsObject;
  static toObject(includeInstance: boolean, msg: Counter): Counter.AsObject;
  static serializeBinaryToWriter(message: Counter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Counter;
  static deserializeBinaryFromReader(message: Counter, reader: jspb.BinaryReader): Counter;
}

export namespace Counter {
  export type AsObject = {
    id: string,
    name: string,
    count: number,
  }
}

export class Counters extends jspb.Message {
  getCountersList(): Array<Counter>;
  setCountersList(value: Array<Counter>): void;
  clearCountersList(): void;
  addCounters(value?: Counter, index?: number): Counter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Counters.AsObject;
  static toObject(includeInstance: boolean, msg: Counters): Counters.AsObject;
  static serializeBinaryToWriter(message: Counters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Counters;
  static deserializeBinaryFromReader(message: Counters, reader: jspb.BinaryReader): Counters;
}

export namespace Counters {
  export type AsObject = {
    countersList: Array<Counter.AsObject>,
  }
}

export class Id extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Id.AsObject;
  static toObject(includeInstance: boolean, msg: Id): Id.AsObject;
  static serializeBinaryToWriter(message: Id, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Id;
  static deserializeBinaryFromReader(message: Id, reader: jspb.BinaryReader): Id;
}

export namespace Id {
  export type AsObject = {
    id: string,
  }
}

export class Blank extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Blank.AsObject;
  static toObject(includeInstance: boolean, msg: Blank): Blank.AsObject;
  static serializeBinaryToWriter(message: Blank, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Blank;
  static deserializeBinaryFromReader(message: Blank, reader: jspb.BinaryReader): Blank;
}

export namespace Blank {
  export type AsObject = {
  }
}

