import * as Ajv from "ajv";
import { test, expect } from "vitest";
import addFormats from "ajv-formats";
import { strict as assert } from "assert";
import { MongoDBJSONSchema4, schema } from ".";

const ajv = new Ajv.default({ strict: true });

addFormats(ajv);

function assertSchema(data: unknown): asserts data is MongoDBJSONSchema4 {
  assert(ajv.validate(schema, data), new Error(ajv.errorsText(ajv.errors)));
}

const cases: [title: string, schema: unknown, result: boolean][] = [
  ["forbids $ref", { $ref: "#" }, false],
  ["forbids $schema", { $schema: "#" }, false],
  ["forbids default", { default: "" }, false],
  ["forbids definitions", { definitions: {} }, false],
  ["forbids format", { format: "uri" }, false],
  ["forbids id", { id: "#" }, false],
  ["forbids type integer", { type: "integer" }, false],
  ["forbids unknown keywords", { contains: { type: "number" } }, false],
  ["forbids empty bsonType array", { bsonType: [] }, false],
  ["supports bsonType double", { bsonType: "double" }, true],
  ["supports bsonType string", { bsonType: "string" }, true],
  ["supports bsonType object", { bsonType: "object" }, true],
  ["supports bsonType array", { bsonType: "array" }, true],
  ["supports bsonType binData", { bsonType: "binData" }, true],
  ["supports bsonType undefined", { bsonType: "undefined" }, true],
  ["supports bsonType objectId", { bsonType: "objectId" }, true],
  ["supports bsonType bool", { bsonType: "bool" }, true],
  ["supports bsonType date", { bsonType: "date" }, true],
  ["supports bsonType null", { bsonType: "null" }, true],
  ["supports bsonType regex", { bsonType: "regex" }, true],
  ["supports bsonType dbPointer", { bsonType: "dbPointer" }, true],
  ["supports bsonType javascript", { bsonType: "javascript" }, true],
  ["supports bsonType symbol", { bsonType: "symbol" }, true],
  ["supports bsonType javascriptWithScope", { bsonType: "javascriptWithScope" }, true],
  ["supports bsonType int", { bsonType: "int" }, true],
  ["supports bsonType timestamp", { bsonType: "timestamp" }, true],
  ["supports bsonType long", { bsonType: "long" }, true],
  ["supports bsonType decimal", { bsonType: "decimal" }, true],
  ["supports bsonType minKey", { bsonType: "minKey" }, true],
  ["supports bsonType maxKey", { bsonType: "maxKey" }, true],
  ["supports multiple bsonTypes", { bsonType: ["null", "int"] }, true],
];

test.each(cases)("%s", (_, schema, result) => {
  const assertion = expect(() => assertSchema(schema));
  if (result) assertion.not.toThrowError();
  else assertion.toThrowError();
});
