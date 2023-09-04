# MongoDB JSON Schema Draft 4 - `$jsonSchema`

A type definition of the JSON schema used in `$jsonSchema` operator in a mongodb collection validator.

https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/

## Create a collection with validation

https://www.mongodb.com/docs/v6.2/core/schema-validation/update-schema-validation/#steps

```js
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "password"],
      properties: {
        username: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        password: {
          bsonType: "string",
          minLength: 8,
          description: "must be a string at least 8 characters long, and is required",
        },
      },
    },
  },
});
```

## Modify the validation schema

https://www.mongodb.com/docs/v6.2/core/schema-validation/update-schema-validation/#modify-the-validation-schema.

```js
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "password"],
      properties: {
        username: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        password: {
          bsonType: "string",
          minLength: 12,
          description: "must be a string of at least 12 characters, and is required",
        },
      },
    },
  },
});
```
