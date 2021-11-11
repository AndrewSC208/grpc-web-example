/**
 * @fileoverview gRPC-Web generated client stub for app.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.app = {};
proto.app.v1 = require('./counter_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.app.v1.CounterServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.app.v1.CounterServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.app.v1.Counter,
 *   !proto.app.v1.Id>}
 */
const methodDescriptor_CounterService_Create = new grpc.web.MethodDescriptor(
  '/app.v1.CounterService/Create',
  grpc.web.MethodType.UNARY,
  proto.app.v1.Counter,
  proto.app.v1.Id,
  /** @param {!proto.app.v1.Counter} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.v1.Id.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.app.v1.Counter,
 *   !proto.app.v1.Id>}
 */
const methodInfo_CounterService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.app.v1.Id,
  /** @param {!proto.app.v1.Counter} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.v1.Id.deserializeBinary
);


/**
 * @param {!proto.app.v1.Counter} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.app.v1.Id)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.app.v1.Id>|undefined}
 *     The XHR Node Readable Stream
 */
proto.app.v1.CounterServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/app.v1.CounterService/Create',
      request,
      metadata || {},
      methodDescriptor_CounterService_Create,
      callback);
};


/**
 * @param {!proto.app.v1.Counter} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.app.v1.Id>}
 *     A native promise that resolves to the response
 */
proto.app.v1.CounterServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/app.v1.CounterService/Create',
      request,
      metadata || {},
      methodDescriptor_CounterService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.app.v1.Blank,
 *   !proto.app.v1.Counters>}
 */
const methodDescriptor_CounterService_Read = new grpc.web.MethodDescriptor(
  '/app.v1.CounterService/Read',
  grpc.web.MethodType.UNARY,
  proto.app.v1.Blank,
  proto.app.v1.Counters,
  /** @param {!proto.app.v1.Blank} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.v1.Counters.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.app.v1.Blank,
 *   !proto.app.v1.Counters>}
 */
const methodInfo_CounterService_Read = new grpc.web.AbstractClientBase.MethodInfo(
  proto.app.v1.Counters,
  /** @param {!proto.app.v1.Blank} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.v1.Counters.deserializeBinary
);


/**
 * @param {!proto.app.v1.Blank} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.app.v1.Counters)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.app.v1.Counters>|undefined}
 *     The XHR Node Readable Stream
 */
proto.app.v1.CounterServiceClient.prototype.read =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/app.v1.CounterService/Read',
      request,
      metadata || {},
      methodDescriptor_CounterService_Read,
      callback);
};


/**
 * @param {!proto.app.v1.Blank} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.app.v1.Counters>}
 *     A native promise that resolves to the response
 */
proto.app.v1.CounterServicePromiseClient.prototype.read =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/app.v1.CounterService/Read',
      request,
      metadata || {},
      methodDescriptor_CounterService_Read);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.app.v1.Counter,
 *   !proto.app.v1.Id>}
 */
const methodDescriptor_CounterService_Update = new grpc.web.MethodDescriptor(
  '/app.v1.CounterService/Update',
  grpc.web.MethodType.UNARY,
  proto.app.v1.Counter,
  proto.app.v1.Id,
  /** @param {!proto.app.v1.Counter} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.v1.Id.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.app.v1.Counter,
 *   !proto.app.v1.Id>}
 */
const methodInfo_CounterService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.app.v1.Id,
  /** @param {!proto.app.v1.Counter} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.v1.Id.deserializeBinary
);


/**
 * @param {!proto.app.v1.Counter} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.app.v1.Id)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.app.v1.Id>|undefined}
 *     The XHR Node Readable Stream
 */
proto.app.v1.CounterServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/app.v1.CounterService/Update',
      request,
      metadata || {},
      methodDescriptor_CounterService_Update,
      callback);
};


/**
 * @param {!proto.app.v1.Counter} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.app.v1.Id>}
 *     A native promise that resolves to the response
 */
proto.app.v1.CounterServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/app.v1.CounterService/Update',
      request,
      metadata || {},
      methodDescriptor_CounterService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.app.v1.Counter,
 *   !proto.app.v1.Id>}
 */
const methodDescriptor_CounterService_Delete = new grpc.web.MethodDescriptor(
  '/app.v1.CounterService/Delete',
  grpc.web.MethodType.UNARY,
  proto.app.v1.Counter,
  proto.app.v1.Id,
  /** @param {!proto.app.v1.Counter} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.v1.Id.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.app.v1.Counter,
 *   !proto.app.v1.Id>}
 */
const methodInfo_CounterService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.app.v1.Id,
  /** @param {!proto.app.v1.Counter} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.app.v1.Id.deserializeBinary
);


/**
 * @param {!proto.app.v1.Counter} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.app.v1.Id)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.app.v1.Id>|undefined}
 *     The XHR Node Readable Stream
 */
proto.app.v1.CounterServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/app.v1.CounterService/Delete',
      request,
      metadata || {},
      methodDescriptor_CounterService_Delete,
      callback);
};


/**
 * @param {!proto.app.v1.Counter} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.app.v1.Id>}
 *     A native promise that resolves to the response
 */
proto.app.v1.CounterServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/app.v1.CounterService/Delete',
      request,
      metadata || {},
      methodDescriptor_CounterService_Delete);
};


module.exports = proto.app.v1;

