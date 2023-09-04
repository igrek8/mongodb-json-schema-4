type Type = "array" | "boolean" | "null" | "number" | "object" | "string";

type BsonType =
  | "double"
  | "string"
  | "object"
  | "array"
  | "binData"
  | "undefined"
  | "objectId"
  | "bool"
  | "date"
  | "null"
  | "regex"
  | "dbPointer"
  | "javascript"
  | "symbol"
  | "javascriptWithScope"
  | "int"
  | "timestamp"
  | "long"
  | "decimal"
  | "minKey"
  | "maxKey";

export interface MongoDBJSONSchema4 {
  title?: string;
  description?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  additionalItems?: boolean | MongoDBJSONSchema4;
  items?: MongoDBJSONSchema4 | [MongoDBJSONSchema4, ...MongoDBJSONSchema4[]];
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: [string, ...string[]];
  additionalProperties?: boolean | MongoDBJSONSchema4;
  properties?: Record<string, MongoDBJSONSchema4>;
  patternProperties?: Record<string, MongoDBJSONSchema4>;
  dependencies?: Record<string, MongoDBJSONSchema4 | [string, ...string[]]>;
  enum?: [unknown, ...unknown[]];
  type?: Type | [Type, ...Type[]];
  bsonType?: BsonType | [BsonType, ...BsonType[]];
  allOf?: [MongoDBJSONSchema4, ...MongoDBJSONSchema4[]];
  anyOf?: [MongoDBJSONSchema4, ...MongoDBJSONSchema4[]];
  oneOf?: [MongoDBJSONSchema4, ...MongoDBJSONSchema4[]];
  not?: MongoDBJSONSchema4;
}
